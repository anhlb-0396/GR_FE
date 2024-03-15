import JobList from "../features/jobs/JobList";
import JobSearchInput from "../ui/JobSearchInput";
import { Box } from "@mui/material";

function Homepage() {
  return (
    <Box sx={{ width: { md: "80%", xs: "100%" }, margin: "0 auto" }}>
      <JobSearchInput></JobSearchInput>
      <JobList></JobList>
    </Box>
  );
}

export default Homepage;
