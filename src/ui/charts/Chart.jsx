import { Grid, Typography } from "@mui/material";
import { Bar } from "react-chartjs-2";
import { Title, Tooltip, Legend } from "chart.js/auto"; // Importing necessary components from "chart.js/auto"
import faker from "faker";

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

const labels = [
  "IT",
  "Kinh doanh",
  "Nhân sự",
  "Tư vấn",
  "Kế toán",
  "Thực phẩm",
  "Dược phẩm",
  "Công nghệ thông tin",
  "Kinh doanh",
  "Nhân sự",
  "Tư vấn",
  "Kế toán",
];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "#414f7c",
    },
  ],
};

function Chart() {
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
        Thống kê việc làm theo ngành nghề
      </Typography>

      <Bar options={options} data={data} />
    </Grid>
  );
}

export default Chart;
