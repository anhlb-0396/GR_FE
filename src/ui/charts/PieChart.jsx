import React from "react";
import { Grid } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export function PieChart({ data }) {
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
    },
  };

  return (
    <Grid
      container
      sx={{
        width: { sm: "100%", md: "60%" },
        maxHeight: "300px",
        mt: "2rem",
        margin: "0 auto",
      }}
      justifyContent="center"
    >
      <Pie data={data} options={options} />
    </Grid>
  );
}
