"use client";

import { styled } from "@stitches/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoClose } from "react-icons/io5";
import { AiFillStar } from "react-icons/ai";
import BookUserReview from "../bookUserReview";
import { ReviewCard } from "../reviewCard";
import { useBookReview } from "../../context/bookReviewContext";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface Book {
  id: string;
  name: string;
  description: string;
  pages: string;
  genre: string;
  imageUrl: string;
  price: string;
}

interface BookModalProps {
  book: Book | null;
  isOpened: boolean;
  onClose: () => void;
}

const Overlay = styled("div", {
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
  variants: {
    visible: {
      true: { display: "flex" },
      false: { display: "none" },
    },
  },
});

const Content = styled("div", {
  position: "absolute",
  top: 20,
  right: 20,
  backgroundColor: "$gray700",
  padding: "1rem",
  borderRadius: "8px",
  maxWidth: "500px",
  width: "100%",
});

const BookContainer = styled("div", {
  color: "$gray100",
  display: "flex",
  justifyContent: "space-between",
  fontSize: "1.5rem",
  gap: "32px",
  marginRight: "32px",

  p: {
    fontSize: "1rem",
    margin: "0 0 16px 0",
  }
});

const BuyButton = styled("div", {
  width: "100%",
  background: "$green100",
  color: "$white",
  border: "none",
  padding: "8px 16px",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "1rem",
  textAlign: "center",

  "&:hover": {
    background: "$green300",
  },
  "&:active": {
    background: "$green700",
  },
  "&:focus": {
    outline: "none",
    boxShadow: "0 0 0 2px $green500",
  },
});

const CloseButton = styled("div", {
  display: "flex",
  justifyContent: "flex-end",
  cursor: "pointer",
})

const BookInfo = styled("div", {
  hr: {
    width: "100%",
    border: "1px solid $gray600",
    margin: "16px 0",
  },

  ".book-info": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "1rem",
    color: "$gray200",
  },

  ".review-info": {
    marginBottom: "16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }
});

const ReviewContainer = styled("div", {
  overflowY: "scroll",
  maxHeight: "340px",
  color: "$gray100"
});


export default function BookModal({ book, isOpened, onClose }: BookModalProps) {
  const navigate = useRouter();
  const { fetchReviews, reviews } = useBookReview();
  const { data: session } = useSession();
  const [isLoadingReviews, setIsLoadingReviews] = useState(false)
  const reviewCount = reviews?.data?.length || 0;
  const averageRating = reviewCount > 0 ? reviews?.data?.reduce((sum, r) => sum + r.rating, 0) / reviewCount : 0;
  const roundedRating = Math.round(averageRating);



  {console.log("OLHA", reviews)}

  useEffect(() => {
    if (!isOpened || !book || !session?.user?.email) return;


    fetchReviews(book.name, session.user.email)
  }, [isOpened, book, session]);

  useEffect(() => {
    handleCommentsDisplay(book)
  }, [reviews])

  useEffect(() => {
    const loadReviews = async () => {
      setIsLoadingReviews(true)
      await fetchReviews(book.name, session.user.email)
      setIsLoadingReviews(false)
    }

    if (isOpened && book && session?.user?.email) {
      loadReviews()
    }
  }, [isOpened, book, session]);

  function handleCommentsDisplay(book: any) {
    return (
      <Content onClick={(e) => e.stopPropagation()}>
        {book && (
          <>
            <CloseButton>
              <button onClick={onClose}>
                <IoClose
                  size={24}
                  color="#fff"
                />
              </button>
            </CloseButton>

            <BookContainer>
              <Image
                src={book.imageUrl}
                alt={book.name || "Book cover"}
                width={350}
                height={300}
              />
              <div>
                <h2>{book.name}</h2>
                <p>{truncate(book.description, 150)}</p>
                <BuyButton>
                  <button onClick={() => navigate.push(`/book/${book.id}`)}>Details</button>
                </BuyButton>
              </div>
            </BookContainer>
            <BookInfo>
              <hr />
              <ReviewCard book={book} />
              <hr />
              <div className="book-info">
                <div>
                  <p>Genre</p>
                  <p>{book.genre}</p>
                </div>
                <div>
                  <p>Pages</p>
                  <p>{book.pages || 399}</p>
                </div>
                <div className="review-info">
                  <div className="flex align-center">
                    {Array.from({ length: 5 }, (_, index) => (
                      <AiFillStar key={index} color={index < roundedRating ? "#facc15" : "#374151"} />
                    ))}
                  </div>
                  <p>{reviewCount} review(s)</p>
                </div>
              </div>
            </BookInfo>
            <ReviewContainer>
              {isLoadingReviews ? (
                <p>Carregando avaliações...</p>
              ) : reviews?.data?.length > 0 ? (
                reviews.data.map((review, index) => (
                  <BookUserReview
                    key={review.id || index}
                    id={review.id || index.toString()}
                    message={review.message}
                    rating={review.rating}
                    email={review.user_email}
                    createdAt={review.created_at}
                  />
                ))
              ) : (
                <p>No review yet.</p>
              )}
            </ReviewContainer>
          </>
        )}
      </Content>
    )

  }
  function truncate(text: string, maxLength: number) {
    if (!text) {
      return
    }

    return text.length > maxLength ? text.slice(0, maxLength).trimEnd() + "..." : text;
  }

  if (!book) return null;

  return (
    <Overlay visible={isOpened} onClick={onClose}>
      {handleCommentsDisplay(book)}
    </Overlay>
  );
}
