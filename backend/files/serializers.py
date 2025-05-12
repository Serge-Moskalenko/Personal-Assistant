from rest_framework import serializers
from rest_framework.reverse import reverse

from .models import Image


class ImageSerializer(serializers.ModelSerializer):

    file = serializers.FileField(write_only=True)

    download_url = serializers.SerializerMethodField()

    class Meta:
        model = Image
        fields = [
            "id",
            "title",
            "file",
            "download_url",
            "category",
            "uploaded_at",
        ]
        read_only_fields = ["id", "category", "uploaded_at"]

    def get_download_url(self, obj: Image) -> str:
        request = self.context.get("request")
        return reverse("file-download", args=[obj.pk], request=request)
