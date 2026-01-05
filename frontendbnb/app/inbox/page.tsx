import React from "react";
import Conversation from "../components/inbox/Conversation";
import { getAccessToken, getUserId } from "../lib/actions";
import apiService from "../services/apiService";

export type UserType = {
  id: string;
  name: string;
  avatar_url: string;
};

export type ConversationType = {
  id: string;
  users: UserType[];
  modified_at: string;
};

const InboxPage = async () => {
  const userId = await getUserId();

  if (!userId) {
    return (
      <main className="max-w-[1500px] max-auto px-6 py-12">
        <p>You need to be authenticated...</p>
      </main>
    );
  }

  const conversations = await apiService.get("/api/chat/");

  // console.log("Conversation Data => ", conversations);

  return (
    <main className="max-w-[1500px] max-auto px-6 pb-6 space-y-4">
      <h1 className="my-6 text-2xl">Inbox</h1>
      {conversations.map((conversation: ConversationType) => {
        return (
          <Conversation
            key={conversation.id}
            conversation={conversation}
            userId={userId}
          />
        );
      })}
    </main>
  );
};

export default InboxPage;
