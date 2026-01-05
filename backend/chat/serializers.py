from rest_framework import serializers
from .models import Conversation, ConverationMessages
from useraccount.models import User

class UserSerializer(serializers.ModelSerializer):
    avatar_url = serializers.CharField( read_only=True)

    class Meta:
        model = User
        fields = ["id", "name", "avatar_url"]

class ConversationListSerializer(serializers.ModelSerializer):
    users = UserSerializer(many=True, read_only=True)

    class Meta:
        model = Conversation
        fields = ["id", "users", "modified_at"]

class MessageSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source="created_by.name", read_only=True)

    class Meta:
        model = ConverationMessages
        fields = ["id", "name", "body", "created_at"]
