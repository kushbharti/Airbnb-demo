"use client";
import useLoginModal from "@/app/hooks/useLoginModal";

import Modal from "./Modal";
import CustomButton from "../forms/CustomButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import apiService from "@/app/services/apiService";
import { SignupSuccessResponse } from "@/app/types/auth";

const LoginModal = () => {
  const loginModal = useLoginModal();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const submitLogin = async () => {
    setErrors([]);
    try {
      const response = await apiService.post<
        SignupSuccessResponse,
        { email: string; password: string }
      >("/api/auth/login", {
        email,
        password,
      });
      await fetch("/api/auth/session/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: response.user.pk,
          accessToken: response.access,
          refreshToken: response.refresh,
        }),
      });

      loginModal.close();
      router.refresh();
      router.push("/");
      console.log("login success");
    } catch (err: any) {
      if (typeof err === "object" && err !== null) {
        const backendErrors = Object.values(err)
          .flat()
          .map((msg) => String(msg));
        setErrors(backendErrors);
      } else {
        setErrors(["Invalid email or password"]);
      }
    }
  };

  const content = (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitLogin();
        }}
        className="space-y-5"
      >
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Your e-mail address"
          className="w-full h-[54px] px-4 border border-gray-400 rounded-xl"
        />
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          placeholder="Your Psasword"
          className="w-full h-[54px] px-4 border border-gray-400 rounded-xl"
        />

        {errors.map((error, index) => (
          <div
            key={index}
            className="text-white p-5  bg-rose-500 rounded-xl opacity-80"
          >
            {error}
          </div>
        ))}
        <CustomButton label="Submit" onClick={submitLogin} />
      </form>
    </>
  );

  return (
    <Modal
      isOpen={loginModal.isOpen}
      close={loginModal.close}
      label="Log In"
      content={content}
    />
  );
};

export default LoginModal;
