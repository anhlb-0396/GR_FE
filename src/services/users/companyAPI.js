import axios from "axios";
import { BASE_URL } from "../../constants/urlConstants";

export async function fetchCompanies() {
  const response = await axios.get(`${BASE_URL}/companies`);

  if (response.data.status >= 400) {
    throw new Error(response.data.message);
  }

  return response.data.data.companies;
}
