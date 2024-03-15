import { Pagination, Grid } from "@mui/material";

function AppPagination({ onChange, currentPage, count = 10 }) {
  return (
    <Grid container justifyContent="center">
      <Pagination
        count={count}
        variant="outlined"
        shape="rounded"
        sx={{ mt: "2rem" }}
        color="primary"
        size="large"
        onChange={onChange}
        page={currentPage}
      />
    </Grid>
  );
}

export default AppPagination;
