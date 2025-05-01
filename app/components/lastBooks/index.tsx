// components/lastBooks.tsx

import Book from "../book";

interface LastBooksProps {
  books: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
  }[];
}

export default function LastBooks({ books }: LastBooksProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {books.map((book) => (
        <Book
          key={book.id}
          name={book.name}
          imageUrl={book.imageUrl}
          price={book.price}
        />
      ))}
    </div>
  );
}
