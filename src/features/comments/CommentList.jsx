import { Grid, Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Comments from "./Comments";
import { useComments } from "./useComments";

function CommentList({ companyId }) {
  const { isLoading, isError, error, comments } = useComments(companyId);

  console.log(comments);

  return (
    <Grid item container direction="column" rowGap={2} alignItems="center">
      {isLoading && <CircularProgress />}
      {isError && <Box>Error: {error.message}</Box>}
      {comments?.map((comment) => (
        <Comments key={comment.id} comment={comment} />
      ))}
    </Grid>
  );
}

export default CommentList;
