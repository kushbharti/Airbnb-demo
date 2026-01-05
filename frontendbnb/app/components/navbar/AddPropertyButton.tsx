"use client";

import useAddPropertyModal from "@/app/hooks/useAddPropertyModal";
import useLoginModal from "@/app/hooks/useLoginModal";
interface AddPropertyButtonProps {
  userId?: string | null;
}

const AddPropertyButton = ({ userId }: AddPropertyButtonProps) => {
  const addPropertyModal = useAddPropertyModal();
  const loginModal = useLoginModal();
  const airbnbYourHome = () => {
    if (userId) {
      addPropertyModal.open();
    } else {
      loginModal.open();
    }
  };

  return (
    <div
      onClick={airbnbYourHome}
      className="p-2 cursor-pointer text-sm font-semibold rounded-full hover:bg-gray-200"
    >
      Home
    </div>
  );
};

export default AddPropertyButton;
