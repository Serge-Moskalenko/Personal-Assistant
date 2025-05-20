from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator

from .models import Note


class NoteSerializer(serializers.ModelSerializer):
    owner = serializers.HiddenField(default=serializers.CurrentUserDefault())

    tags = serializers.ListField(
        child=serializers.CharField(), required=False, allow_empty=True
    )
    reminder_date = serializers.DateField(required=False, allow_null=True)
    status = serializers.ChoiceField(choices=Note.STATUS, required=False)

    class Meta:
        model = Note
        fields = [
            "id",
            "owner",
            "title",
            "content",
            "tags",
            "reminder_date",
            "status",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]

        validators = [
            UniqueTogetherValidator(
                queryset=Note.objects.all(),
                fields=["owner", "title"],
                message="У вас уже є нотатка з таким заголовком.",
            )
        ]

    def to_representation(self, instance):
        ret = super().to_representation(instance)

        ret["tags"] = instance.tags.split(",") if instance.tags else []
        return ret

    def create(self, validated_data):
        tags_list = validated_data.pop("tags", [])
        validated_data["tags"] = ",".join(tags_list)
        return super().create(validated_data)

    def update(self, instance, validated_data):
        tags_list = validated_data.pop("tags", None)
        if tags_list is not None:
            validated_data["tags"] = ",".join(tags_list)
        return super().update(instance, validated_data)
