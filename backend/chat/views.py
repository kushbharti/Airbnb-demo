from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Conversation, ConverationMessages
from .serializers import ConversationListSerializer, MessageSerializer
from useraccount.models import User
from django.shortcuts import get_object_or_404


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def conversations_list(request):
    conversations = request.user.conversations.all()
    serializer = ConversationListSerializer(conversations, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def conversation_detail(request, pk):
    conversation = request.user.conversations.get(pk=pk)
    serializer = ConversationListSerializer(conversation)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def conversation_messages(request, pk):
    messages = ConverationMessages.objects.filter(
        conversation_id=pk
    ).order_by("created_at")

    serializer = MessageSerializer(messages, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def conversation_start(request, user_id):
    try:
        other_user = get_object_or_404(User, id=user_id)

        # Prevent chatting with yourself
        if other_user == request.user:
            return Response(
                {"error": "You cannot message yourself"},
                status=400
            )

        # Check existing conversation
        conversation = (
            Conversation.objects
            .filter(users=request.user)
            .filter(users=other_user)
            .first()
        )

        # Create if not exists
        if not conversation:
            conversation = Conversation.objects.create()
            conversation.users.add(request.user, other_user)

        return Response({
            "success": True,
            "conversation_id": str(conversation.id)
        })

    except Exception as e:
      
        return Response(
            {"error": str(e)},
            status=500
        )
