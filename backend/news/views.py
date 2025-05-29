from rest_framework import viewsets

from .models import Article
from .serializers import NewsItemSerializer
from rest_framework.permissions import AllowAny


class NewsItemViewSet(viewsets.ReadOnlyModelViewSet):
    authentication_classes = []
    permission_classes = [AllowAny]
    queryset = Article.objects.all()
    serializer_class = NewsItemSerializer
