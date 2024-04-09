import axios from "axios";
import { BASE_URL } from "../../constants/urlConstants";

export async function fetchJobsByCompanyId(companyId) {
  const response = await axios.get(`${BASE_URL}/companies/${companyId}/jobs`);

  if (response.data.status >= 400) {
    throw new Error(response.data.message);
  }

  return response.data.data.jobs;
}

export async function createJob(companyId, job) {
  const response = await axios.post(
    `${BASE_URL}/companies/${companyId}/jobs`,
    job
  );

  if (response.data.status >= 400) {
    throw new Error(response.data.message);
  }

  return response.data.data.job;
}
