import axios from "axios";
import { BASE_URL } from "../../constants/urlConstants";

export async function createNewChatMessage(chatObject) {
  const response = await axios.post(`${BASE_URL}/chats`, chatObject);

  if (response.data.status >= 400) {
    throw new Error(response.data.message);
  }

  return response.data.data.chat;
}

export async function getAllChatMessages(receiverId) {
  const response = await axios.get(`${BASE_URL}/chats/${receiverId}`);

  if (response.data.status >= 400) {
    throw new Error(response.data.message);
  }

  return response.data.data.chats;
}

export async function getUsersByIds(userIds) {
  const response = await axios.post(`${BASE_URL}/users/ids`, { userIds });

  if (response.data.status >= 400) {
    throw new Error(response.data.message);
  }

  return response.data.data.users;
}
