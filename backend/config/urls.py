from contacts.views import ContactViewSet
from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("", ContactViewSet, basename="contact")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("contacts/", include(router.urls)),
]
