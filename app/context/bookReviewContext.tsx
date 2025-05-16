"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import api from "../lib/axios";

interface Review {
  id: string;
  email: string;
  message: string;
  rating: number;
}

interface BookReviewContextType {
  reviews: Review[];
  fetchReviews: (bookTitle: string, userEmail: string) => Promise<void>;
}

const BookReviewContext = createContext<BookReviewContextType>({
  reviews: [],
  fetchReviews: async () => {},
});

export function BookReviewProvider({ children }: { children: ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>([]);

  async function fetchReviews(bookId: string, userEmail: string) {
    console.log("ID:", bookId)
    try {
      const response = await api.get(
        `/api/v1/user_book_ratings/${bookId}&user_book_ratings[user_id]=${userEmail}`
      );
      setReviews(response.data);
    } catch (error) {
      console.error("Error while trying to fetch books:", error);
      setReviews([]);
    }
  }

  return (
    <BookReviewContext.Provider value={{ reviews, fetchReviews }}>
      {children}
    </BookReviewContext.Provider>
  );
}

export const useBookReview = () => useContext(BookReviewContext);
