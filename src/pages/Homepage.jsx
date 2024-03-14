import JobList from "../features/jobs/JobList";
import JobSearchInput from "../ui/JobSearchInput";
import AppPagination from "../ui/AppPagination";
import { Box } from "@mui/material";

function Homepage() {
  return (
    <Box sx={{ width: "70%", margin: "0 auto" }}>
      <JobSearchInput></JobSearchInput>
      <JobList></JobList>
      <AppPagination></AppPagination>
    </Box>
  );
}

export default Homepage;
