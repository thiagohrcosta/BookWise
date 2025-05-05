'use client';

import { useState } from 'react';
import { styled } from "../../stitches.config";
import Book from "../components/book";
import { useStripeBooks } from "../hooks/useStripeBooks";
import BookModal from "../components/bookModal";

const BooksContainerStyle = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gap: 16,
  margin: 10,
  cursor: "pointer",
});

export default function Books() {
  const { data: books, isLoading, error } = useStripeBooks();
  const [selectedBook, setSelectedBook] = useState<null | any>(null);

  if (isLoading) return <p>Loading books...</p>;
  if (error) return <p>Error while trying to fetch books. Try again later.</p>;

  return (
    <div>
      <BookModal
        book={selectedBook}
        isOpened={!!selectedBook}
        onClose={() => setSelectedBook(null)}
      />
      <BooksContainerStyle>
        {books?.map((book) => (
          <div key={book.id} onClick={() => setSelectedBook(book)}>
            <Book
              id={book.id}
              name={book.name}
              author={book.author}
              category={book.category}
              description={book.description}
              imageUrl={book.imageUrl}
              price={book.price}
            />
          </div>
        ))}
      </BooksContainerStyle>
    </div>
  );
}
