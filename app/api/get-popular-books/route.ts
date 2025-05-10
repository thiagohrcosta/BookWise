import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GetPopularBooks() {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/books/popular_books`);
    return NextResponse.json({ books: response.data });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar livros.' }, { status: 500 });
  }
}
