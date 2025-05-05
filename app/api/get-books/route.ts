// app/api/get-books/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    const response = await axios.get('/api/v1/user_books');
    return NextResponse.json({ books: response.data.books });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar livros.' }, { status: 500 });
  }
}
