import axios from "axios";

const BASE_URL = "http://localhost:3001/api";

export async function fetchCompanies() {
  const response = await axios.get(`${BASE_URL}/companies`);

  if (response.data.status >= 400) {
    throw new Error(response.data.message);
  }

  return response.data.data.companies;
}
