import axios from "axios";
import { BASE_URL } from "../../constants/urlConstants";

export async function fetchStatisticsByIndustries() {
  const response = await axios.get(`${BASE_URL}/statistics/`);

  if (response.data.status >= 400) {
    throw new Error(response.data.message);
  }

  return response.data.data.statistics;
}

export async function fetchStatisticsByUserId(userId) {
  const response = await axios.get(`${BASE_URL}/users/${userId}/statistics`);

  if (response.data.status >= 400) {
    throw new Error(response.data.message);
  }

  return response.data.data.statistics;
}
