import { IconButton } from "@mui/material";
import { Bookmark as BookmarkIcon } from "@mui/icons-material";
import { useCreateBookmark } from "./userCreateBookmark";
import { useDeleteBookmark } from "./userDeleteBookmark";
import { useBookmarks } from "./useBookmarks";

function Bookmark({ job, currentUser, token, isAuthenticated }) {
  const { createNewBookmark, isCreating } = useCreateBookmark(currentUser.id);
  const { deleteNewBookmark, isDeleting } = useDeleteBookmark(currentUser.id);
  const { bookmarks, isLoading, isError } = useBookmarks(currentUser.id);

  if (isLoading) return null;
  if (isError) return null;

  const isBookmarked = bookmarks.some(
    (bookmark) =>
      bookmark.job_id === job.id && bookmark.user_id === currentUser.id
  );

  const handleBookmark = (job) => {
    if (!isBookmarked) {
      const bookmarkData = {
        user_id: currentUser.id,
        job_id: job.id,
        token,
      };
      createNewBookmark(bookmarkData);
    } else {
      const bookmarkId = bookmarks.find(
        (bookmark) =>
          bookmark.job_id === job.id && bookmark.user_id === currentUser.id
      ).id;

      const bookmarkData = {
        user_id: currentUser.id,
        bookmark_id: bookmarkId,
        token,
      };

      deleteNewBookmark(bookmarkData);
    }
  };

  return (
    <IconButton
      aria-label="bookmarks"
      color={isBookmarked ? "error" : "default"}
      onClick={() => handleBookmark(job)}
      disabled={isCreating || isDeleting}
    >
      <BookmarkIcon />
    </IconButton>
  );
}

export default Bookmark;
