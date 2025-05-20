import os

import boto3
from envexampl import settings
from rest_framework import serializers

from .models import Image


class ImageSerializer(serializers.ModelSerializer):
    file = serializers.FileField(write_only=True)
    download_url = serializers.SerializerMethodField()

    class Meta:
        model = Image
        fields = ["id", "title", "file", "download_url", "category", "uploaded_at"]
        read_only_fields = ["id", "category", "uploaded_at", "download_url"]

    def get_download_url(self, obj):

        s3 = boto3.client(
            "s3",
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            region_name=settings.AWS_S3_REGION_NAME,
        )
        key = obj.file.name
        filename = os.path.basename(key)
        url = s3.generate_presigned_url(
            ClientMethod="get_object",
            Params={
                "Bucket": settings.AWS_STORAGE_BUCKET_NAME,
                "Key": key,
                "ResponseContentDisposition": f'attachment; filename="{filename}"',
            },
            ExpiresIn=3600,
        )
        return url
