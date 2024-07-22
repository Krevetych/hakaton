from celery import shared_task
from django.utils import timezone
from datetime import timedelta

from project.email_service import send_daily_recommendations, send_email_password


@shared_task
def send_daily_recommendations_celery():
    send_daily_recommendations()


@shared_task
def send_email_password_celery(user_email, password):
    send_email_password(user_email, password)
