import { Pagination, Grid } from "@mui/material";

function AppPagination() {
  return (
    <Grid container justifyContent="center">
      <Pagination
        count={10}
        variant="outlined"
        shape="rounded"
        sx={{ mt: "1rem" }}
        color="error"
      />
    </Grid>
  );
}

export default AppPagination;
