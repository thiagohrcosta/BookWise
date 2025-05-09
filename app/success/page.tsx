'use client'

import { useEffect, useState } from 'react'
import { FaCheckCircle } from "react-icons/fa";
import { styled } from '../../stitches.config';
import Link from 'next/link';

const SuccessContainerStyle = styled("div", {
  color: "gray100",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  padding: "25vh 0",

  svg: {
    color: "$green100",
    marginBottom: 20,
  },

  a: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "$green100",
    width: "280px",
    padding: "5px 10",
    borderRadius: 8,
    height: 45,
    margin: "10px 0",

    "&:hover": {
      background: "$green200"
    }
  }
})

export default function SuccessPage() {
  const [bookInfo, setBookInfo] = useState(null)

  useEffect(() => {
    const fetchSession = async () => {
      const params = new URLSearchParams(window.location.search);
      const sessionId = params.get('session_id');
      if (!sessionId) return;

      const res = await fetch(`/api/stripe-session?session_id=${sessionId}`);
      const data = await res.json();
      setBookInfo(data)

      console.log("DADOS", data)

      await fetch('http://localhost:3000/api/v1/user_books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          title: data.book.name,
          sinopsis: data.book.sinopsis,
          genre: data.book.genre,
          pages: data.book.pages,
          price: data.book.price,
          cover_url: data.book.cover_url,
          author_name: data.book.author_name
        }),
      })
    }

    fetchSession()
  }, [])

  if (!bookInfo) return <p>Carregando...</p>

  return (
    <SuccessContainerStyle>
      <FaCheckCircle
        size={42}
      />
      <h1>YOUR PURSHCASE WAS CONFIRMED</h1>
      <p>BOOK: {bookInfo?.book?.name}</p>

      <Link href="/library">
        Check your library
      </Link>
    </SuccessContainerStyle>
  )
}
