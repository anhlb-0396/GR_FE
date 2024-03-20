import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ResumeCard from "../ResumeCard";
import TitleText from "../../../ui/inputs/TitleText";

import SaveIcon from "@mui/icons-material/Save";

function Personal() {
  return (
    <ResumeCard
      container
      bgcolor={"red"}
      sx={{ maxWidth: "md", margin: "0 auto" }}
    >
      <TitleText>Thông tin cá nhân</TitleText>
      <Grid container sx={{ mt: "2rem" }} rowGap={3}>
        <Grid container item xs={12} md={6} justifyContent={"center"}>
          <TextField
            id="input-with-icon-textfield"
            label="TextField"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            size="large"
            sx={{ width: "90%" }}
          />
        </Grid>

        <Grid container item xs={12} md={6} justifyContent={"center"}>
          <TextField
            id="input-with-icon-textfield"
            label="TextField"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            size="large"
            sx={{ width: "90%" }}
          />
        </Grid>

        <Grid container item xs={12} md={6} justifyContent={"center"}>
          <TextField
            id="input-with-icon-textfield"
            label="TextField"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            size="large"
            sx={{ width: "90%" }}
          />
        </Grid>

        <Grid container item xs={12} md={6} justifyContent={"center"}>
          <TextField
            id="input-with-icon-textfield"
            label="TextField"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            size="large"
            sx={{ width: "90%" }}
          />
        </Grid>

        <Grid container item xs={12} md={6} justifyContent={"center"}>
          <TextField
            id="input-with-icon-textfield"
            label="TextField"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            size="large"
            sx={{ width: "90%" }}
          />
        </Grid>

        <Grid container item xs={12} md={6} justifyContent={"center"}>
          <TextField
            id="input-with-icon-textfield"
            label="TextField"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            size="large"
            sx={{ width: "90%" }}
          />
        </Grid>

        <Grid container item xs={12} md={12} justifyContent={"flex-end"}>
          <Button
            variant="contained"
            color="primary"
            sx={{ color: "white", mr: "20px" }}
            startIcon={<SaveIcon />}
          >
            Lưu
          </Button>
        </Grid>
      </Grid>
    </ResumeCard>
  );
}

export default Personal;
