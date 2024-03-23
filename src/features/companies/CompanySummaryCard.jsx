import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";

function CompanySummaryCard({ company }) {
  return (
    <Card sx={{ width: "100%" }}>
      <CardMedia
        sx={{ width: "100%", height: "100px", objectFit: "cover" }}
        title="green iguana"
        image="https://cdn-new.topcv.vn/unsafe/140x/filters:format(webp)/https://static.topcv.vn/company_logos/cong-ty-co-phan-chung-khoan-vps-5ff1a3dc0a075.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          Lizard
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button endIcon={<SubdirectoryArrowRightIcon />}>
          Đi đến trang web công ty
        </Button>
      </CardActions>
    </Card>
  );
}

export default CompanySummaryCard;
