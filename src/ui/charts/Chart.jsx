import { Grid, Typography } from "@mui/material";
import { Bar } from "react-chartjs-2";

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Job",
    },
  },
};

function Chart({ data }) {
  return (
    <Grid
      container
      sx={{ width: "100%", mt: "2rem", margin: "0 auto" }}
      justifyContent="center"
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        color="primary"
      >
        Thống kê việc làm theo ngành nghề
      </Typography>

      <Bar options={options} data={data} />
    </Grid>
  );
}

export default Chart;
