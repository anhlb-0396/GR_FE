import { Paper } from "@mui/material";
import { useCreateJob } from "./agentCreateJob";
import { useAuth } from "../../../contexts/AuthContext";
import CreateJobForm from "../../../ui/inputs/jobs/CreateJobForm";

function CreateJob() {
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
      <CreateJobForm
        onSubmit={createNewJob}
        isCreating={isCreating}
        currentUser={currentUser}
        token={token}
      />
    </Paper>
  );
}

export default CreateJob;
