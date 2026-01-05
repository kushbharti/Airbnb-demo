"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import useSignupModal from "@/app/hooks/useSignupModal";
import Modal from "./Modal";
import CustomButton from "../forms/CustomButton";
import apiService from "@/app/services/apiService";
import { SignupSuccessResponse } from "@/app/types/auth";

const SignupModal = () => {
  const signupModal = useSignupModal();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const submitSignup = async () => {
    setErrors([]);

    try {
      const response = await apiService.post<
        SignupSuccessResponse,
        {
          email: string;
          password1: string;
          password2: string;
        }
      >("/api/auth/register/", {
        email,
        password1,
        password2,
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

      signupModal.close();
      router.refresh();
      router.push("/");
    } catch (err: any) {
      if (typeof err === "object" && err !== null) {
        const backendErrors = Object.values(err)
          .flat()
          .map((msg) => String(msg));
        setErrors(backendErrors);
      } else {
        setErrors(["Something went wrong. Please try again."]);
      }
    }
  };

  const content = (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submitSignup();
      }}
      className="space-y-5"
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        required
        className="w-full h-[54px] px-4 border border-gray-400 rounded-xl"
      />

      <input
        type="password"
        value={password1}
        onChange={(e) => setPassword1(e.target.value)}
        placeholder="Password"
        required
        className="w-full h-[54px] px-4 border border-gray-400 rounded-xl"
      />

      <input
        type="password"
        value={password2}
        onChange={(e) => setPassword2(e.target.value)}
        placeholder="Repeat password"
        required
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

      <CustomButton label="Submit" onClick={submitSignup} />
    </form>
  );

  return (
    <Modal
      isOpen={signupModal.isOpen}
      close={signupModal.close}
      label="Sign Up"
      content={content}
    />
  );
};

export default SignupModal;
