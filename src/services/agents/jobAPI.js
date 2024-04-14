import axios from "axios";
import { BASE_URL } from "../../constants/urlConstants";

export async function fetchJobsByCompanyId(companyId) {
  const response = await axios.get(`${BASE_URL}/companies/${companyId}/jobs`);

  if (response.data.status >= 400) {
    throw new Error(response.data.message);
  }

  return response.data.data.jobs;
}

export async function createJob(jobDataObject) {
  const formData = new FormData();

  // Append form fields to the FormData object
  Object.entries(jobDataObject).forEach(([key, value]) => {
    // If the field is 'images', append each image file
    if (key === "images") {
      for (let i = 0; i < value.length; i++) {
        formData.append("images", value[i]);
      }
    } else {
      formData.append(key, value);
    }
  });

  const response = await axios.post(`${BASE_URL}/jobs`, formData);

  if (response.data.status >= 400) {
    throw new Error(response.data.message);
  }

  return response.data.data.job;
}

export async function deleteJob(jobId) {
  const response = await axios.delete(`${BASE_URL}/jobs/${jobId}`);

  if (response.data.status >= 400) {
    throw new Error(response.data.message);
  }

  return response.data;
}

export async function updateJob(dataObject) {
  const formData = new FormData();

  // Append form fields to the FormData object
  Object.entries(dataObject).forEach(([key, value]) => {
    // If the field is 'images', append each image file
    if (key === "images") {
      for (let i = 0; i < value.length; i++) {
        formData.append("images", value[i]);
      }
    } else {
      formData.append(key, value);
    }
  });

  const response = await axios.put(
    `${BASE_URL}/jobs/${dataObject.job_id}`,
    formData
  );

  if (response.data.status >= 400) {
    throw new Error(response.data.message);
  }

  return response.data.data.job;
}
