import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
// import { Oval } from "react-loader-spinner";
import JobItem from "./JobItem";
import AppPagination from "../../ui/AppPagination";
import { useJobsQuery } from "./useJobsQuery";
import { useLocation } from "react-router-dom";

const JOB_PER_PAGE = 5;

function JobList() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Iterate over each parameter
  const queryParams = {};
  for (const [key, value] of searchParams) {
    queryParams[key] = decodeURIComponent(value);
  }

  const queryString = Object.entries(queryParams)
    .filter((el) => !!el[1])
    .map((el) => el.join("="))
    .join("&");

  const { jobs, isLoading, isError, error, refetch } = useJobsQuery(
    queryString || ""
  );
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Refetch jobs whenever the queryString changes
    refetch();
  }, [queryString, refetch]);

  if (!jobs) return null;

  const startIndex = (currentPage - 1) * JOB_PER_PAGE;
  const endIndex = currentPage * JOB_PER_PAGE;
  const paginatedJobs = jobs.slice(startIndex, endIndex);
  const count = Math.ceil(jobs.length / JOB_PER_PAGE);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
