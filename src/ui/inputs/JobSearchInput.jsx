import {
  Typography,
  Grid,
  Autocomplete,
  TextField,
  Button,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useJobs } from "../../features/jobs/useJobs";

function JobSearchInput() {
  const { isLoading, isError, error, jobs } = useJobs();
  const { control, handleSubmit, setValue } = useForm();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;

  const uniqueIndustries = [...new Set(jobs.map((job) => job.industry))];
  const uniqueFields = [...new Set(jobs.map((job) => job.field))];
  const uniqueCompanyNames = [...new Set(jobs.map((job) => job.Company.name))];
  const uniqueLocations = [...new Set(jobs.map((job) => job.Company.location))];

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container sx={{ py: "4%" }} spacing={2} gap={3}>
        <Grid container item justifyContent="center" xs={12}>
          <Typography
            variant="h4"
            fontWeight="bold"
            textAlign="center"
            color="primary"
          >
            Tìm kiếm công việc phù hợp
          </Typography>
        </Grid>

        <Grid container item xs={12} spacing={2} flexWrap="wrap">
          <Grid item xs={2.5}>
            <Controller
              name="companyName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  variant="outlined"
                  size="small"
                  disablePortal
                  options={uniqueCompanyNames}
                  onChange={(event, value) => setValue("companyName", value)}
                  renderInput={(params) => (
                    <TextField {...params} label="Tên công ty" />
                  )}
                />
              )}
            ></Controller>
          </Grid>

          <Grid item xs={2.5}>
            <Autocomplete
              variant="outlined"
              size="small"
              disablePortal
              id="combo-box-demo"
              options={uniqueLocations}
              renderInput={(params) => (
                <TextField {...params} label="Địa điểm" />
              )}
            />
          </Grid>

          <Grid item xs={2}>
            <Autocomplete
              variant="outlined"
              size="small"
              disablePortal
              id="combo-box-demo"
              options={uniqueFields}
              renderInput={(params) => (
                <TextField {...params} label="Lĩnh vực" />
              )}
            />
          </Grid>

          <Grid item xs={2}>
            <Autocomplete
              variant="outlined"
              size="small"
              disablePortal
              id="combo-box-demo"
              options={uniqueIndustries}
              renderInput={(params) => (
                <TextField {...params} label="Ngành nghề" />
              )}
            />
          </Grid>

          <Grid item xs={1.5}>
            <Autocomplete
              variant="outlined"
              size="small"
              disablePortal
              id="combo-box-demo"
              options={["fulltime", "partime", "remote"]}
              renderInput={(params) => (
                <TextField {...params} label="Loại hình" />
              )}
            />
          </Grid>

          <Grid item xs={1.5}>
            <Autocomplete
              variant="outlined"
              size="small"
              disablePortal
              id="combo-box-demo"
              options={["Online", "Offline"]}
              renderInput={(params) => (
                <TextField {...params} label="Hình thức " />
              )}
            />
          </Grid>

          <Grid item xs={3}>
            <Button variant="contained" sx={{ color: "white" }} type="submit">
              Search
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}

export default JobSearchInput;
