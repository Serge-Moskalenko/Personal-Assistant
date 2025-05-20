from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.cache import cache
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .serializers import (
    EmailVerifyCodeConfirmSerializer,
    EmailVerifyCodeRequestSerializer,
    RegisterSerializer,
)
from .utils import send_verification_code

User = get_user_model()


class AuthViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]

    @action(detail=False, methods=["post"])
    def register(self, request):

        ser = RegisterSerializer(data=request.data)
        ser.is_valid(raise_exception=True)
        user = ser.save()
        send_verification_code(user, settings.SITE_HOST)
        return Response(
            {"detail": "Registered. Code sent to your email."},
            status=status.HTTP_201_CREATED,
        )

    @action(detail=False, methods=["post"])
    def request_email_code(self, request):

        ser = EmailVerifyCodeRequestSerializer(data=request.data)
        ser.is_valid(raise_exception=True)
        user = User.objects.filter(email=ser.validated_data["email"]).first()
        if not user:
            return Response(
                {"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND
            )
        send_verification_code(user, settings.SITE_HOST)
        return Response({"detail": "The code has been resent."})

    @action(detail=False, methods=["post"])
    def confirm_email_code(self, request):

        ser = EmailVerifyCodeConfirmSerializer(data=request.data)
        ser.is_valid(raise_exception=True)
        email = ser.validated_data["email"]
        code = ser.validated_data["code"]

        user = User.objects.filter(email=email).first()
        if not user:
            return Response(
                {"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND
            )

        cache_key = f"email_verify_code:{email}"
        real_code = cache.get(cache_key)
        if real_code is None:
            return Response(
                {"detail": "Code not found or expired."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if real_code != code:
            return Response(
                {"detail": "Invalid code."}, status=status.HTTP_400_BAD_REQUEST
            )

        cache.delete(cache_key)
        user.is_active = True
        user.save()
        return Response({"detail": "Email confirmed."})
