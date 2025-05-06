from rest_framework import serializers

from .models import Note


class NoteSerializer(serializers.ModelSerializer):
    # tags як список для клієнта
    tags = serializers.ListField(
        child=serializers.CharField(), required=False, allow_empty=True
    )
    reminder_date = serializers.DateField(required=False, allow_null=True)
    status = serializers.ChoiceField(choices=Note.STATUS, required=False)

    class Meta:
        model = Note
        fields = "__all__"

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # перетворюємо записані в БД «a,b,c» у список
        ret["tags"] = instance.tags.split(",") if instance.tags else []
        return ret

    def create(self, validated_data):
        tags_list = validated_data.pop("tags", [])
        # записуємо в БД як рядок
        validated_data["tags"] = ",".join(tags_list)
        return super().create(validated_data)

    def update(self, instance, validated_data):
        tags_list = validated_data.pop("tags", None)
        if tags_list is not None:
            validated_data["tags"] = ",".join(tags_list)
        return super().update(instance, validated_data)
