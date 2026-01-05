"use client";
import React from "react";

interface MenuLinkProps {
  label: string;
  onClick: () => void;
}

const MenuLink = ({ label, onClick }: MenuLinkProps) => {
  return (
    <div
      onClick={onClick}
      className="px-5 py-4 cursor-pointer hover:bg-gray-200 transition"
    >
      {label}
    </div>
  );
};

export default MenuLink;
