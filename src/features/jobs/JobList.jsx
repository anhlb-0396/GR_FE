import { Grid } from "@mui/material";

import JobItem from "./JobItem";

function JobList() {
  return (
    <Grid container xs spacing={2} rowGap={2} width="60%" margin="10px auto">
      <JobItem></JobItem>
      <JobItem></JobItem>
      <JobItem></JobItem>
      <JobItem></JobItem>
    </Grid>
  );
}

export default JobList;
