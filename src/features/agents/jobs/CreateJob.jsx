import Paper from "@mui/material/Paper";
import CreateJobForm from "../../../ui/inputs/CreateJobForm";

function CreateJob() {
  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        height: "auto",
      }}
    >
      <CreateJobForm />
    </Paper>
  );
}

export default CreateJob;
