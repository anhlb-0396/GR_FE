import axios from "axios";
import { BASE_URL } from "../../constants/urlConstants";

export async function fetchJobs() {
  const response = await axios.get(`${BASE_URL}/jobs`);

  if (response.data.status >= 400) {
    throw new Error(response.data.message);
  }

  return response.data.data.jobs;
}

export async function fetchJobsWithQueries(queryString) {
  const response = await axios.get(`${BASE_URL}/jobs?${queryString}`);

  if (response.data.status >= 400) {
    throw new Error(response.data.message);
  }

  return response.data.data.jobs;
}

export async function fetchJobById(id) {
  const response = await axios.get(`${BASE_URL}/jobs/${id}`);

  if (response.data.status >= 400) {
    throw new Error(response.data.message);
  }

  return response.data.data.job;
}
