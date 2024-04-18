import { Card, CardContent } from "@mui/material";

export default function CustomCard({ children, sx, ...props }) {
  return (
    <Card {...props} sx={{ borderRadius: 3, boxShadow: 3, mb: 2, ...sx }}>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
