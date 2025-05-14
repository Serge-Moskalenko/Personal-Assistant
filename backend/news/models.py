from django.db import models


class Article(models.Model):
    guid = models.TextField(unique=True)
    title = models.CharField(max_length=500)
    link = models.URLField(max_length=500)
    description = models.TextField(blank=True)
    pub_date = models.DateTimeField()

    class Meta:
        ordering = ["-pub_date"]
