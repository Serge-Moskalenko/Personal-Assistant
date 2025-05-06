import uuid

from django.db import models
from django.utils.translation import gettext_lazy as _


class Note(models.Model):
    STATUS = [
        ("", "None"),
        ("green", "Completed"),
        ("yellow", "Pending"),
        ("red", "Failed"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(_("title"), max_length=200)
    content = models.TextField(_("content"))
    tags = models.CharField(
        _("tags"), max_length=200, blank=True, help_text=_("Comma-separated keywords")
    )
    reminder_date = models.DateField(
        _("reminder date"),
        null=True,
        blank=True,
        help_text=_("Optional reminder date in the future"),
    )
    status = models.CharField(
        _("status"),
        max_length=10,
        choices=STATUS,
        default="",
        help_text=_("Color label: green/completed, yellow/pending, red/failed"),
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.title
