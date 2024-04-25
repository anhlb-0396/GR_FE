import axios from "axios";
import { BASE_URL } from "../../constants/urlConstants";

export async function fetchResumeById(id) {
  const response = await axios.get(`${BASE_URL}/resumes/${id}`);

  if (response.data.status >= 400) {
    throw new Error(response.data.message);
  }

  return response.data.data.resume;
}

export async function fetchAllResumesOfUser(userId) {
  const response = await axios.get(`${BASE_URL}/users/${userId}/resumes`);

  if (response.data.status >= 400) {
    throw new Error(response.data.message);
  }

  return response.data.data.resumes;
}

export async function createNewResume(data) {
  const response = await axios.post(`${BASE_URL}/resumes`, data);

  if (response.data.status >= 400) {
    throw new Error(response.data.message);
  }

  return response.data.data.resume;
}

export async function createNewPdfResume(data) {
  const response = await axios.post(`${BASE_URL}/resumes/upload`, data);

  if (response.data.status >= 400) {
    throw new Error(response.data.message);
  }

  return response.data.data.resume;
}
