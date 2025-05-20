import os

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Image
from .serializers import ImageSerializer


class ImageViewSet(viewsets.ModelViewSet):
    serializer_class = ImageSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["category"]

    def get_queryset(self):
        return Image.objects.filter(owner=self.request.user).order_by("-uploaded_at")

    def perform_create(self, serializer):
        uploaded = self.request.FILES["file"]
        ext = os.path.splitext(uploaded.name)[1].lower()

        if ext in {".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp", ".tiff"}:
            cat = Image.Category.IMAGE
        elif ext in {".mp4", ".mov", ".avi", ".mkv", ".webm", ".flv"}:
            cat = Image.Category.VIDEO
        elif ext in {".pdf", ".doc", ".docx", ".ppt", ".pptx", ".xls", ".xlsx", ".txt"}:
            cat = Image.Category.DOCUMENT
        else:
            cat = Image.Category.OTHER
        serializer.save(owner=self.request.user, category=cat)

    def destroy(self, request, *args, **kwargs):
        inst = self.get_object()
        inst.file.delete(save=False)
        inst.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
