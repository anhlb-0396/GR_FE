import React from "react";
import { Box, Typography, Grid, Link } from "@mui/material";
import { Facebook, Twitter, LinkedIn, Instagram } from "@mui/icons-material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "primary.main", // Set the background color to primary
        color: "primary.contrastText", // Set the text color to contrast with primary
        padding: "40px 0",
        mt: 5,
      }}
    >
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} md={6} textAlign="center">
          <Typography variant="h6" gutterBottom>
            Kết nối với chúng tôi
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <Link href="#" color="inherit" sx={{ mr: 1 }}>
              <Facebook />
            </Link>
            <Link href="#" color="inherit" sx={{ mr: 1 }}>
              <Twitter />
            </Link>
            <Link href="#" color="inherit" sx={{ mr: 1 }}>
              <LinkedIn />
            </Link>
            <Link href="#" color="inherit">
              <Instagram />
            </Link>
          </Box>
          <Typography variant="body2">
            Follow us on social media for updates and job opportunities.
          </Typography>
        </Grid>
        <Grid item xs={12} md={5} textAlign="center">
          <Typography variant="h6" gutterBottom>
            Về chúng tôi
          </Typography>
          <Typography variant="body2">
            Đây là trang web cho phép người có nhu cầu tìm việc và các HR bên
            doanh nghiệp có thể kết nối với nhau. Người sử dụng có thể tìm việc,
            nộp và tạo hồ sơ cho nhà tuyển dụng giúp tăng khả năng trúng tuyển.
            Nhà tuyển dụng có thể lọc hồ sơ, đăng tuyển công việc và tìm ứng
            viên thích hợp nhất với nhu cầu của mình. Đăng nhập để trải nghiệm
            với chúng tôi !
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} JobFind. All rights reserved.
        </Typography>
        <Typography variant="body2">
          <Link href="#" color="inherit">
            Privacy Policy
          </Link>{" "}
          |{" "}
          <Link href="#" color="inherit">
            Terms of Service
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;
