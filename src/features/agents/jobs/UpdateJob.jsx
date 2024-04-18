import { useParams } from "react-router-dom";
import { Box, CircularProgress, Paper, Alert } from "@mui/material";
import UpdateJobForm from "../../../ui/inputs/jobs/UpdateJobForm";
import { useAuth } from "../../../contexts/AuthContext";
import { useUpdateJob } from "./agentUpdateJob";
import { useJob } from "../../jobs/useJob";

function UpdateJob() {
  const { currentUser, token } = useAuth();
  const { isUpdating, updateNewJob } = useUpdateJob(currentUser.company_id);
  const { id } = useParams();
  const { job, isLoading, isError } = useJob(id);

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
        <Alert severity="error">Không có dữ liệu nào về công việc này!!!</Alert>
      </Box>
    );
  }

  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        height: "auto",
      }}
    >
      <UpdateJobForm
        onSubmit={updateNewJob}
        isUpdating={isUpdating}
        currentUser={currentUser}
        token={token}
        job={job}
      />
    </Paper>
  );
}

export default UpdateJob;
