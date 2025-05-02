"use client";

import { useState } from "react";
import Book from "../book";
import BookModal from "../bookModal";

interface LastBooksProps {
  books: {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    price: string;
  }[];
}

export default function LastBooks({ books }: LastBooksProps) {
  const [selectedBook, setSelectedBook] = useState<null | LastBooksProps["books"][0]>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <BookModal book={selectedBook} isOpened={!!selectedBook} onClose={() => setSelectedBook(null)} />
      {books.map((book) => (
        <div key={book.id} onClick={() => setSelectedBook(book)}>
          <Book
            name={book.name}
            description={book.description}
            imageUrl={book.imageUrl}
            price={book.price}
          />
        </div>
      ))}
    </div>
  );
}
