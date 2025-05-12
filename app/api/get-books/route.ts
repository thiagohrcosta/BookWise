import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    const response = await axios.get('/api/v1/user_books');
    return NextResponse.json({ books: response.data.books });
  } catch (error) {
    return NextResponse.json({ error: 'Error while fetching books.' }, { status: 500 });
  }
}
