import axios from "axios";
import { BASE_URL } from "../../constants/urlConstants";

export async function fetchApplies(userId) {
  const response = await axios.get(`${BASE_URL}/users/${userId}/applies`);

  if (response.data.status >= 400) {
    throw new Error(response.data.message);
  }

  return response.data.data.applies;
}

export async function createApply(applyObject) {
  const response = await axios.post(
    `${BASE_URL}/users/${applyObject.user_id}/applies`,
    applyObject
  );

  if (response.data.status >= 400) {
    throw new Error(response.data.message);
  }

  return response.data.data.applies;
}

export async function deleteApply(applyObject) {
  const response = await axios.delete(
    `${BASE_URL}/applies/${applyObject.apply_id}`
  );

  if (response.data.status >= 400) {
    throw new Error(response.data.message);
  }

  return response.data;
}
