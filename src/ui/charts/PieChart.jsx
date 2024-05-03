import React from "react";
import { Grid, Typography } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export function PieChart({ data, title }) {
  // Calculate total value
  const total = data.datasets[0].data.reduce((acc, value) => acc + value, 0);

  // Add percentage to tooltips
  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || "";
            if (label) {
              const value = context.parsed || 0;
              const percentage = ((value / total) * 100).toFixed(2);
              return `${label}: ${value} (${percentage}%)`;
            }
            return "";
          },
        },
      },
      legend: {
        display: true,
        position: "right", // Adjust legend position here
        align: "start", // Adjust legend alignment here
        labels: {
          usePointStyle: true,
        },
      },
    },
  };

  return (
    <Grid
      container
      sx={{
        width: { sm: "100%", md: "50%" },
        maxHeight: "500px",
        mt: "2rem",
        margin: "0 auto",
      }}
      justifyContent="center"
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        color="primary"
      >
        {title}
      </Typography>
      <Pie data={data} options={options} />
    </Grid>
  );
}
