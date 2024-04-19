import { Grid, Box, Alert, CircularProgress } from "@mui/material";
import { useCompany } from "./useCompany";
import CompanySummaryCard from "../../companies/CompanySummaryCard";
import CommentList from "../../comments/CommentList";
import TitleText from "../../../ui/sharedComponents/TitleText";

function CompanyDetails({ companyId }) {
  const { company, isLoading, isError, error } = useCompany(companyId);

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
          thông tin về doanh nghiệp mới (`${error.message}`)
        </Alert>
      </Box>
    );
  }

  return (
    <Grid container mt={3} columnGap={4} rowGap={3}>
      <Grid item xs={9} md={4.5}>
        <CompanySummaryCard company={company} />
      </Grid>
      <Grid item xs={12} md={7}>
        <Box sx={{ width: "100%", height: "100%" }}>
          <iframe
            title="company"
            src={company?.website}
            width="100%"
            height="100%"
          />
        </Box>
      </Grid>

      <Grid item xs={12} container>
        <Box>
          <Grid item container xs={12} alignItems="center" mb={3}>
            <TitleText variant="h5">Bình luận về doanh nghiệp</TitleText>
          </Grid>
        </Box>
        <CommentList companyId={companyId} isAgent />
      </Grid>
    </Grid>
  );
}

export default CompanyDetails;
