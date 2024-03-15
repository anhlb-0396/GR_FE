import { useState } from "react";
import { Grid, Box } from "@mui/material";
import { Oval } from "react-loader-spinner";
import JobItem from "./JobItem";
import AppPagination from "../../ui/AppPagination";
import { useJobs } from "./useJobs";

const JOB_PER_PAGE = 5;

function JobList() {
  const { jobs, isLoading, isError, error } = useJobs();
  const [currentPage, setCurrentPage] = useState(1);

  if (!jobs) return null;

  const startIndex = (currentPage - 1) * JOB_PER_PAGE;
  const endIndex = currentPage * JOB_PER_PAGE;
  const paginatedJobs = jobs.slice(startIndex, endIndex);
  const count = Math.ceil(jobs.length / JOB_PER_PAGE);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <Grid container spacing={2} rowGap={4} margin="10px auto">
      {paginatedJobs.map((job) => (
        <JobItem job={job} key={job.id}></JobItem>
      ))}
      <AppPagination
        onChange={handleChange}
        currentPage={currentPage}
        count={count}
      ></AppPagination>
    </Grid>
  );
}

export default JobList;
