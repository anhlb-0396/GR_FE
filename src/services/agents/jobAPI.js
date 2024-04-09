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

  console.log(formData);

  const response = await axios.post(`${BASE_URL}/jobs`, formData);

  if (response.data.status >= 400) {
    throw new Error(response.data.message);
  }

  return response.data.data.job;
}
