from authorization.views import AuthViewSet
from contacts.views import ContactViewSet
from django.contrib import admin
from django.urls import include, path
from files.views import ImageViewSet
from news.views import NewsItemViewSet
from notes.views import NoteViewSet
from rest_framework.permissions import AllowAny
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register("contacts", ContactViewSet, basename="contact")
router.register("notes", NoteViewSet, basename="note")
router.register("files", ImageViewSet, basename="file")
router.register("news", NewsItemViewSet, basename="news")
router.register("auth", AuthViewSet, basename="auth")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include(router.urls)),
    path("payments/", include("payments.urls")),
    path(
        "token/",
        TokenObtainPairView.as_view(
            authentication_classes=[], permission_classes=[AllowAny]
        ),
        name="token_obtain_pair",
    ),
    path(
        "token/refresh/",
        TokenRefreshView.as_view(
            authentication_classes=[], permission_classes=[AllowAny]
        ),
        name="token_refresh",
    ),
]
