import api from "../../lib/axios";

export async function GetBookReviews() {
  try {
    const response = await api.get("/api/v1/user_book_ratings");
    return response.data.data;
  } catch (error) {
    console.error("Error while trying to fetch reviews", error);
    return [];
  }
}

