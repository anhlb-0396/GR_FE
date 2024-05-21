import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MailIcon from "@mui/icons-material/Mail";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PublicIcon from "@mui/icons-material/Public";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import React from "react";

function CompanySummaryCard({ company, xs, md, ratingDisplay }) {
  return (
    <Grid container item xs={xs} md={md}>
      <Card
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          borderRadius: "10px",
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={company?.logo}
            alt={company?.name}
            style={{
              objectFit: "contain",
              width: "100%",
              height: "250px",
            }}
          />
        </Grid>

        <CardContent>
          <Typography gutterBottom variant="h5" color="text.secondary">
            {company?.name}
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
            {company?.industry}
          </Typography> */}
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            <Box display="flex" alignItems="center">
              <LocationOnIcon sx={{ mr: 1 }} />
              {company?.location}
            </Box>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            <Box display="flex" alignItems="center">
              <PublicIcon sx={{ mr: 1 }} />
              {company?.country}
            </Box>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            <Box display="flex" alignItems="center">
              <MailIcon sx={{ mr: 1 }} />
              {company?.contact_mail}
            </Box>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            <Box display="flex" alignItems="center">
              <PeopleAltIcon sx={{ mr: 1 }} />
              {company?.employees} nhân viên
            </Box>
          </Typography>

          {ratingDisplay && (
            <React.Fragment>
              {" "}
              <Box
                display="flex"
                alignItems="center"
                sx={{ mt: 1 }}
                justifyContent="space-between"
              >
                <Typography variant="body2" color="text.secondary">
                  Đánh giá trung bình:
                </Typography>
                <Rating
                  name="averageRating"
                  value={company?.average_rating}
                  precision={0.5}
                  readOnly
                  sx={{ ml: 1 }}
                />
              </Box>
              <Box
                display="flex"
                alignItems="center"
                sx={{ mt: 1 }}
                justifyContent="space-between"
              >
                <Typography variant="body2" color="text.secondary">
                  Lương thưởng đãi ngộ:
                </Typography>
                <Rating
                  name="averageRating"
                  value={company?.average_salary_rating}
                  precision={0.5}
                  readOnly
                  sx={{ ml: 1 }}
                />
              </Box>
              <Box
                display="flex"
                alignItems="center"
                sx={{ mt: 1 }}
                justifyContent="space-between"
              >
                <Typography variant="body2" color="text.secondary">
                  Môi trường làm việc:
                </Typography>
                <Rating
                  name="averageRating"
                  value={company?.average_working_space_rating}
                  precision={0.5}
                  readOnly
                  sx={{ ml: 1 }}
                />
              </Box>
              <Box
                display="flex"
                alignItems="center"
                sx={{ mt: 1 }}
                justifyContent="space-between"
              >
                <Typography variant="body2" color="text.secondary">
                  Nhân sự:
                </Typography>
                <Rating
                  name="averageRating"
                  value={company?.average_colleague_rating}
                  precision={0.5}
                  readOnly
                  sx={{ ml: 1 }}
                />
              </Box>
            </React.Fragment>
          )}
        </CardContent>

        <CardActions>
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
          >
            <Button
              endIcon={<SubdirectoryArrowRightIcon />}
              component={Link}
              to={`/user/companies/${company.id}`}
              variant="contained"
            >
              Chi tiết
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default CompanySummaryCard;
