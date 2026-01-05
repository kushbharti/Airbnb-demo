"use client";

import { useRouter } from "next/navigation";
import useLoginModal from "../hooks/useLoginModal";
import apiService from "../services/apiService";

interface ContactButttonProps {
  userId: string | null;
  landlordId: string;
}

const ContactButtton = ({ userId, landlordId }: ContactButttonProps) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const startConversation = async () => {
    if (userId) {
      const conversation = await apiService.get(
        `/api/chat/start/${landlordId}/`
      );

      if (conversation.conversation_id) {
        router.push(`/inbox/${conversation.conversation_id}`);
      }
    } else {
      loginModal.open();
    }
  };

  return (
    <div
      onClick={startConversation}
      className="cursor-pointer mt-6 py-4 px-6 bg-rose-500 hover:bg-rose-600 transition text-white rounded-xl"
    >
      Contact
    </div>
  );
};

export default ContactButtton;
