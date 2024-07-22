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
        username = data.get("username")
        password = data.get("password")

        if user := authenticate(request, username=username, password=password):
            login(request, user)
            return JsonResponse(Success().model_dump())
        else:
            return JsonResponse(
                {"status": "error", "message": "Invalid credentials"}, status=400
            )
    except json.JSONDecodeError:
        return JsonResponse({"status": "error", "message": "Invalid JSON"}, status=400)
    except Exception as e:
        return JsonResponse({"status": "error", "message": str(e)}, status=500)


@require_POST
@csrf_exempt
def register(request):
    try:
        data = json.loads(request.body.decode())
        username = data.get("username")
        email = data.get("email")
        telegram = data.get("telegram")

        UserRegistration(username=username, email=email, telegram=telegram)
        password = generate_password()

        CustomUser.objects.create_user(username, email, password, telegram=telegram)
        send_email_password(email, password)
        return JsonResponse(Success().model_dump())
    except ValidationError as e:
        return JsonResponse(
            ExceptionRequest(code=2, error=e.errors()[0]["loc"]).model_dump()
        )
    except IntegrityError as e:
        return JsonResponse(ExceptionRequest(error=str(e)).model_dump())


@require_POST
@csrf_exempt
def logout_user(запрос):
    logout(запрос)
    return JsonResponse(Success().model_dump())


@login_required
def user_detail_view(request):
    try:
        user_id = request.session.get("_auth_user_id")
        user = CustomUser.objects.get(pk=user_id)
        user_data = {
            "username": user.username,
            "spam_subcribe": user.spam_subcribe,
            "email": user.email,
            "telegram": user.telegram,
            "date_joined": user.date_joined,
        }
        return JsonResponse(user_data)
    except CustomUser.DoesNotExist:
        return JsonResponse({"error": "User not found"}, status=404)

    except Exception as e:
        logger.opt(exception=e).critical("fsjhfdsjdhf")
        return JsonResponse(ExceptionRequest(error=str(e)).model_dump())


@csrf_exempt
@require_POST
@login_required
def disable_event_spam(request):
    user_id = request.session.get("_auth_user_id")
    CustomUser.objects.filter(pk=user_id).update(spam_subcribe=False)
    return JsonResponse(Success().model_dump())


@csrf_exempt
@require_POST
@login_required
def enable_event_spam(request):
    user_id = request.session.get("_auth_user_id")
    CustomUser.objects.filter(pk=user_id).update(spam_subcribe=True)
    return JsonResponse(Success().model_dump())


def get_all_events(request):
    events = Event.objects.all().values()
    logger.debug(f"{events = }")
    events_data = [
        {
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
            "title": event.title,
            "description": event.description,
            "description_over": event.description_over,
            "date_open": event.date_open,
        }
        for event in events
    ]
    return JsonResponse(Success(data=events_data).model_dump())
