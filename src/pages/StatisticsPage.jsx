import { Paper, Grid } from "@mui/material";
import IndustriesStatistics from "../features/agents/statistics/IndustriesStatistics";
import AppliesStatistic from "../features/agents/statistics/AppliesStatistic";

function StatisticsPage() {
  return (
    <Grid container spacing={2}>
      <Paper>
        <Grid container>
          {/* Add margin top */}
          <Grid item xs={12} mt={5}>
            <IndustriesStatistics />
          </Grid>
          <Grid item xs={12} mt={5}>
            <AppliesStatistic />
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default StatisticsPage;
