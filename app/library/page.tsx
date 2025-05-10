'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import api from '../lib/axios';
import Image from 'next/image';
import { styled } from '../../stitches.config';
import BookModal from '../components/bookModal';

const MyBookStyle = styled("div", {
  color: "$gray100",

  ".books-container": {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: 16,
    margin: 10,

    ".book-card": {
      cursor: "pointer",

      img: {
        width: "100%",
        height: "310px",
        borderRadius: 8,
      }
    }
  }
})

export default function MyBooks() {
  const [books, setBooks] = useState<any[]>([]);
  const [selectedBook, setSelectedBook] = useState<any | null>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session?.user?.email) {
      fetchBooks(session.user.email);
    }
  }, [session]);

  async function fetchBooks(email: string) {
    try {
      const response = await api.get('/api/v1/user_books', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${email}`,
        },
      });
      console.log(response.data)
      setBooks(response.data.books);
    } catch (err: any) {
      console.error("Erro ao carregar livros:", err);
    }
  };

  if (status === 'loading') {
    return <p>Carregando...</p>;
  }

  return (
    <MyBookStyle>
      <h1>Meus Livros</h1>

      <BookModal
        book={selectedBook}
        isOpened={!!selectedBook}
        onClose={() => setSelectedBook(null)}
      />

      {books.length === 0 ? (
        <p>Você ainda não comprou nenhum livro.</p>
      ) : (
        <div className='books-container'>
          {books.map((book) => (
            <div key={book.id} className="book-card" onClick={() => {setSelectedBook(book); console.log(book)}}>
              <Image
                src={book.imageUrl}
                alt={book.title}
                width={200}
                height={300}
                unoptimized
              />
              <h2>{book.title}</h2>
            </div>
          ))}
        </div>
      )}
    </MyBookStyle>
  );
}
