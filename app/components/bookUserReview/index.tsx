import { styled } from "@stitches/react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { formatDistanceToNow } from "date-fns";

const BookUserReviewContainer = styled("div", {
  backgroundColor: "$gray600",
  color: "$gray100",
  margin: "20px auto",
  padding: "20px",

  ".review-container": {
    display: "flex",
    justifyContent: "space-between",
    borderRadius: "8px",
  },

  ".stars-container": {
    display: "flex",
    gap: "4px",
  },

  ".review-text": {
    marginTop: "20px",
    color: "$gray300",
  }
});

interface BookUserReviewProps {
  id: string;
  message: string;
  rating: number;
  email: string;
  createdAt: string;
}

export default function BookUserReview({ id, message, rating, createdAt, email }: BookUserReviewProps) {
  return (
    <BookUserReviewContainer>
      <div className="review-container">
        <div>
          <p>{email}</p>
          <p>Posted {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</p>
        </div>
        <div className="stars-container">
          {[...Array(5)].map((_, index) =>
            index < rating ? <AiFillStar key={index} /> : <AiOutlineStar key={index} />
          )}
        </div>
      </div>
      <div className="review-text">
        <p>{message}</p>
      </div>

    </BookUserReviewContainer>
  )
}