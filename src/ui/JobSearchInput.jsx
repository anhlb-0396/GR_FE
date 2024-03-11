import {
  Typography,
  Grid,
  Autocomplete,
  TextField,
  Button,
} from "@mui/material";

const testData = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
];

function JobSearchInput() {
  return (
    <Grid container sx={{ py: "4%" }} spacing={2} gap={3}>
      <Grid container item justifyContent="center">
        <Typography variant="h5" sx={{ fontWeight: 700, textAlign: "center" }}>
          Find your next job
        </Typography>
      </Grid>
      <Grid container item xs={12} spacing={2}>
        <Grid item xs={3}>
          <Autocomplete
            variant="outlined"
            size="small"
            disablePortal
            id="combo-box-demo"
            options={testData}
            renderInput={(params) => <TextField {...params} label="Search" />}
          />
        </Grid>

        <Grid item xs={3}>
          <Autocomplete
            variant="outlined"
            size="small"
            disablePortal
            id="combo-box-demo"
            options={testData}
            renderInput={(params) => <TextField {...params} label="Search" />}
          />
        </Grid>

        <Grid item xs={3}>
          <Autocomplete
            variant="outlined"
            size="small"
            disablePortal
            id="combo-box-demo"
            options={testData}
            renderInput={(params) => <TextField {...params} label="Search" />}
          />
        </Grid>

        <Grid item xs={3}>
          <Button variant="">Search</Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default JobSearchInput;
