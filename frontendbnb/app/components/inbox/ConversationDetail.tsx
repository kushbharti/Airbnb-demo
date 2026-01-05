"use client";

import React, { useEffect, useRef, useState } from "react";
import CustomButton from "../forms/CustomButton";
import { ConversationType, UserType } from "@/app/inbox/page";
import useWebSocket from "react-use-websocket";

export interface MessageType {
  id: string;
  name: string;
  body: string;
  created_by: UserType;
  send_to: UserType;
  conversationId: string;
}

interface ConversationDetailProps {
  conversation: ConversationType;
  userId: string;
  token: string | null;
}

const ConversationDetail = ({
  conversation,
  userId,
  token,
}: ConversationDetailProps) => {
  const messagesDiv = useRef<HTMLDivElement | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<MessageType[]>([]);

  const myUser = conversation.users.find((u) => u.id === userId)!;
  const otherUser = conversation.users.find((u) => u.id !== userId)!;

  // ---------------- LOAD OLD MESSAGES ----------------
  useEffect(() => {
    const loadMessages = async () => {
      if (!token) return;
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/api/chat/${conversation.id}/messages/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!res.ok) return;
        const data = await res.json();
        // Map backend to frontend message type
        const oldMessages = data.map((m: any) => ({
          id: m.id.toString(),
          name: m.name,
          body: m.body,
          send_to: otherUser,
          created_by: myUser,
          conversationId: conversation.id,
        }));
        setMessages(oldMessages);
        scrollToBottom();
      } catch (err) {
        console.error("Failed to load messages", err);
      }
    };
    loadMessages();
  }, [conversation.id, token]);

  // ---------------- WEBSOCKET ----------------
  const socketUrl =
    conversation?.id && token
      ? `ws://127.0.0.1:8000/ws/${conversation.id}/?token=${token}`
      : null;

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    socketUrl,
    {
      shouldReconnect: () => true,
    }
  );

  // ---------------- RECEIVE MESSAGE ----------------
  useEffect(() => {
    if (!lastJsonMessage) return;
    const message: MessageType = {
      id: Date.now().toString(),
      name: lastJsonMessage.name,
      body: lastJsonMessage.body,
      send_to: otherUser,
      created_by: myUser,
      conversationId: conversation.id,
    };
    setMessages((prev) => [...prev, message]);
    scrollToBottom();
  }, [lastJsonMessage]);

  // ---------------- SEND MESSAGE ----------------
  const sendMessage = () => {
    if (!newMessage.trim() || readyState !== 1) return;
    sendJsonMessage({
      event: "chat_message",
      data: {
        body: newMessage,
        sent_to_id: otherUser.id,
        conversation_id: conversation.id,
        name: myUser.name,
      },
    });
    setNewMessage("");
  };

  // ---------------- SCROLL ----------------
  const scrollToBottom = () => {
    if (messagesDiv.current) {
      messagesDiv.current.scrollTop = messagesDiv.current.scrollHeight;
    }
  };

  return (
    <>
      <div
        ref={messagesDiv}
        className="max-h-[400px] overflow-auto flex flex-col space-y-4"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`w-[80%] py-4 px-6 rounded-xl ${
              msg.name === myUser.name ? "ml-auto bg-blue-200" : "bg-gray-200"
            }`}
          >
            <p className="font-bold text-gray-500">{msg.name}</p>
            <p>{msg.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 py-4 px-6 flex border border-gray-300 space-x-4 rounded-xl">
        <input
          type="text"
          placeholder="Type your message..."
          className="w-full p-2 bg-gray-200 rounded-xl"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyUp={(e) => e.key === "Enter" && sendMessage()}
        />
        <CustomButton
          label="Send"
          onClick={sendMessage}
          className="w-[150px] bg-rose-500 hover:bg-rose-600"
        />
      </div>

      <p className="text-sm mt-2 text-gray-500">
        Status: {["Connecting", "Open", "Closing", "Closed"][readyState]}
      </p>
    </>
  );
};

export default ConversationDetail;
