from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.filters import OrderingFilter
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated

from .filters import NoteFilter
from .models import Note
from .serializers import NoteSerializer


class NotePagination(PageNumberPagination):
    page_size = 10


class NoteViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = NoteSerializer
    pagination_class = NotePagination
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_class = NoteFilter
    ordering_fields = ["created_at", "reminder_date", "status"]
    ordering = ["-created_at"]

    def get_queryset(self):
        return Note.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
