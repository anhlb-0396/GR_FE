import { Grid, CircularProgress } from "@mui/material";
import JobItem from "../jobs/JobItem";
import AppPagination from "../../ui/sharedComponents/AppPagination";

function ExpectJobsList({ expectations }) {
  console.log(expectations);

  return (
    <Grid container spacing={2} rowGap={4} margin="10px auto">
      {/* {isFetching && <CircularProgress></CircularProgress>} */}
      {expectations.map((job) => (
        <JobItem job={job} key={job.id}></JobItem>
      ))}
      {/* <AppPagination
        onChange={handleChange}
        currentPage={currentPage}
        count={count}
      ></AppPagination> */}
    </Grid>
  );
}

export default ExpectJobsList;
