import JobList from "../features/jobs/JobList";
import JobSearchInput from "../ui/inputs/JobSearchInput";
import { Box } from "@mui/material";
import Chart from "../ui/charts/Chart";

function Homepage() {
  return (
    <Box sx={{ width: { md: "70%", xs: "90%" }, margin: "0 auto" }}>
      <Chart></Chart>
      <JobSearchInput></JobSearchInput>
      <JobList></JobList>
    </Box>
  );
}

export default Homepage;
