import { useState } from "react"
import { styled } from "../../../stitches.config";
import { IoStarOutline, IoStar } from "react-icons/io5";
import { useSession } from "next-auth/react";
import api from "../../lib/axios";

interface BookProps {
  book: {
    id: string;
    title: string;
  };
}

const ReviewContainer = styled("div", {

  margin: "20px 0",

  ".book-rating": {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column"
  },

  ".stars-container": {
    marginBottom: 20,
    display: "flex",
  },

  ".review-content": {
    textarea: {
      width: "100%",
      border: `1px solid #F8F9FC`,
      padding: 10,
    }
  }
})

const ReviewButton = styled("div", {
  marginTop: 10,
  width: "100%",
  background: "$purple100",
  color: "$white",
  border: "none",
  padding: "8px 16px",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "1rem",
  textAlign: "center",

  "&:hover": {
    background: "$purple200",
  },
  "&:active": {
    background: "$purple200",
  },
  "&:focus": {
    outline: "none",
    boxShadow: "0 0 0 2px $purple200",
  },
})

export function ReviewCard({ book }: BookProps) {
  const router = window.location.href.split("/")[3]

  const { data: session, status } = useSession();

  if (!session || router !== "library") {
    return null;
  }

  const [isUserAddingAReview, setIsUserAddingReview] = useState(false);
  const [bookRating, setBookRating] = useState<number | null>(null);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [bookComments, setBookComments] = useState<string | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoverRating(index);
  };

  const handleMouseLeave = () => {
    setHoverRating(null);
  };

  const handleClick = (index: number) => {
    setBookRating(index);
  };

  async function handlePostReview(e) {
    e.preventDefault();

    const data = {
      message: bookComments,
      rating: bookRating,
      book_id: book.title,
      user_id: session.user.email,
    }

    const response = await api.post("/api/v1/user_book_ratings", {user_book_ratings: data})

    if (response.status === 200) {
      window.location.href = "/library"
    }
  }

  return (
    <div>

      {isUserAddingAReview === false && (
        <ReviewButton>
          <button onClick={() => setIsUserAddingReview(!isUserAddingAReview)}>Post Review</button>
        </ReviewButton>
      )}
      {isUserAddingAReview && (
        <ReviewContainer>
          <div className="book-rating">
            <div className="stars-container">
              <p>Rating: </p>
              {[1, 2, 3, 4, 5].map((star) => {
                const isFilled = hoverRating ? star <= hoverRating : star <= (bookRating ?? 0);
                return (
                  <span
                    key={star}
                    onMouseEnter={() => handleMouseEnter(star)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick(star)}
                    style={{ cursor: "pointer", fontSize: "24px", color: isFilled ? "#facc15" : "#d1d5db" }}
                  >
                    {isFilled ? <IoStar /> : <IoStarOutline />}
                  </span>
                )
              })}
            </div>
            <div className="review-content">
              <textarea rows={5} onChange={(e) => setBookComments(e.target.value)}/>
              <ReviewButton>
                <button onClick={(e) => handlePostReview(e)}>Post Review</button>
              </ReviewButton>
            </div>
          </div>
        </ReviewContainer>
      )}
    </div>
  )
}
