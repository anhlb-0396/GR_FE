import axios from "axios";
import { BASE_URL } from "../../constants/urlConstants";

export async function fetchBookmarks(userId) {
  const response = await axios.get(`${BASE_URL}/users/${userId}/bookmarks`);

  if (response.data.status >= 400) {
    throw new Error(response.data.message);
  }

  return response.data.data.bookmarks;
}

export async function createBookmark(bookmarkObject) {
  const response = await axios.post(
    `${BASE_URL}/users/${bookmarkObject.user_id}/bookmarks`,
    bookmarkObject
  );

  if (response.data.status >= 400) {
    throw new Error(response.data.message);
  }

  return response.data.data.bookmark;
}

export async function deleteBookmark(bookmarkObject) {
  const response = await axios.delete(
    `${BASE_URL}/bookmarks/${bookmarkObject.bookmark_id}`
  );

  if (response.data.status >= 400) {
    throw new Error(response.data.message);
  }

  return response.data;
}
