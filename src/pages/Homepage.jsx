import { Box } from "@mui/material";
import JobList from "../features/jobs/JobList";
import JobSearchInput from "../ui/inputs/jobs/JobSearchInput";
import CompanyList from "../features/companies/CompanyList";
import TotalJobsByIndustry from "../features/statistics/TotalJobsByIndustry";

function Homepage({ isGuest = true }) {
  return (
    <Box sx={{ margin: "0 auto", width: `${isGuest ? "70%" : "100%"}` }}>
      <TotalJobsByIndustry />
      <JobSearchInput />
      <JobList />
      <CompanyList />
    </Box>
  );
}

export default Homepage;
