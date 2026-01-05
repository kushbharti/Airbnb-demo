import ConversationDetail from "@/app/components/inbox/ConversationDetail";
import { getAccessToken, getUserId } from "@/app/lib/actions";
import apiService from "@/app/services/apiService";
import React from "react";
import { UserType } from "../page";

export type MessageType = {
  id: string;
  name: string;
  body: string;
  conversationId: string;
  send_to: UserType;
  created_by: UserType;
};

interface ConversationPageProps {
  params: { id: string } | Promise<{ id: string }>; // TS type
}

const ConverstionPage = async ({ params }: ConversationPageProps) => {
  const userId = await getUserId();
  const { id } = await params;
  const token = await getAccessToken();
  if (!userId) {
    return (
      <main className="max-w-[1500px] max-auto px-6 py-12">
        <p>You need to be authentication....</p>
      </main>
    );
  }
  // Fetch conversation safely
  let conversation = null;
  try {
    conversation = await apiService.getConversations(`/api/chat/${id}/`);
    conversation.users = conversation.users || [];
  } catch (err) {
    console.error("Failed to fetch conversation:", err);
    return (
      <main className="max-w-[1500px] mx-auto px-6 py-12">
        <p>Failed to load conversation.</p>
      </main>
    );
  }

  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6">
      <ConversationDetail
        conversation={conversation}
        userId={userId}
        token={token}
      />
    </main>
  );
};

export default ConverstionPage;
