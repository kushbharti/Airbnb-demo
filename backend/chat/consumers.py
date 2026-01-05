import json
from asgiref.sync import sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import Conversation, ConverationMessages
from useraccount.models import User
from uuid import UUID

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.conversation_id = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = f"chat_{self.conversation_id}"

        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data):
        try:
            data_json = json.loads(text_data)
            event = data_json.get("event")
            data = data_json.get("data", {})

            if event == "chat_message":
                body = data.get("body", "").strip()
                sent_to_id = data.get("sent_to_id")
                conversation_id = data.get("conversation_id")
                user_name = data.get("name")

                # Validate UUID
                try:
                    conversation_uuid = UUID(str(conversation_id))
                except:
                    print("Invalid conversation UUID:", conversation_id)
                    return

                if not body or not sent_to_id or not conversation_id or not user_name:
                    return

                await self.save_message(conversation_uuid, body, user_name, sent_to_id)

                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        "type": "chat_message",
                        "body": body,
                        "name": user_name,
                    }
                )

        except Exception as e:
            print("WebSocket receive error:", e)

    async def chat_message(self, event):
        await self.send(text_data=json.dumps({
            "name": event["name"],
            "body": event["body"],
        }))

    @sync_to_async
    def save_message(self, conversation_id, body, user_name, sent_to_id):
        try:
            conversation = Conversation.objects.get(id=conversation_id)
            sender = User.objects.get(name=user_name)
            receiver = User.objects.get(id=sent_to_id)

            ConverationMessages.objects.create(
                conversation=conversation,
                created_by=sender,
                sent_to=receiver,
                body=body
            )
            conversation.save()
        except Exception as e:
            print("Save message error:", e)
