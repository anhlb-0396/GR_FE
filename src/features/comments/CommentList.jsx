import { Grid, Box, CircularProgress, Alert } from "@mui/material";
import Comments from "./Comments";
import { useComments } from "./useComments";

function CommentList({ companyId }) {
  const { isLoading, isError, comments } = useComments(companyId);
  // console.log(comments);

  return (
    <Grid item container direction="column" rowGap={2} alignItems="center">
      {isLoading && <CircularProgress sx={{ mt: "20px" }} />}
      {isError && (
        <Box sx={{ mt: "20px" }}>
          <Alert severity="error">Không có bình luận nào</Alert>
        </Box>
      )}
      {comments?.map((comment) => (
        <Comments key={comment.id} comment={comment} />
      ))}
    </Grid>
  );
}

export default CommentList;
