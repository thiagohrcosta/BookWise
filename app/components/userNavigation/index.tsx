"use client"

import { useEffect, useState } from "react";
import PopularBooks from "../popularBook";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { styled } from "../../../stitches.config";
import VerticalBar from "../../assets/img/bar.png";
import { GetUserProfile } from "../../api/get-user-profile/route";
import { IoBookOutline } from "react-icons/io5";

interface UserProfileProps {
  read_pages: number;
  books_rated: number;
  authors_read: number;
  most_read_genre: string;
}

const ProfileStyle = styled("div", {
  position: "sticky",
  top: "20px",
  width: "100%",
  border: "1px solid $gray700",
  zIndex: 10,
  padding: "16px",
})

const HeaderProfile = styled("div", {
  marginTop: "32px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",

  h1: {
    margin: "10px 0"
  }
})

const VerticalBarStyle = styled("div", {
  margin: "32px 0",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
})

const ProfileInformation = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "$gray100",
  marginBottom: 40,

  svg: {
    color: "$green100",
    marginRight: 20,
    flexShrink: 0,
  },

  div: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minWidth: "120px",
    textAlign: "left",
  },

  p: {
    margin: 0,
    lineHeight: "1.2",
  },
});

export function UserNavigation() {
  const [url, setUrl] = useState("");
  const session = useSession();
  const user = session.data?.user;

  const [userProfile, setUserProfile] = useState<UserProfileProps>()

  useEffect(() => {
    const currentUrl = window.location.href;
    const splitedUrl = currentUrl.split("/")
    const urlLenght = splitedUrl.length

    const currentPath = splitedUrl[urlLenght - 1]

    setUrl(currentPath);
  }, []);

  useEffect(() => {
    if (user?.email) {
      GetUserProfile(user.email).then(async (response) => {
        if (response) {
          const data = await response.data
          console.log("Profile", data)
          setUserProfile(data || []);
        } else {
          console.error("Failed to fetch user profile");
        }
      });
    }
  }, [user?.email]);


  return (
    <>
      {url === "profile" ? (
        <ProfileStyle>
          <HeaderProfile>
            <Image
              src={user?.image || "https://res.cloudinary.com/dloadb2bx/image/upload/v1713289318/development/qx1ac5kw6jkamtzmhcpdbtqlvq9t.jpg"}
              width={48}
              height={48}
              alt="User photo"
              className="rounded-full"
            />
            <h1>{user?.name}</h1>
          </HeaderProfile>
          <VerticalBarStyle>
            <Image
              src={VerticalBar}
              alt="Vertical bar"
            />
          </VerticalBarStyle>
          <ProfileInformation>
            <IoBookOutline size={32} />
            <div>
              <p>{userProfile?.read_pages}</p>
              <p>Pages read</p>
            </div>
          </ProfileInformation>
          <ProfileInformation>
            <IoBookOutline size={32} />
            <div>
              <p>{userProfile?.books_rated}</p>
              <p>Books rated</p>
            </div>
          </ProfileInformation>
          <ProfileInformation>
            <IoBookOutline size={32} />
            <div>
              <p>{userProfile?.authors_read}</p>
              <p>Authors read</p>
            </div>
          </ProfileInformation>
          <ProfileInformation>
            <IoBookOutline size={32} />
            <div>
              <p>{userProfile?.most_read_genre}</p>
              <p>Most read genre</p>
            </div>
          </ProfileInformation>
        </ProfileStyle>
      ) : (
        <PopularBooks />
      )}
    </>
  )
}