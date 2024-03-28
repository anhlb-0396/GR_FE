import TitleText from "../../ui/inputs/TitleText";
import CompanySummaryCard from "./CompanySummaryCard";
import { useCompanies } from "./useCompanies";
import { Grid } from "@mui/material";

function CompanyList() {
  const { companies, isLoading, isError, error } = useCompanies();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  console.log(companies);

  return (
    <Grid
      container
      spacing={3}
      rowGap={4}
      margin="10px auto"
      alignItems="stretch"
      mt={4}
    >
      <Grid item xs={12}>
        <TitleText variant="h4">Danh sách các công ty nổi bật</TitleText>
      </Grid>

      {companies?.map((company) => (
        <CompanySummaryCard
          key={company.id}
          company={company}
          xs={12}
          md={4}
        ></CompanySummaryCard>
      ))}
    </Grid>
  );
}

export default CompanyList;
