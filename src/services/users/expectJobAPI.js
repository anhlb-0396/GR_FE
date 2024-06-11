import axios from "axios";
import { BASE_URL } from "../../constants/urlConstants";

export async function fetchAllExpectJobsDataByUserId(userId) {
  const response = await axios.get(`${BASE_URL}/users/${userId}/expectations`);

  if (response.data.status >= 400) {
    throw new Error(response.data.message);
  }

  return response.data.data;
}

export async function createExpectJob(expectJobObject) {
  const response = await axios.post(
    `${BASE_URL}/expectations`,
    expectJobObject
  );

  if (response.data.status >= 400) {
    throw new Error(response.data.message);
  }

  return response.data.data.expectJob;
}

export async function updateExpectJob(expectJobObject) {
  const response = await axios.patch(
    `${BASE_URL}/users/${expectJobObject.user_id}/expectations`,
    expectJobObject
  );

  if (response.data.status >= 400) {
    throw new Error(response.data.message);
  }

  return response.data.data.expectJob;
}
