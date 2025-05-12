import os

from django.core.files.storage import default_storage
from django.http import FileResponse, Http404
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from rest_framework.response import Response

from .models import Image
from .serializers import ImageSerializer


class ImageViewSet(viewsets.ModelViewSet):
    queryset = Image.objects.all().order_by("-uploaded_at")
    serializer_class = ImageSerializer
    permission_classes = [permissions.AllowAny]
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["category"]

    def perform_create(self, serializer):
        uploaded = self.request.FILES.get("file")
        ext = os.path.splitext(uploaded.name)[1].lower()

        image_exts = {".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp", ".tiff"}
        video_exts = {".mp4", ".mov", ".avi", ".mkv", ".webm", ".flv"}
        document_exts = {
            ".pdf",
            ".doc",
            ".docx",
            ".ppt",
            ".pptx",
            ".xls",
            ".xlsx",
            ".txt",
        }

        if ext in image_exts:
            cat = Image.Category.IMAGE
        elif ext in video_exts:
            cat = Image.Category.VIDEO
        elif ext in document_exts:
            cat = Image.Category.DOCUMENT
        else:
            cat = Image.Category.OTHER

        serializer.save(category=cat)

    @action(
        detail=True,
        methods=["get"],
        url_path="download",
        url_name="download",
    )
    def download(self, request, pk=None):

        image = self.get_object()
        name = image.file.name
        try:
            f = image.file.storage.open(image.file.name, "rb")
        except Exception:
            raise Http404("File not found")

        ext = os.path.splitext(name)[1].lower()
        content_type = {
            ".jpg": "image/jpeg",
            ".jpeg": "image/jpeg",
            ".png": "image/png",
            ".gif": "image/gif",
            ".mp4": "video/mp4",
        }.get(ext, "application/octet-stream")

        resp = FileResponse(f, content_type=content_type)
        resp["Content-Disposition"] = f'attachment; filename="{os.path.basename(name)}"'
        return resp

    def perform_destroy(self, instance):
        instance.file.delete(save=False)
        instance.delete()

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
