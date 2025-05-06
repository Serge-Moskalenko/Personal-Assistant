import django_filters
from django.db.models import Q

from .models import Note


class NoteFilter(django_filters.FilterSet):
    date_from = django_filters.DateFilter(field_name="reminder_date", lookup_expr="gte")
    date_to = django_filters.DateFilter(field_name="reminder_date", lookup_expr="lte")
    tags = django_filters.CharFilter(method="filter_tags")
    search = django_filters.CharFilter(method="filter_search")

    class Meta:
        model = Note
        fields = ["status"]

    def filter_tags(self, queryset, name, value):
        tags = value.split(",")
        for t in tags:
            queryset = queryset.filter(tags__icontains=t.strip())
        return queryset

    def filter_search(self, queryset, name, value):
        return queryset.filter(Q(title__icontains=value) | Q(content__icontains=value))
