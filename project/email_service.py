from datetime import datetime, timedelta
import math
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from loguru import logger

from hakaton.settings import DEFAULT_FROM_EMAIL
from project.models import CustomUser


def send_email_password(user_email, password):
    subject = "Одноразовый пароль!"
    html_content = render_to_string(
        "email/password.html",
        {"password": password},
    )
    text_content = strip_tags(html_content)

    email = EmailMultiAlternatives(
        subject, text_content, DEFAULT_FROM_EMAIL, [user_email]
    )
    email.attach_alternative(html_content, "text/html")
    email.send()


def send_daily_recommendations(user_email):
    subject = "Новые рекомендации доступны!"
    html_content = render_to_string("email/spam.html")
    text_content = strip_tags(html_content)

    email = EmailMultiAlternatives(
        subject, text_content, DEFAULT_FROM_EMAIL, [user_email]
    )
    email.attach_alternative(html_content, "text/html")
    email.send()


def send_daily_recommendations():
    subject = "Новые рекомендации доступны!"
    html_content = render_to_string("email/spam.html")
    text_content = strip_tags(html_content)
    
    users = CustomUser.objects.filter(recommendation_sent_hour=datetime.now().hour)
    user_emails = [user.email for user in users if user.is_staff != True]

    logger.debug(f"{user_emails}")
    logger.debug(f"{datetime.now().hour = }")


    email = EmailMultiAlternatives(
        subject, text_content, DEFAULT_FROM_EMAIL, user_emails
    )
    email.attach_alternative(html_content, "text/html")
    email.send()