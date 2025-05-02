"use client";

import { styled } from "@stitches/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoClose } from "react-icons/io5";
import Stars from "../stars";
import { AiFillStar } from "react-icons/ai";
import BookUserReview from "../bookUserReview";

interface Book {
  id: string;
  name: string;
  description: string;
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

const BuyButton = styled("button", {
  width: "100%",
  background: "$green100",
  color: "$white",
  border: "none",
  padding: "8px 16px",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "1rem",

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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }
});

export default function BookModal({ book, isOpened, onClose }: BookModalProps) {
  const navigate = useRouter();

  function truncate(text: string, maxLength: number) {
    return text.length > maxLength ? text.slice(0, maxLength).trimEnd() + "..." : text;
  }

  if (!book) return null;

  return (
    <Overlay visible={isOpened} onClick={onClose}>
      <Content onClick={(e) => e.stopPropagation()}>
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
            alt={book.name}
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
          <div className="book-info">
            <div>
              <p>Category</p>
              <p>Horror</p>
            </div>
            <div>
              <p>Pages</p>
              <p>160</p>
            </div>
            <div className="review-info">
              <div className="flex align-center">
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
              </div>
              <p>30 reviews</p>
            </div>
          </div>
        </BookInfo>
        <BookUserReview />
      </Content>
    </Overlay>
  );
}
