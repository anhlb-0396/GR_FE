import axios from "axios";
import { BASE_URL } from "../../constants/urlConstants";

export async function fetchAppliesOfCompany(companyId) {
  const response = await axios.get(
    `${BASE_URL}/companies/${companyId}/applies`
  );

  if (response.data.status >= 400) {
    throw new Error(response.data.message);
  }

  return response.data.data.applies;
}

export async function updateApply(applyObject) {
  const response = await axios.patch(
    `${BASE_URL}/applies/${applyObject.applyId}`,
    applyObject
  );

  if (response.data.status >= 400) {
    throw new Error(response.data.message);
  }

  return response.data.data.applies;
}
