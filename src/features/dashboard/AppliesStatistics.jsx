import { PieChart } from "../../ui/charts/PieChart";
import { displayStatus } from "../../utils/helpers";

function AppliesStatistic({ statisticsByApplies }) {
  const labels = statisticsByApplies.map((item) => displayStatus(item.status));

  const data = {
    labels,
    datasets: [
      {
        label: "Tỉ lệ trúng tuyển",
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

  return <PieChart data={data} maxHeight="2000px" />;
}

export default AppliesStatistic;
