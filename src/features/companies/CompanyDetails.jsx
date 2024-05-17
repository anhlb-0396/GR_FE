import React from "react";
import {
  Grid,
  Typography,
  Box,
  Container,
  Stack,
  TextField,
  Button,
  Chip,
} from "@mui/material";

const CompanyDetails = () => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h3" component="h1">
              FPT
            </Typography>
            <Typography variant="h5" component="h2">
              IS
            </Typography>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Typography variant="body1">+ Theo dõi công ty</Typography>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1">
                FPT IS is a part of FPT Corporation, a number 1 integrated
                solutions and IT Services in Vietnam for almost 30 years, with
                nearly VND 7,000B in revenue, FPT IS is proud to be a
                trustworthy partner to co-create the next value through
                technology along with leading enterprises and organizations both
                in Vietnam and globally.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Giới thiệu công ty</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Thông tin liên hệ</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1">
                With technical competence recognized by global customers and
                partners, FPT IS has been designing and Implementing many
                comprehensive IT product, IT projects, services and solutions in
                many key areas, delivering values to tens of millions of people.
                With more than 3,400 employees and a wide network of offices and
                branches covering 63 provinces/cities, FPT IS has recently been
                honored by Vietnam Report as one of the Top 10 Most Reputable
                Technology Companies in 2023, and also given the "Best Companies
                To Work For In Asia 2023" award by HR Asla
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">
                Địa chỉ công ty: Tầng 22 toà nhà Keangnam Landmark 72, E6 Phạm
                Hùng, Nam Từ Liêm, Hà Nội
              </Typography>
              <Typography variant="body2" noWrap>
                Xem bản đồ [Icon]
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">5000+ nhân viên </Typography>
              <Typography variant="body2">355 người theo dõi</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Tuyển dụng</Typography>
              <Stack direction="row" spacing={1}>
                <TextField
                  label="Tìm công việc, vị trí ứng tuyển..."
                  variant="outlined"
                />
                <Button variant="contained" type="submit">
                  Tìm kiếm
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">KHU ĐÔ THỊ MỚI YÊN HỒNG</Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                <Chip label="Tòa nhà Landmark 72" variant="outlined" />
                <Chip label="Thư Ký Phó Tổng Giám Đốc" variant="outlined" />
                <Chip label="Thoả thuận" variant="outlined" />
                {/* Add more chips as needed */}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CompanyDetails;
