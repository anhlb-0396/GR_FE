import { Grid, Box } from "@mui/material";

const styles = { width: "96%", margin: "17px auto" };

function Main({ children }) {
  return <Box sx={styles}>{children}</Box>;
}

export default Main;
