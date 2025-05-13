"use client"

import { GoPerson } from "react-icons/go";
import { CiSearch } from "react-icons/ci";

import { styled } from "../../stitches.config";
import { useEffect, useState } from "react";
import { GetUserBookReviews } from "../api/get-user-book-reviews/route";
import { BookReviewCard } from "../components/bookReviewCard";
import { useSession } from "next-auth/react";

const ProfileContainer = styled("div", {
  margin: "32px 64px",
})

const ProfileHeader = styled("div", {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  color: "$gray100",
  marginBottom: 32,
  fontSize: 24,

  svg: {
    color: "$green100",
    marginRight: "10px"
  }
})

const ProfileSearchBar = styled("div", {
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  border: "1px solid $gray500",
  borderRadius: 4,
  height: 48,
  padding: 10,
  marginBottom: "24px",

  input: {
    width: "100%",
    padding: "5px 15px",
  },

  svg: {
    color: "$gray500",
  }
})

const BookReviewContainer = styled("div", {
  background: "$gray700",
  padding: 24,
  borderRadius: 8,
  marginBottom: 10,
})

export default function Profile() {
  const [reviewedBooks, setReviewedBooks] = useState<any[]>([]);
  const session = useSession();
  const user = session.data?.user;

  useEffect(() => {
    if (user?.email) {
      GetUserBookReviews(user.email).then(async (response) => {
        if (response) {
          const data = await response.data
          console.log("CHEGOU", data)
          setReviewedBooks(data || []);
        } else {
          console.error("Failed to fetch user book reviews");
        }
      });
    }
  }, [user?.email])

  return (
    <ProfileContainer>
      <ProfileHeader>
        <GoPerson size={32} />
        <h2>Profile</h2>
      </ProfileHeader>
      <ProfileSearchBar>
        <input type="text" placeholder="Search for a book reviewed by you." />
        <CiSearch size={32} />
      </ProfileSearchBar>
      {reviewedBooks ? (reviewedBooks.map((review, idx) => {
        return (
          <BookReviewContainer key={idx}>
            <BookReviewCard
              bookReview={review}
            />
          </BookReviewContainer>
        )
      })) : (
        <span>You don't have any review yet.</span>
      )}
    </ProfileContainer>
  )
}