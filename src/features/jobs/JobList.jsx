import { Grid, LinearProgress, Box } from "@mui/material";
import JobItem from "./JobItem";
import { useJobs } from "./useJobs";

function JobList() {
  const { jobs, isLoading, isError, error } = useJobs();

  if (isLoading) {
    return (
      <Box sx={{ height: "100px", width: "100%", textAlign: "center" }}>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <Grid container xs spacing={2} rowGap={4} margin="10px auto">
      {jobs.map((job) => (
        <JobItem job={job} key={job.id}></JobItem>
      ))}
    </Grid>
  );
}

export default JobList;
