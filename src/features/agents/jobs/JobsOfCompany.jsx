import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Box, CircularProgress, Button, Alert } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

import { useAuth } from "../../../contexts/AuthContext";
import { useJobs } from "./useJobs";
import JobItem from "../../jobs/JobItem";
import TitleText from "../../../ui/sharedComponents/TitleText";
import AppPagination from "../../../ui/sharedComponents/AppPagination";

const JOB_PER_PAGE = 3;

function JobsOfCompany() {
  const { currentUser, token } = useAuth();
  const { isLoading, isError, jobs } = useJobs(currentUser.company_id);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

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
      <Box sx={{ width: "100%", margin: "0 auto" }}>
        <Alert severity="error">
          Không có thông tin !! Vui lòng tạo thông tin về doanh nghiệp hoặc tạo
          công việc mới...
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
    <React.Fragment>
      <TitleText variant="h4">Danh sách công việc đã đăng</TitleText>
      <Button
        startIcon={<AddIcon />}
        variant="outlined"
        onClick={() => navigate("/agent/jobs/create")}
      >
        Tạo công việc mới
      </Button>
      <Grid container spacing={2} rowGap={4} margin="10px auto" mt={3}>
        {paginatedJobs.map((job) => (
          <JobItem job={job} key={job.id} />
        ))}
      </Grid>
      <AppPagination
        onChange={handleChange}
        currentPage={currentPage}
        count={count}
      ></AppPagination>
    </React.Fragment>
  );
}

export default JobsOfCompany;
