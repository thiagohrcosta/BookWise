import axios from "axios";

export async function GetUserBookReviews(email: string) {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user_books/user_book_reviews`, {
      params: {
        email: email,
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error while fetching reviews:", error);
    return [];
  }
}