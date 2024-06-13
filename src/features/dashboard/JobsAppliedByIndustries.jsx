import Chart from "../../ui/charts/Chart";

function JobAppliedByIndustries({ statistics }) {
  const labels = statistics.map((item) => item.name);
  const data = {
    labels,
    datasets: [
      {
        label: "Số lượng việc đã ứng tuyển",
        data: statistics.map((item) => item.count),
        backgroundColor: "#414f7c",
      },
    ],
  };

  return <Chart data={data} hasTitle={false} />;
}

export default JobAppliedByIndustries;
