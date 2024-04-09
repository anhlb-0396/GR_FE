import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TitleText from "../../ui/inputs/TitleText";
import CompanySummaryCard from "./CompanySummaryCard";
import { useCompanies } from "./useCompanies";
import { Grid } from "@mui/material";
import AppPagination from "../../ui/AppPagination";

const COMPANIES_PER_PAGE = 3;

function CompanyList() {
  const { companies, isLoading, isError, error } = useCompanies();
  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

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
