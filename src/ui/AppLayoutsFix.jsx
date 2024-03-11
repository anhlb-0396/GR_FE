import { Grid, Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";

function AppLayoutsFix() {
  return (
    <Box sx={{ width: "100%" }}>
      <Header></Header>
      <Main>
        <Outlet />
      </Main>
    </Box>
  );
}

export default AppLayoutsFix;
