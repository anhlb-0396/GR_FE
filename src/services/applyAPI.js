import axios from "axios";
import { BASE_URL } from "../constants/urlConstants";

export async function fetchApplies(userId) {
  const response = await axios.get(`${BASE_URL}/users/${userId}/applies`);

  if (response.data.status >= 400) {
    throw new Error(response.data.message);
  }

  return response.data.data.applies;
}
