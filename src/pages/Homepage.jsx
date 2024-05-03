import { Box } from "@mui/material";
import JobList from "../features/jobs/JobList";
import JobSearchInput from "../ui/inputs/jobs/JobSearchInput";
import CompanyList from "../features/companies/CompanyList";
import TotalJobsByIndustry from "../features/statistics/TotalJobsByIndustry";

function Homepage() {
  return (
    <Box sx={{ width: { md: "70%", xs: "90%" }, margin: "0 auto" }}>
      <TotalJobsByIndustry />
      <JobSearchInput />
      <JobList />
      <CompanyList />
    </Box>
  );
}

export default Homepage;
