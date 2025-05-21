import random

from django.core.cache import cache
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string

CODE_TTL = 15 * 60


def generate_4digit_code() -> str:
    return f"{random.randint(0, 9999):04d}"


def send_verification_code(user, site_host: str):
    code = generate_4digit_code()
    cache_key = f"email_verify_code:{user.email}"
    cache.set(cache_key, code, timeout=CODE_TTL)

    html = render_to_string(
        "authorization/verify_email_code.html",
        {
            "username": user.username,
            "code": code,
            "site_host": site_host.rstrip("/"),
        },
    )
    subject = "Email confirmation code"
    msg = EmailMultiAlternatives(subject, html, to=[user.email])
    msg.attach_alternative(html, "text/html")
    msg.send()


def generate_code(length=6) -> str:
    return "".join(random.choices("0123456789", k=length))


def send_password_reset_code(user, site_host: str):
    code = generate_code()
    cache_key = f"password_reset_code:{user.email}"
    cache.set(cache_key, code, timeout=CODE_TTL)

    html = render_to_string(
        "authorization/reset_password_email.html",
        {
            "username": user.username,
            "code": code,
            "site_host": site_host.rstrip("/"),
        },
    )
    subject = "Your password reset code"
    msg = EmailMultiAlternatives(subject, html, to=[user.email])
    msg.attach_alternative(html, "text/html")
    msg.send()
