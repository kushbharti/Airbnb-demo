from django.urls import path
from . import views

urlpatterns = [
    path("", views.conversations_list),
    path("start/<uuid:user_id>/", views.conversation_start,name="conversation_start"),
    
    path("<uuid:pk>/", views.conversation_detail,name="conversation_detail"),
    path("<uuid:pk>/messages/", views.conversation_messages,name="conversation_messages"),
]
