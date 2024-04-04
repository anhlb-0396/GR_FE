import axios from "axios";
import { BASE_URL } from "../constants/urlConstants";

export async function fetchResumeByUserId(userId) {
  const response = await axios.get(`${BASE_URL}/resumes/${userId}`);

  if (response.data.status >= 400) {
    throw new Error(response.data.message);
  }

  return response.data.data.resume;
}

export async function createNewResume(data) {
  const response = await axios.post(`${BASE_URL}/resumes`, data);

  if (response.data.status >= 400) {
    throw new Error(response.data.message);
  }

  return response.data.data.job;
}
