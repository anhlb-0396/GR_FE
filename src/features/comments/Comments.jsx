import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  IconButton,
  Typography,
  Grid,
  Rating,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { red } from "@mui/material/colors";
import { parseISO, format } from "date-fns";

function formatDateTime(dateTimeStr) {
  const dateObj = parseISO(dateTimeStr);
  const formattedDateTime = format(dateObj, "HH':'mm 'ngày' dd/MM/yyyy");
  return formattedDateTime;
}

function Comments({ comment }) {
  return (
    <Grid item container xs={12} md={5.5}>
      <Card sx={{ width: "100%", borderRadius: "10px" }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="user-avatar">
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={comment.User.name}
          subheader={formatDateTime(comment.createdAt)}
        />
        <CardContent>
          <Grid container justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">
              Lương thưởng
            </Typography>
            <Rating
              name="read-only"
              value={comment.salary_rating}
              readOnly
              precision={0.5}
              size="small"
            />
          </Grid>

          <Grid container justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">
              Môi trường
            </Typography>
            <Rating
              name="read-only"
              value={comment.working_space_rating}
              readOnly
              precision={0.5}
              size="small"
            />
          </Grid>

          <Grid container justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">
              Đồng nghiệp
            </Typography>
            <Rating
              name="read-only"
              value={comment.colleague_relationship_rating}
              readOnly
              precision={0.5}
              size="small"
            />
          </Grid>

          <Grid container justifyContent="space-between" mt={2}>
            <Typography variant="body2" color="text.secondary">
              {comment.comment}
            </Typography>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default Comments;
