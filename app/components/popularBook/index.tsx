'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { styled } from '../../../stitches.config';
import { GetPopularBooks } from '../../api/get-popular-books/route';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const HeaderPopularBookContainer = styled("div", {
  h2: {
    fontWeight: "bold",
    borderBottom: `2px solid $purple100`
  }
})

const PopularBookContainer = styled('div', {
  display: 'flex',
  backgroundColor: '$gray700',
  borderRadius: '8px',
  padding: '16px',
  cursor: 'pointer',
  marginBottom: '16px',
  '&:hover': {
    backgroundColor: '$gray600',
  },
});

type Book = {
  id: number;
  title: string;
  author: { name: string };
  cover_url: string | null;
};

export default function PopularBooks() {
  const [books, setBooks] = useState([])

  async function fetchPopularBooks() {
    const response = await GetPopularBooks()
    const data = await response.json()

    setBooks(data.books)
  }

  useEffect(() => {
    fetchPopularBooks()
  }, [])

  return (
    <div>
      <HeaderPopularBookContainer>
        <h2 className="mb-8">Popular Books</h2>
      </HeaderPopularBookContainer>
      {books && books?.data?.map((book) => {
        return (
          <PopularBookContainer key={book.id}>
            <div>
              <Image
                src={book.cover_url || '/fallback-book.jpg'}
                alt={book.title}
                width={64}
                height={94}
                className="rounded-lg"
              />
            </div>
            <div className="flex flex-col justify-between ml-4">
              <div>
                <p className="text-gray-100 font-bold">{book.title}</p>
                <p className="text-gray-400">{book.author_name}</p>
              </div>
              <div className="flex">
                {Array.from({ length: 5 }, (_, index) => (
                  index < book.ratings
                    ? <AiFillStar key={index} color="#8381D9" size={20} />
                    : <AiOutlineStar key={index} color="#8381D9" size={20} />
                ))}
              </div>
            </div>
          </PopularBookContainer>
        )
      })}
    </div>
  );
}
