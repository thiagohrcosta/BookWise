'use client'

import { signIn } from "next-auth/react";
import { styled } from "../../../stitches.config";

import { FaGoogle } from "react-icons/fa";

const ButtonStyle = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",

  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    border: "1px solid $purple100",
    borderRadius: 8,
    width: "280px",
    padding: "5px 15px",
    cursor: "pointer",

    "&:hover": {
      background: "$purple100",
    },
  }
})
export default function LoginButton() {
  const handleLogin = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <ButtonStyle>
      <button onClick={handleLogin}>
        <FaGoogle /> Sign in with Google
      </button>
    </ButtonStyle>
  );
}
