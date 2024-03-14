import axios from "axios";

const BASE_URL = "http://localhost:3001/api";

export async function fetchJobs() {
  const response = await axios.get(`${BASE_URL}/jobs`);

  if (response.data.status >= 400) {
    throw new Error(response.message);
  }

  return response.data.data.jobs;
}
