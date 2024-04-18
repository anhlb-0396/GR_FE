import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";
import TitleText from "../ui/sharedComponents/TitleText";

const NotFoundPage = () => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <TitleText variant="h4" align="center" gutterBottom color="error">
        404 - Không tìm thấy trang !
      </TitleText>
      <TitleText variant="h5" align="center" paragraph>
        Không tìm thấy trang này
      </TitleText>
      <TitleText variant="body1" align="center" paragraph>
        Quay trở lại trang chủ
        <Button
          component={RouterLink}
          to="/"
          variant="contained"
          color="primary"
          sx={{ color: "white", ml: 2 }}
        >
          Trang chủ
        </Button>
      </TitleText>
    </Container>
  );
};

export default NotFoundPage;
