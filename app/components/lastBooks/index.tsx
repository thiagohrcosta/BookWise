'use client';

import { useEffect, useState } from 'react';
import { styled } from '../../../stitches.config';
import { useStripeBooks } from '../../hooks/useStripeBooks';
import BookModal from '../bookModal';
import Book from '../book';
import Link from 'next/link';

interface Book {
  id: string;
  name: string;
  author: string;
  category: string;
  pages: string;
  description: string;
  imageUrl: string;
  price: string;
}

interface LastBooksProps {
  books: Book[];
}

const HeaderStyle = styled("div", {
  padding: "0 10px",
  display: "flex",
  justifyContent: "space-between",

  h1: {
    fontWeight: "bold",
    borderBottom: `2px solid $purple100`,
    marginBottom: 32
  },

  a: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "$purple100",
    color: "$gray100",
    height: 36,
    width: "180px",
    textAlign: "center",
    borderRadius: 8,

    '&:hover': {
      background: "$purple200",
    }
  }
})

const BooksContainerStyle = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  gap: 16,
  margin: 10,
  cursor: 'pointer',
});

export default function Books() {
  const { data: books, isLoading, error } = useStripeBooks();
  const [selectedBook, setSelectedBook] = useState<null | any>(null);
  const [randomBooks, setRandomBooks] = useState<any[]>([]);

  useEffect(() => {
    if (books && books.length > 0 && randomBooks.length === 0) {
      const shuffled = [...books].sort(() => Math.random() - 0.5).slice(0, 3);
      setRandomBooks(shuffled);
    }
  }, [books]);

  if (isLoading) return <p>Loading books...</p>;
  if (error) return <p>Error while trying to fetch books. Try again later.</p>;

  return (
    <div>
      <HeaderStyle>
        <h1>Last books</h1>
        <Link href="/books">All books</Link>
      </HeaderStyle>
      <BookModal
        book={selectedBook}
        isOpened={!!selectedBook}
        onClose={() => setSelectedBook(null)}
      />
      <BooksContainerStyle>
        {randomBooks.map((book) => (
          <div key={book.id} onClick={() => setSelectedBook(book)}>
            <Book
              id={book.id}
              name={book.name}
              author={book.author}
              genre={book.category}
              pages={book.pages}
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
