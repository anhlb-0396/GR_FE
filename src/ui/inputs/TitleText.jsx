import { Typography } from "@mui/material";

function TitleText({ children }) {
  return (
    <Typography
      variant="h4"
      fontWeight="bold"
      textAlign="center"
      color="primary"
    >
      {children}
    </Typography>
  );
}

export default TitleText;
