import axios from "axios";

const BASE_URL = "http://localhost:3001/api";

export async function fetchResumeByUserId(userId) {
  const response = await axios.get(`${BASE_URL}/resumes/${userId}`);

  if (response.data.status >= 400) {
    throw new Error(response.data.message);
  }

  return response.data.data.job;
}

export async function createNewResume(data) {
  const response = await axios.post(`${BASE_URL}/resumes`, data);

  if (response.data.status >= 400) {
    throw new Error(response.data.message);
  }

  return response.data.data.job;
}
