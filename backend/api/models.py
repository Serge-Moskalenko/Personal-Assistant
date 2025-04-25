from django.db import models

from django.db import models


class Contact(models.Model):
    first_name    = models.CharField("Ім’я",     max_length=100)
    last_name     = models.CharField("Прізвище", max_length=100)
    address       = models.TextField("Адреса",    blank=True)
    phone_number  = models.CharField("Телефон",   max_length=20)
    email         = models.EmailField("Email",     unique=True)
    birthday      = models.DateField("Дата народження")
    created_at    = models.DateTimeField("Створено", auto_now_add=True)
    updated_at    = models.DateTimeField("Оновлено", auto_now=True)

    class Meta:
        verbose_name = "Контакт"
        verbose_name_plural = "Контакти"
        ordering = ["last_name", "first_name"]

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
