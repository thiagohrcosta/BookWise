'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import api from '../lib/axios';
import Image from 'next/image';
import { styled } from '../../stitches.config';

const MyBookStyle = styled("div", {
  color: "$gray100",

  ".books-container": {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: 16,
    margin: 10,
    cursor: "pointer",

    img: {
      width: "100%",
      height: "310px",
      borderRadius: 8,
    }
  }
})

export default function MyBooks()  {
  const [books, setBooks] = useState<any[]>([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session?.user?.email) {
      fetchBooks(session.user.email);
    }
  }, [session]);

  const fetchBooks = async (email: string) => {
    try {
      const response = await api.get('/api/v1/user_books', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${email}`,
        },
      });

      console.log("RESPOSTA", response.data)

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
      {books.length === 0 ? (
        <p>Você ainda não comprou nenhum livro.</p>
      ) : (
        <div className='books-container'>
          {books.map((book) => (
            <div key={book.id} className="book-card">
              <Image
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${book.cover_url}`}
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
};
