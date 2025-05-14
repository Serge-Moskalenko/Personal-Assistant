from rest_framework import serializers

from .models import Article


class NewsItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = [
            "guid",
            "title",
            "link",
            "description",
            "pub_date",
        ]
