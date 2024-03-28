import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";

import { parseISO, format } from "date-fns";

function formatDateTime(dateTimeStr) {
  const dateObj = parseISO(dateTimeStr);
  const formattedDateTime = format(dateObj, "HH':'mm 'ngày' dd/MM/yyyy");
  return formattedDateTime;
}

function Comments({ comment }) {
  return (
    <Grid item container xs={12}>
      <Card sx={{ width: "100%" }}>
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
          <Typography variant="body2" color="text.secondary">
            {comment.comment}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default Comments;
