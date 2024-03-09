import { Outlet } from "react-router-dom";
import Header from "./Header";

function AppLayouts() {
  return (
    <>
      <Header></Header>
      <Outlet></Outlet>
    </>
  );
}

export default AppLayouts;
