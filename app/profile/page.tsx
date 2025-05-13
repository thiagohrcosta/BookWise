"use client"

import { GoPerson } from "react-icons/go";
import { CiSearch } from "react-icons/ci";

import { styled } from "../../stitches.config";
import { useEffect, useState } from "react";
import { GetUserBookReviews } from "../api/get-user-book-reviews/route";
import { BookReviewCard } from "../components/bookReviewCard";

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

  input: {
    width: "100%"
  },

  svg: {
    color: "$gray500",
  }
})

export default function Profile() {
  const [reviewedBooks, setReviewedBooks] = useState<any[]>([]);

  useEffect(() => {
    GetUserBookReviews().then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setReviewedBooks(data.books || []);
      } else {
        console.error("Failed to fetch user book reviews");
      }
    });
  })

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
      {reviewedBooks && reviewedBooks.map((review) => {
        return (
          <BookReviewCard
            bookReview={review}
          />
        )
      })}
    </ProfileContainer>
  )
}