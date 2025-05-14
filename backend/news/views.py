from rest_framework import viewsets

from .models import Article
from .serializers import NewsItemSerializer


class NewsItemViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Article.objects.all()
    serializer_class = NewsItemSerializer
