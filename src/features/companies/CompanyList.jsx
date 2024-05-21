import { useEffect, useState } from "react";
import { Grid, Box, CircularProgress, Alert } from "@mui/material";
import AppPagination from "../../ui/sharedComponents/AppPagination";
import TitleText from "../../ui/sharedComponents/TitleText";
import CompanySummaryCard from "./CompanySummaryCard";
import { useCompanies } from "./useCompanies";

const COMPANIES_PER_PAGE = 6;

function CompanyList({ ratingDisplay = true, searchTerm = "" }) {
  const { companies, isLoading, isError, error } = useCompanies();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

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

  const filteredCompanies = companies?.filter((company) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * COMPANIES_PER_PAGE;
  const endIndex = currentPage * COMPANIES_PER_PAGE;
  const paginatedCompanies = filteredCompanies.slice(startIndex, endIndex);
  const count = Math.ceil(filteredCompanies.length / COMPANIES_PER_PAGE);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Grid
      container
      spacing={2}
      rowGap={4}
      margin="10px auto"
      alignItems="stretch"
      mt={4}
    >
      <Grid item xs={12}>
        <TitleText variant="h4">Danh sách các doanh nghiệp</TitleText>
      </Grid>

      {paginatedCompanies?.map((company) => (
        <CompanySummaryCard
          key={company.id}
          company={company}
          xs={12}
          md={4}
          ratingDisplay={ratingDisplay}
        />
      ))}

      <AppPagination
        onChange={handleChange}
        currentPage={currentPage}
        count={count}
      />
    </Grid>
  );
}

export default CompanyList;
