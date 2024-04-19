import { Grid, Box, Button, Alert } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useAuth } from "../../../contexts/AuthContext";
import TitleText from "../../../ui/sharedComponents/TitleText";
import CompanyDetails from "./CompanyDetails";

function AgentCompany() {
  const { currentUser, isAgent } = useAuth();

  if (!isAgent) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        Bạn không phải là HR
      </Alert>
    );
  }

  if (currentUser?.company === null) {
    return (
      <Box sx={{ m: 2 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          sx={{ color: "white" }}
        >
          Tạo công ty
        </Button>
      </Box>
    );
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <TitleText>Thông tin doanh nghiệp</TitleText>
        <CompanyDetails companyId={currentUser.company_id} />
      </Grid>
    </Grid>
  );
}

export default AgentCompany;
