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
import { Title } from "@mui/icons-material";
import TitleText from "./inputs/TitleText";

function Comments() {
  return (
    <Grid item>
      <Card sx={{ maxWidth: "md" }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title="Lê Bảo Anh"
          subheader="September 14, 2016"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Công ty thật là tuyệt vời, khi vào thực tập tôi đã nhận được rất
            nhiều sự giúp đỡ từ các đồng nghiệp, hơn thế nữa mức lương và đã ngộ
            cực kì hấp dẫn, đáng là 1 nơi để gửi gắm sự nghiệp tương lai của
            mình vào !
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default Comments;
