import { useState } from "react";
import { Grid, Box, Alert, CircularProgress } from "@mui/material";
import JobItem from "../jobs/JobItem";
import AppPagination from "../../ui/sharedComponents/AppPagination";
import { useBookmarks } from "./useBookmarks";
import { useAuth } from "../../contexts/AuthContext";

const JOB_PER_PAGE = 5;

function BookmarkJobList() {
  const { currentUser } = useAuth();
  const { bookmarks, isLoading, isError } = useBookmarks(currentUser.id);
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
        <Alert severity="error">Không có dữ liệu !</Alert>
      </Box>
    );
  }

  const jobs = bookmarks.map((bookmark) => bookmark.Job);

  if (jobs.length === 0) {
    return (
      <Box sx={{ width: "80%", margin: "0 auto" }}>
        <Alert severity="error">Chưa lưu công việc nào</Alert>
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
      {isLoading && (
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
      {!isLoading &&
        paginatedJobs.map((job) => <JobItem job={job} key={job.id}></JobItem>)}
      <AppPagination
        onChange={handleChange}
        currentPage={currentPage}
        count={count}
      ></AppPagination>
    </Grid>
  );
}

export default BookmarkJobList;
