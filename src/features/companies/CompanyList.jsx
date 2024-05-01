import { useState } from "react";
import { Grid, Box, CircularProgress, Alert } from "@mui/material";
import AppPagination from "../../ui/sharedComponents/AppPagination";
import TitleText from "../../ui/sharedComponents/TitleText";
import CompanySummaryCard from "./CompanySummaryCard";
import { useCompanies } from "./useCompanies";

const COMPANIES_PER_PAGE = 3;

function CompanyList() {
  const { companies, isLoading, isError, error } = useCompanies();
  const [currentPage, setCurrentPage] = useState(1);

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

  const startIndex = (currentPage - 1) * COMPANIES_PER_PAGE;
  const endIndex = currentPage * COMPANIES_PER_PAGE;
  const paginatedCompanies = companies.slice(startIndex, endIndex);
  const count = Math.ceil(companies.length / COMPANIES_PER_PAGE);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

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

      {paginatedCompanies?.map((company) => (
        <CompanySummaryCard
          key={company.id}
          company={company}
          xs={12}
          md={4}
        ></CompanySummaryCard>
      ))}

      <AppPagination
        onChange={handleChange}
        currentPage={currentPage}
        count={count}
      ></AppPagination>
    </Grid>
  );
}

export default CompanyList;
