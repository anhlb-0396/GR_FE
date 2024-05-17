import { useEffect, useState } from "react";
import { Grid, Box, Alert, CircularProgress } from "@mui/material";
import JobItem from "./JobItem";
import AppPagination from "../../ui/sharedComponents/AppPagination";
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

  const { jobs, isError, refetch, isFetching } = useJobsQuery(
    queryString || ""
  );
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
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

  if (isError) {
    return (
      <Box>
        <Alert severity="error">Không tìm thấy công ty phù hợp</Alert>
      </Box>
    );
  }

  return (
    <Grid container spacing={2} rowGap={4} margin="10px auto">
      {isFetching && (
        <Box
          sx={{
            width: "100%",
            height: "50vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress size={80} />
        </Box>
      )}
      {!isFetching &&
        paginatedJobs.map((job) => <JobItem job={job} key={job.id}></JobItem>)}
      <AppPagination
        onChange={handleChange}
        currentPage={currentPage}
        count={count}
      ></AppPagination>
    </Grid>
  );
}

export default JobList;
