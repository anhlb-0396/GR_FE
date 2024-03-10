import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import Header from "./Header";
import MainContent from "./MainContent";

function AppLayouts() {
  return (
    <>
      <Header></Header>
      <MainContent>
        <Outlet></Outlet>
      </MainContent>
    </>
  );
}

export default AppLayouts;
