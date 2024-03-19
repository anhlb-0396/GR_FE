import { Typography } from "@mui/material";

function TitleText({
  children,
  textAlign = "center",
  variant = "h4",
  color = "primary",
}) {
  return (
    <Typography
      variant={variant}
      fontWeight="bold"
      textAlign={textAlign}
      color={color}
    >
      {children}
    </Typography>
  );
}

export default TitleText;
