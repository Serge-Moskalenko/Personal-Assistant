# Generated by Django 5.2 on 2025-05-14 13:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("news", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="article",
            name="guid",
            field=models.TextField(unique=True),
        ),
        migrations.AlterField(
            model_name="article",
            name="link",
            field=models.URLField(max_length=500),
        ),
    ]
