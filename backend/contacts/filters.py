import datetime

from django.db.models import Q
from django_filters import rest_framework as filters

from .models import Contact


class ContactFilter(filters.FilterSet):
    days_ahead = filters.NumberFilter(method="filter_days_ahead")

    class Meta:
        model = Contact
        fields = []

    def filter_days_ahead(self, queryset, name, value):

        try:
            days = int(value)
        except (TypeError, ValueError):

            return queryset

        today = datetime.date.today()

        future_dates = [today + datetime.timedelta(days=i) for i in range(days + 1)]

        q = Q()
        for d in future_dates:
            q |= Q(birthday__month=d.month, birthday__day=d.day)

        return queryset.filter(q)
