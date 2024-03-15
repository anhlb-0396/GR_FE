import { Box } from "@mui/material";

const styles = { width: "98%", margin: "0 auto", pt: "2rem" };

function Main({ children }) {
  return <Box sx={styles}>{children}</Box>;
}

export default Main;
