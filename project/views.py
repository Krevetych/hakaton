import json
from datetime import datetime

from django.contrib.auth import logout, login, authenticate
from django.db import IntegrityError
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
from pydantic import ValidationError
from loguru import logger
import pytz

from project.email_service import send_email_password
from project.models import CustomUser, Event
from project.schemas import ExceptionRequest, Success, UserRegistration
from project.service import generate_password


from functools import wraps

from project.tasks import send_email_password_celery
from project.utils import get_recommendation_sent_hour, get_timezone


def login_required(view_func):
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return JsonResponse(
                ExceptionRequest(code=3, error="User not authenticated").model_dump(),
                status=401,
            )
        return view_func(request, *args, **kwargs)

    return _wrapped_view


def home(request):
    return JsonResponse({1: 1})


@csrf_exempt
@require_POST
def login_view(request):
    try:
        data = json.loads(request.body.decode())
        email = data.get("email").strip()
        password = data.get("password").strip()

        if user := authenticate(request, email=email, password=password):
            login(request, user)
            return JsonResponse(Success().model_dump())
        else:
            return JsonResponse(
                ExceptionRequest(
                    code=4, error="Invalid password or email"
                ).model_dump(),
                status=403,
            )
    except json.JSONDecodeError:
        return JsonResponse(
            ExceptionRequest(code=10, error="Server exception").model_dump(), status=500
        )
    except Exception:
        return JsonResponse(
            ExceptionRequest(code=10, error="Server exception").model_dump(), status=500
        )


@require_POST
@csrf_exempt
def register(request):
    try:
        data = json.loads(request.body.decode())
        username = data.get("username").strip()
        email = data.get("email").strip()
        telegram = data.get("telegram").strip()

        timezone = get_timezone(data)
        timezone_rec = get_recommendation_sent_hour(data)

        UserRegistration(
            username=username, email=email, telegram=telegram, timezone=timezone
        )
        password = "password"

        CustomUser.objects.create_user(
            username, email, password, telegram=telegram, timezone=timezone, recommendation_sent_hour=timezone_rec
        )
        return JsonResponse(Success().model_dump())
    except ValidationError as e:
        return JsonResponse(
            ExceptionRequest(code=2, error=e.errors()[0]["loc"]).model_dump(),
            status=400,
        )
    except IntegrityError as e:
        return JsonResponse(ExceptionRequest(error=str(e)).model_dump(), status=400)


@require_POST
@csrf_exempt
def change_password(request):
    try:
        data = json.loads(request.body.decode())
        email = data.get("email")
        password = generate_password()
        CustomUser.objects.change_password(email, password)
        # send_email_password(email, password)
        send_email_password_celery.delay(email, password)
        return JsonResponse(Success().model_dump())
    except ValueError as e:
        return JsonResponse(
            ExceptionRequest(code=6, error=str(e)).model_dump(), status=418
        )


@require_POST
@csrf_exempt
def logout_user(запрос):
    logout(запрос)
    return JsonResponse(Success().model_dump())


@login_required
def user_detail_view(request):
    try:
        logger.debug(f"{request.session.items() = }")
        user_id = request.session.get("_auth_user_id")
        user = CustomUser.objects.get(pk=user_id)
        user_data = {
            "username": user.username,
            "spam_subscribe": user.spam_subscribe,
            "email": user.email,
            "telegram": user.telegram,
            "date_joined": user.date_joined,
        }
        return JsonResponse(Success(data=user_data).model_dump())
    except CustomUser.DoesNotExist:
        return JsonResponse(
            ExceptionRequest(code=7, error="User not found", status=404)
        )

    except Exception as e:
        logger.opt(exception=e).critical("fsjhfdsjdhf")
        return JsonResponse(ExceptionRequest(error=str(e)).model_dump(), status=500)


@csrf_exempt
@require_POST
@login_required
def disable_event_spam(request):
    user_id = request.session.get("_auth_user_id")
    CustomUser.objects.filter(pk=user_id).update(spam_subscribe=False)
    return JsonResponse(Success().model_dump())


@csrf_exempt
@require_POST
@login_required
def enable_event_spam(request):
    user_id = request.session.get("_auth_user_id")
    CustomUser.objects.filter(pk=user_id).update(spam_subscribe=True)
    return JsonResponse(Success().model_dump())


def get_all_events(request):
    events = Event.objects.all().values()
    logger.debug(f"{events = }")
    events_data = [
        {
            "id": event["id"],
            "title": event["title"],
            "description": event["description"],
            "description_over": event["description_over"],
            "date_open": event["date_open"],
        }
        for event in events
    ]
    return JsonResponse(Success(data=events_data).model_dump())


@login_required
def get_events_for_user(request):
    user_id = request.session.get("_auth_user_id")
    user = CustomUser.objects.get(pk=user_id)
    user_timezone = pytz.timezone(user.timezone)
    events = Event.objects.filter(date_open=datetime.now(user_timezone))

    events_data = [
        {   
            "id": event.id,
            "title": event.title,
            "description": event.description,
            "description_over": event.description_over,
            "date_open": event.date_open,
        }
        for event in events
    ]
    return JsonResponse(Success(data=events_data).model_dump())


def get_events_by_id(request, id: str) -> Success:
    event = Event.objects.filter(id=int(id)).first()
    events_data = {   
            "id": event.id,
            "title": event.title,
            "description": event.description,
            "description_over": event.description_over,
            "date_open": event.date_open,
        }
 
    return JsonResponse(Success(data=events_data).model_dump())