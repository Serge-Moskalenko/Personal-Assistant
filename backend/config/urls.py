from contacts.views import ContactViewSet
from django.contrib import admin
from django.urls import include, path
from files.views import ImageViewSet
from news.views import NewsItemViewSet
from notes.views import NoteViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("contacts", ContactViewSet, basename="contact")
router.register("notes", NoteViewSet, basename="note")
router.register("files", ImageViewSet, basename="file")
router.register("news", NewsItemViewSet, basename="news")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include(router.urls)),
]
