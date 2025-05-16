"use client"

import { GetBookReviews } from "../../api/get-book-ratings/route";
import { useEffect, useState } from "react";
import { styled } from "../../../stitches.config";
import { BookReviewCard } from "../bookReviewCard";

const BookReviewContainer = styled("div", {
  background: "$gray700",
  padding: 24,
  borderRadius: 8,
  marginBottom: 10,
})

export function BookReview() {
  const [bookReviews, setBookReviews] = useState([]);

  useEffect(() => {
    GetBookReviews().then((reviews) => setBookReviews(reviews));
  }, []);

  return (
    <div>
      {bookReviews && bookReviews?.map((bookReview, idx) => {
        return (
          <BookReviewContainer key={idx}>
            <BookReviewCard
              bookReview={bookReview}
            />
          </BookReviewContainer>
        )}
      )}
    </div>
  )
}