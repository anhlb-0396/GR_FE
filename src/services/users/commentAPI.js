import axios from "axios";
import { BASE_URL } from "../../constants/urlConstants";

export async function fetchCommentsOfCompany(companyId) {
  const response = await axios.get(
    `${BASE_URL}/companies/${companyId}/comments`
  );

  if (response.data.status >= 400) {
    throw new Error(response.data.message);
  }

  return response.data.data.comments;
}

export async function createCommentOfCompany(commentObject) {
  console.log(commentObject);
  const response = await axios.post(
    `${BASE_URL}/companies/${commentObject.company_id}/comments`,
    commentObject
  );

  if (response.data.status >= 400) {
    throw new Error(response.data.message);
  }

  return response.data.data.comment;
}
