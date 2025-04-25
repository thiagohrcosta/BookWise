import Image from "next/image";
import { styled } from "../../stitches.config";

import Logo from "../assets/img/logo.svg";
import LoginBg from "../assets/img/loginBg.png";

import { FaRegCopyright } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";


const LoginStyle = styled("div", {
  margin: 0,
  padding: "20px",
  display: "flex",
})

const LoginContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: "20px",
  width: "100%",
})

const LoginBackContainer = styled("div", {
  display: "flex",
  justifyContent: "flex-end",
  gap: "10px",

  p: {
    color: "$gray100",
    fontSize: "16px",
    fontWeight: "500",
  }
})

const LoginLeftContainer = styled("div", {
  backgroundImage: `url(${LoginBg.src})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  width: "100%",
  height: "calc(100vh - 40px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "8px",
})

const LoginCredentialContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
})

const LoginFooterContainer = styled("div", {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: "10px",
})

export default function Login() {
  const currentYear = new Date().getFullYear();

  return (
    <LoginStyle>
      <LoginLeftContainer>
        <Image
          src={Logo}
          alt="Logo"
          width={500}
          height={500}
          style={{ borderRadius: "8px" }}
        />
      </LoginLeftContainer>
      <LoginContainer>
        <LoginBackContainer>
          <IoIosArrowBack size={24} color="#A0AEC0" />
          <Link href="/">
            <p className="text-gray-100">Back</p>
          </Link>
        </LoginBackContainer>
        <LoginCredentialContainer>
          <h1 className="text-2xl font-bold text-gray-100">Login</h1>
        </LoginCredentialContainer>
        <LoginFooterContainer>
          <FaRegCopyright color="#fff"/>
          <p className="text-gray-100">BookWise - {currentYear} </p>
        </LoginFooterContainer>
      </LoginContainer>
    </LoginStyle>
  )
}