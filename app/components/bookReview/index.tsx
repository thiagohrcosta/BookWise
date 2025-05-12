"use client"

import Image from "next/image";
import Avatar from "../../assets/img/avatar.jpg";
import Book2 from "../../assets/img/book2.jpg";
import Stars from "../stars";
import { GetBookReviews } from "../../api/get-book-ratings/route";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { styled } from "../../../stitches.config";

const BookReviewContainer = styled("div", {
  background: "$gray700",
  padding: 24,
  borderRadius: 8,
  marginBottom: 10,

  ".review-header": {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "32px",
    color: "$gray100"
  },

  ".review-content": {
    display: "flex",
    justifyContent: "space-between",

    img: {
      width: "108px",
      height: "152px"
    }
  },

  ".book-title": {
    fontWeight: "bold",
    fontSize: "24px",
    color: "$gray100"
  },

  ".book-author": {
    color: "$gray300",
    marginBottom: "32px"
  },

   ".book-review": {
    width: "75%",
    color: "$gray300",
  },
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
            <div className="review-header">
              <div className="flex">
                <div className="">
                  <h3>{bookReview.user_email}</h3>
                  <p>Posted {formatDistanceToNow(new Date(bookReview.created_at), { addSuffix: true })}</p>
                </div>
              </div>
              <Stars />
            </div>
            <div className="review-content">
              <div className="flex">
                <Image
                  src={bookReview.book_cover}
                  alt="Book Cover"
                  width={508}
                  height={152}
                  className="rounded-lg"
                />
              </div>
              <div className="book-review">
                <p className="book-title">{bookReview.book_name}</p>
                <p className="book-author">{bookReview.author_name}</p>
                <div>
                  <p>
                    {bookReview.message}
                  </p>
                </div>
              </div>
            </div>
          </BookReviewContainer>
        )}
      )}
    </div>
  )
}