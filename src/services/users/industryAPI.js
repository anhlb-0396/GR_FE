import axios from "axios";
import { BASE_URL } from "../../constants/urlConstants";

export async function fetchIndustries() {
  const response = await axios.get(`${BASE_URL}/industries`);

  if (response.data.status >= 400) {
    throw new Error(response.data.message);
  }

  return response.data.data.industries;
}
