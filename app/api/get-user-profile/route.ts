import axios from "axios";

export async function GetUserProfile(email: string) {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/profiles`, {
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