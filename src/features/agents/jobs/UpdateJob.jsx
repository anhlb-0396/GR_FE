import Paper from "@mui/material/Paper";
import UpdateJobForm from "../../../ui/inputs/jobs/UpdateJobForm";
import { useCreateJob } from "./agentCreateJob";
import { useAuth } from "../../../contexts/AuthContext";

function UpdateJob() {
  const { currentUser, token } = useAuth();
  const { createNewJob, isCreating } = useCreateJob(currentUser.company_id);

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
        onSubmit={createNewJob}
        isCreating={isCreating}
        currentUser={currentUser}
        token={token}
      />
    </Paper>
  );
}

export default UpdateJob;
