import axios from "axios";
import { NextResponse } from "next/server";

export async function GetUserBookReviews() {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user_book_ratings/user_book_reviews`);
    return NextResponse.json({ books: response.data });
  } catch (error) {
    return NextResponse.json({ error: "Error while fetching reviews" }, { status: 500 });
  }
}
