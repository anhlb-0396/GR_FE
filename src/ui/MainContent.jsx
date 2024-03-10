import { Grid } from "@mui/material";

const styles = { width: { xs: "96%", sm: "66%" }, margin: "17px auto" };

function MainContent({ children }) {
  return <Grid sx={styles}>{children}</Grid>;
}

export default MainContent;
