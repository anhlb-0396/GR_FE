import { useAuth } from "../../../contexts/AuthContext";
import { PieChart } from "../../../ui/charts/PieChart";
import { displayStatus } from "../../../utils/helpers";
import { useStatisticsByApplies } from "./useStatisticsByApplies";
import { Box, CircularProgress, Alert } from "@mui/material";

function AppliesStatistic() {
  const { currentUser } = useAuth();
  const { statisticsByApplies, isLoading, isError } = useStatisticsByApplies(
    currentUser.company_id
  );

  if (isLoading) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "50vh", // Adjust the height here
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
      <Box sx={{ width: "100%", margin: "0 auto" }}>
        <Alert severity="error">Không có dữ liệu</Alert>
      </Box>
    );
  }

  const labels = statisticsByApplies.map((item) => displayStatus(item.status));

  const data = {
    labels,
    datasets: [
      {
        label: "Số lượng người",
        data: statisticsByApplies.map((item) => item.value),
        backgroundColor: [
          "rgba(255, 206, 86, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(255, 99, 132, 0.2)",
        ],
        borderColor: [
          "rgba(255, 206, 86, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <PieChart
      data={data}
      title="Thống kê tình trạng ứng tuyển"
      maxHeight="300px" // Adjust the maxHeight here
    />
  );
}

export default AppliesStatistic;
