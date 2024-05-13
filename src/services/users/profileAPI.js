import axios from "axios";
import { BASE_URL } from "../../constants/urlConstants";

export async function updateProfile(data) {
  const formData = new FormData();
  formData.append("avatar", data.avatar);
  formData.append("name", data.name);
  formData.append("gmail", data.gmail);
  formData.append("role", data.role);
  formData.append("date_of_birth", data.date_of_birth);

  const response = await axios.patch(
    `${BASE_URL}/users/${data.userId}`,
    formData
  );

  if (response.data.status >= 400) {
    throw new Error(response.data.message);
  }

  return response.data.data.user;
}
