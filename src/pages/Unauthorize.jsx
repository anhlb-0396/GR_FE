import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Container, Typography, Button, Grid } from "@mui/material";
import { Home as HomeIcon } from "@mui/icons-material";
import TitleText from "../ui/sharedComponents/TitleText";

const Unauthorize = () => {
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
      <Grid container>
        <TitleText variant="h3" align="center" gutterBottom color="error">
          403 - Không có quyền truy cập !
        </TitleText>
      </Grid>
      <Grid container mt={3}>
        <TitleText variant="h4" align="center" paragraph>
          Bạn không có quyền truy cập vào trang này !
        </TitleText>
      </Grid>

      <Grid container mt={3} justifyContent="center">
        <Button
          component={RouterLink}
          to="/"
          variant="contained"
          color="primary"
          sx={{ color: "white", margin: "0 auto" }}
          startIcon={<HomeIcon />}
        >
          Trang chủ
        </Button>
      </Grid>
    </Container>
  );
};

export default Unauthorize;
