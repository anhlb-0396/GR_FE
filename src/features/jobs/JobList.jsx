import { Grid } from "@mui/material";
import JobItem from "./JobItem";
import { companies } from "../../data/data-companies";

function JobList() {
  return (
    <Grid container xs spacing={2} rowGap={4} margin="10px auto">
      {companies.map((company) => (
        <JobItem company={company} key={company.id}></JobItem>
      ))}
    </Grid>
  );
}

export default JobList;
