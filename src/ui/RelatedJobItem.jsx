import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { IconButton, CardActionArea, CardActions } from "@mui/material";

export default function RelatedJobItem() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          width="60%"
          objectFit="cover"
          component="img"
          height="auto"
          image="https://cdn-new.topcv.vn/unsafe/140x/filters:format(webp)/https://static.topcv.vn/company_logos/cong-ty-co-phan-chung-khoan-vps-5ff1a3dc0a075.jpg"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Công ty cổ phần chứng khoán VPS
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Kinh doanh/ Bán hàng...
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <IconButton size="small" color="primary">
          Xem chi tiết
        </IconButton>
      </CardActions>
    </Card>
  );
}
