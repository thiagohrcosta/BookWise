'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { styled } from '../../../stitches.config';
import { GetPopularBooks } from '../../api/get-popular-books/route';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { IoIosArrowForward } from "react-icons/io";
import Link from 'next/link';

const PopularBookStyle = styled("div", {
  position: "fixed"
})

const PopularBookContainer = styled("div", {
  display: "flex",
  backgroundColor: "$gray700",
  borderRadius: "8px",
  padding: "16px",
  cursor: "pointer",
  marginBottom: "16px",

  "&:hover": {
    backgroundColor: "$gray600",
  },
});

const HeaderPopularBookContainer = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "42px",

  h2: {
    fontWeight: "bold",
    borderBottom: `2px solid $purple100`,
  },

  ".see-all": {
    a: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      cursor: "pointer",
      color: "$purple100",

      p: {
        marginRight: "10px"
      }
    }
  }
})

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
    <PopularBookStyle>
      <HeaderPopularBookContainer>
        <h2>Popular Books</h2>
        <div className="see-all">
          <Link href={"/books"}>
            <p>See all</p>
            <IoIosArrowForward />
          </Link>
        </div>
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
    </PopularBookStyle>
  );
}
