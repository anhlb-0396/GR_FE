import { Paper, Grid } from "@mui/material";
import IndustriesStatistics from "../features/agents/statistics/IndustriesStatistics";
import AppliesStatistic from "../features/agents/statistics/AppliesStatistic";

function StatisticsPage() {
  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 4, // Adjust the border radius as needed
        padding: "20px", // Add padding to match the Paper component
        marginTop: "20px", // Add margin top to match the Paper component
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <IndustriesStatistics />
        </Grid>
        <Grid item xs={12}>
          <AppliesStatistic />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default StatisticsPage;
