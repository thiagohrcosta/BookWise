'use client'

import { signIn } from "next-auth/react";

export default function LoginButton() {
  const handleLogin = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <button onClick={handleLogin}>
      Sign in with Google
    </button>
  );
}
