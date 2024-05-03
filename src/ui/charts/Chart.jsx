import React, { useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { options } from "../../constants/chartOptions";

function Chart({ data }) {
  return (
    <Grid
      container
      sx={{ width: { sm: "100%", md: "80%" }, mt: "2rem", margin: "0 auto" }}
      justifyContent="center"
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        color="primary"
      >
        Thống kê tổng số việc làm theo ngành nghề
      </Typography>

      <Bar options={options} data={data} />
    </Grid>
  );
}

export default Chart;
