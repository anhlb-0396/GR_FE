import { Grid, Box, Button, Alert } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useAuth } from "../../../contexts/AuthContext";
import { Link } from "react-router-dom";
import TitleText from "../../../ui/sharedComponents/TitleText";
import CompanyDetails from "../../companies/CompanyDetails";

function AgentCompany() {
  const { currentUser, isAgent } = useAuth();

  if (!isAgent) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        Bạn không phải là HR
      </Alert>
    );
  }

  if (!currentUser.company_id) {
    return (
      <Box sx={{ m: 2 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          sx={{ color: "white" }}
          component={Link}
          to="/agent/companies/create"
        >
          Tạo công ty mới
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
