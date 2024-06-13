import React, { useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { options } from "../../constants/chartOptions";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Chart({ data, hasTitle = true }) {
  const limitedData = {
    ...data,
    labels: data.labels.slice(0, 60),
    datasets: data.datasets.map((dataset) => ({
      ...dataset,
      data: dataset.data.slice(0, 60),
    })),
  };

  return (
    <Grid
      container
      sx={{ width: { xs: "100%", md: "90%" }, mt: "2rem", margin: "0 auto" }}
      justifyContent="center"
    >
      {hasTitle && (
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          color="primary"
          sx={{ mb: 2 }}
        >
          Thống kê tổng số việc làm theo ngành nghề
        </Typography>
      )}
      <div style={{ overflowX: "auto", width: "100%" }}>
        <div style={{ width: "1500px" }}>
          <Bar options={options} data={limitedData} height="100px" />
        </div>
      </div>
    </Grid>
  );
}

export default Chart;
