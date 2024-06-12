import { Paper } from "@mui/material";
import { useAuth } from "../../../contexts/AuthContext";
import { useCreateCompany } from "./agentCreateCompany";
import CreateCompanyForm from "../../../ui/inputs/companies/CreateCompanyForm";

function CreateCompany() {
  const { currentUser, token, handleLogout } = useAuth();
  const { createNewCompany, isCreating } = useCreateCompany();

  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        height: "auto",
      }}
    >
      <CreateCompanyForm
        onSubmit={createNewCompany}
        isCreating={isCreating}
        currentUser={currentUser}
        token={token}
        handleLogout={handleLogout}
      />
    </Paper>
  );
}

export default CreateCompany;
