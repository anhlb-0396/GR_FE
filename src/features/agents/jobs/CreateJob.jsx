import Paper from "@mui/material/Paper";
import CreateJobForm from "../../../ui/inputs/CreateJobForm";
import { useCreateJob } from "./agentCreateJob";
import { useAuth } from "../../../contexts/AuthContext";

function CreateJob() {
  const { createNewJob, isCreating } = useCreateJob();
  const { currentUser, token } = useAuth();

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
