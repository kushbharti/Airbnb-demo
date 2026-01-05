"use client";

import { ConversationType } from "@/app/inbox/page";
import { useRouter } from "next/navigation";

interface ConversationProps {
  conversation: ConversationType;
  userId: string;
}

const Conversation = ({ conversation, userId }: ConversationProps) => {
  const router = useRouter();
  const otherUser = conversation.users.find((user) => user.id !== userId);
  // console.log("otherUser", otherUser);
  if (!otherUser) return null;

  return (
    <div className="px-6 py-4 cursor-pointer border border-gray-300 rounded-xl">
      <p className="mb-6 text-xl">{otherUser && otherUser.name}</p>
      <p
        onClick={() => router.push(`/inbox/${conversation.id}`)}
        className="text-rose-600"
      >
        Go to Conversation
      </p>
    </div>
  );
};

export default Conversation;
