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

function Education() {
  return (
    <ResumeCard
      container
      bgcolor={"red"}
      sx={{ maxWidth: "md", margin: "0 auto" }}
    >
      <TitleText>Học vấn</TitleText>
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
            sx={{ width: "80%" }}
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
            sx={{ width: "80%" }}
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
            sx={{ width: "80%" }}
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
            sx={{ width: "80%" }}
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
            sx={{ width: "80%" }}
          />
        </Grid>
      </Grid>
    </ResumeCard>
  );
}

export default Education;
