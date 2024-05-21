// CompanyDetailsPage.jsx
import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Avatar,
  Paper,
  Button,
  Link,
} from "@mui/material";
import { LocationOn, Business, Web } from "@mui/icons-material";
import StarIcon from "@mui/icons-material/Star";
import TitleText from "../../ui/sharedComponents/TitleText";

const companyData = {
  name: "Công ty Cổ phần Hạ tầng Viễn thông CMC Telecom",
  logo: "https://static.topcv.vn/avatars/RtJk2sg5FQHzmX3ecRGu_60.jpg",
  location: "Hà Nội, Việt Nam",
  industry: "Viễn thông",
  employees: "200-500",
  website: "https://cmctelecom.vn",
  description: `CMC Telecom là một trong những công ty hàng đầu về dịch vụ viễn thông tại Việt Nam, cung cấp giải pháp dịch vụ đa dạng từ dịch vụ Internet, dịch vụ truyền dữ liệu, dịch vụ trung tâm dữ liệu, điện toán đám mây, dịch vụ tích hợp hệ thống và các dịch vụ giá trị gia tăng khác.`,
  coverImage: "https://static.topcv.vn/company_covers/Zn7MZvydb3VlJrpboggi.jpg",
};

const CompanyDetailsPage = () => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <Container maxWidth="lg">
      <Box mt={4} mb={4}>
        <Card sx={{ borderRadius: 2, overflow: "hidden" }}>
          <CardMedia
            component="img"
            height="300"
            image={companyData.coverImage}
            alt="Company cover image"
          />
          <CardContent sx={{ position: "relative" }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={3} sx={{ textAlign: "center" }}>
                <Avatar
                  alt={companyData.name}
                  src={companyData.logo}
                  sx={{
                    width: 120,
                    height: 120,
                    margin: "0 auto",
                    border: "4px solid white",
                    boxShadow: 2,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={9}>
                <TitleText variant="h4" textAlign="left">
                  {companyData.name}
                </TitleText>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  gutterBottom
                >
                  {companyData.industry}
                </Typography>
                <Box display="flex" alignItems="center" mt={1}>
                  <LocationOn color="action" />
                  <Typography variant="body1" ml={1}>
                    {companyData.location}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" mt={1}>
                  <Business color="action" />
                  <Typography variant="body1" ml={1}>
                    {companyData.employees} nhân viên
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" mt={1}>
                  <Web color="action" />
                  <Typography variant="body1" ml={1}>
                    <Link
                      href={companyData.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      color="inherit"
                    >
                      {companyData.website}
                    </Link>
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  color={isFollowing ? "secondary" : "primary"}
                  onClick={handleFollowClick}
                  sx={{ mt: 2 }}
                >
                  {isFollowing ? "Following" : "Follow"}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Box mt={4}>
          <TitleText variant="h5" textAlign="left">
            Giới thiệu về công ty
          </TitleText>
          <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, mt: 1 }}>
            <Typography variant="body1">{companyData.description}</Typography>
          </Paper>
        </Box>

        <Box mt={4}>
          <TitleText variant="h5" textAlign="left">
            Vị trí tuyển dụng
          </TitleText>
          <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, mt: 1 }}>
            {/* Job listings component can be inserted here */}
            <Typography variant="body1">
              Hiện tại chưa có vị trí tuyển dụng nào.
            </Typography>
          </Paper>
        </Box>

        <Box mt={4}>
          <TitleText variant="h5" textAlign="left">
            Đánh giá công ty
          </TitleText>

          <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, mt: 1 }}>
            {/* Company reviews component can be inserted here */}
            <Box display="flex" alignItems="center" mt={1}>
              <StarIcon color="primary" />
              <StarIcon color="primary" />
              <StarIcon color="primary" />
              <StarIcon color="primary" />
              <StarIcon color="action" />
              <Typography variant="body1" ml={1}>
                4.0 / 5.0
              </Typography>
            </Box>
            <Typography variant="body1" mt={2}>
              Chưa có đánh giá nào.
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default CompanyDetailsPage;
