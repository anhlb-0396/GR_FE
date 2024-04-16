import axios from "axios";
import { BASE_URL } from "../../constants/urlConstants";

export async function createNewNotification(notificationObject) {
  const response = await axios.post(
    `${BASE_URL}/notifications`,
    notificationObject
  );

  if (response.data.status >= 400) {
    throw new Error(response.data.message);
  }

  return response.data.data.notification;
}

export async function getAllNotifications(receiverId) {
  const response = await axios.get(`${BASE_URL}/notifications/${receiverId}`);

  if (response.data.status >= 400) {
    throw new Error(response.data.message);
  }

  return response.data.data.notifications;
}

export async function deleteAllNotifications(receiverId) {
  const response = await axios.delete(
    `${BASE_URL}/notifications/${receiverId}`
  );

  if (response.data.status >= 400) {
    throw new Error(response.data.message);
  }

  return response.data.data.notifications;
}
