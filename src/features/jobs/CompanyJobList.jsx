import { useEffect, useState } from "react";
import { Grid, Box, Alert, CircularProgress } from "@mui/material";
import JobItem from "./JobItem";
import AppPagination from "../../ui/sharedComponents/AppPagination";
import { useJobsQuery } from "./useJobsQuery";
const JOB_PER_PAGE = 5;

function CompanyJobList({ company }) {
  const { jobs, isLoading, isError, isFetching } = useJobsQuery(
    `companyId=${company.id}`
  );

  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading) {
    return (
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
    );
  }

  if (isError) {
    return (
      <Box sx={{ width: "80%", margin: "0 auto" }}>
        <Alert severity="error">
          Không có dữ liệu nào về công việc liên quan!!!
        </Alert>
      </Box>
    );
  }

  const startIndex = (currentPage - 1) * JOB_PER_PAGE;
  const endIndex = currentPage * JOB_PER_PAGE;
  const paginatedJobs = jobs.slice(startIndex, endIndex);
  const count = Math.ceil(jobs.length / JOB_PER_PAGE);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

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

export default CompanyJobList;
