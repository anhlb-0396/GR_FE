import { Pagination, Grid } from "@mui/material";

function AppPagination() {
  return (
    <Grid container justifyContent="center">
      <Pagination
        count={10}
        variant="outlined"
        shape="rounded"
        sx={{ mt: "2rem" }}
        color="error"
        size="large"
      />
    </Grid>
  );
}

export default AppPagination;
