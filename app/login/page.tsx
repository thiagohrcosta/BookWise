import { styled } from "../../stitches.config";

import LoginButton from "../components/LoginButton";

const LoginStyle = styled("div", {
  margin: 0,
  padding: "20px",
  display: "flex",
})

const LoginCredentialContainer = styled("div", {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  height: "80vh",
  alignItems: "center",
  gap: "20px",
  color: "$gray100",
})

export default function Login() {
  return (
    <LoginStyle>
      <LoginCredentialContainer>
        <LoginButton />
      </LoginCredentialContainer>
    </LoginStyle>
  )
}