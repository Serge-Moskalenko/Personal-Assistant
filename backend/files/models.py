import os
import uuid

from django.conf import settings as setg
from django.db import models
from envexampl import settings
from storages.backends.s3boto3 import S3Boto3Storage

# s3_storage = S3Boto3Storage(
#     bucket_name=settings.AWS_STORAGE_BUCKET_NAME,
#     custom_domain=(
#         f"{settings.AWS_STORAGE_BUCKET_NAME}"
#         f".s3.{settings.AWS_S3_REGION_NAME}.amazonaws.com"
#     ),
# )
s3_storage = S3Boto3Storage()


def upload_to_uuid_by_ext(instance, filename):

    ext = os.path.splitext(filename)[1].lower()

    if ext in {".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp", ".tiff"}:
        folder = "images"
    elif ext in {".mp4", ".mov", ".avi", ".mkv", ".webm", ".flv"}:
        folder = "videos"
    elif ext in {".pdf", ".doc", ".docx", ".ppt", ".pptx", ".xls", ".xlsx", ".txt"}:
        folder = "documents"
    else:
        folder = "other"

    return f"{folder}/{uuid.uuid4()}{ext}"


class Image(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    owner = models.ForeignKey(
        setg.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="images",
        help_text="Image owner",
    )

    class Category(models.TextChoices):
        IMAGE = "image", "Image"
        VIDEO = "video", "Video"
        DOCUMENT = "document", "Document"
        OTHER = "other", "Other"

    title = models.CharField(max_length=200, blank=True)
    file = models.FileField(
        upload_to=upload_to_uuid_by_ext,
        storage=s3_storage,
    )
    category = models.CharField(
        max_length=10,
        choices=Category.choices,
        default=Category.OTHER,
        db_index=True,
    )
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title or f"Image {self.id}"
