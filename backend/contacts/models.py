import uuid

from django.db import models
from django.utils.translation import gettext_lazy as _


class Contact(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    first_name = models.CharField(
        _("first name"),
        max_length=100,
        help_text=_("Given name"),
    )

    last_name = models.CharField(
        _("last name"),
        max_length=100,
        help_text=_("Family name"),
    )

    address = models.TextField(
        _("address"),
        help_text=_("Postal address"),
    )

    phone_number = models.CharField(
        _("phone number"),
        max_length=20,
        help_text=_("Include country code, e.g., +1-202-555-0123"),
    )
    email = models.EmailField(
        _("email address"),
        unique=True,
        help_text=_("Contact email"),
    )
    birthday = models.DateField(
        _("birthday"),
        blank=True,
        null=True,
        help_text=_("Date of birth"),
    )
    created_at = models.DateTimeField(
        _("created at"),
        auto_now_add=True,
        help_text=_("Record creation timestamp"),
    )
    updated_at = models.DateTimeField(
        _("updated at"),
        auto_now=True,
        help_text=_("Record last modification timestamp"),
    )

    class Meta:
        verbose_name = _("contact")
        verbose_name_plural = _("contacts")
        ordering = ["last_name", "first_name"]

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
