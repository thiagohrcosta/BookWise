'use client'

import Image from "next/image";
import Logo from "../../assets/img/logo.svg";
import { styled } from "../../../stitches.config";

import { FaHome } from "react-icons/fa";
import { IoLibrary } from "react-icons/io5";
import { ImBooks } from "react-icons/im";
import { MdOutlineStarHalf } from "react-icons/md";
import { BsPersonSquare } from "react-icons/bs";
import { BiSolidCategory } from "react-icons/bi";
import { FiLogIn } from "react-icons/fi";

import Bg from "../../assets/img/Background.png";
import Link from "next/link";
import { useSession } from "next-auth/react";


const SidebarStyle = styled("div", {
  backgroundImage: `url(${Bg.src})`,
  width: "232px",
  position: "fixed",
  height: "calc(100vh - 30px)",
  padding: "40px 5px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  borderRadius: "8px",
})

const SidebarList = styled("ul", {
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: "20px",
})

const SidebarItem = styled("li", {
  display: "flex",
  alignItems: "center",
  gap: "10px",

  a: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },

  span: {
    marginLeft: 10,
  }
})

const LoginLogoutStyle = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
})

export default function Sidebar() {
  const session = useSession();
  const user = session.data?.user;

  return (
    <SidebarStyle>
      <Image
        src={Logo}
        alt="Logo"
        width={128}
        height={100}
        priority
      />
      <div>
        <SidebarList>
          <SidebarItem>
            <Link href="/">
              <FaHome />
              <span>HOME</span>
            </Link>
          </SidebarItem>
          <SidebarItem>
            <Link href="/library">
              <IoLibrary />
              <span>MY LIBRARY</span>
            </Link>
          </SidebarItem>
          <SidebarItem>
            <Link href="/books">
              <ImBooks />
              <span>BOOKS</span>
            </Link>
          </SidebarItem>
          <SidebarItem><MdOutlineStarHalf /> REVIEWS</SidebarItem>
          <SidebarItem><BsPersonSquare /> AUTHORS</SidebarItem>
          <SidebarItem><BiSolidCategory /> GENRES</SidebarItem>
        </SidebarList>
      </div>
      <LoginLogoutStyle>
        <Link href="/login">
          <span>{user?.name ?? "Login"}</span>
        </Link>
        <FiLogIn />
      </LoginLogoutStyle>
    </SidebarStyle>
  )
}