from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags

from hakaton.settings import DEFAULT_FROM_EMAIL


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
