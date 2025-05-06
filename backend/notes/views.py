from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.filters import OrderingFilter
from rest_framework.pagination import PageNumberPagination

from .filters import NoteFilter
from .models import Note
from .serializers import NoteSerializer


class NotePagination(PageNumberPagination):
    page_size = 10


class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    pagination_class = NotePagination

    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_class = NoteFilter
    ordering_fields = ["created_at", "reminder_date", "status"]
    ordering = ["-created_at"]
