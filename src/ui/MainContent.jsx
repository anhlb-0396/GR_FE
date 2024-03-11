import { Grid } from "@mui/material";

const styles = { width: { sm: "96%", md: "60%" }, margin: "17px auto" };

function MainContent({ children }) {
  return <Grid sx={styles}>{children}</Grid>;
}

export default MainContent;
