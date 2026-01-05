"use client";

import { useRouter } from "next/navigation";
import MenuLink from "./navbar/MenuLink";

interface logoutButtonProps {
  onCloseMenu: () => void;
}

const LogoutButton = ({ onCloseMenu }: logoutButtonProps) => {
  const router = useRouter();

  const submitLogout = async () => {
    try {
      await fetch("/api/auth/logout/", {
        method: "POST",
      });

      onCloseMenu();

      router.refresh();
      router.push("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  return <MenuLink label="Log out" onClick={submitLogout} />;
};
export default LogoutButton;
