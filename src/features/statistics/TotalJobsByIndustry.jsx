import { Box, CircularProgress, Alert } from "@mui/material";
import { useStatisticsByIndustries } from "./useStatisticsByIndustries";
import Chart from "../../ui/charts/Chart";

function TotalJobsByIndustry() {
  const { statistics, isLoading, isError } = useStatisticsByIndustries();

  if (isLoading) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "50vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress size={80} />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ width: "80%", margin: "0 auto" }}>
        <Alert severity="error">Không có dữ liệu</Alert>
      </Box>
    );
  }

  const labels = statistics.map((item) => item.industry);
  const data = {
    labels,
    datasets: [
      {
        label: "Số lượng người ứng tuyển",
        data: statistics.map((item) => item.totalAppliedJobs),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Số lượng Jobs",
        data: statistics.map((item) => item.totalJobs),
        backgroundColor: "#414f7c",
      },
    ],
  };

  return <Chart data={data} />;
}

export default TotalJobsByIndustry;
