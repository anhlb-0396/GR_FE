import { Grid, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useJobs } from "../../features/jobs/useJobs";
import CustomAutoComplete from "./CustomAutoComplete";
import TitleText from "./TitleText";

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
          <TitleText>Tìm kiếm công việc</TitleText>
        </Grid>

        <Grid container item xs={12} spacing={2} flexWrap="wrap">
          <CustomAutoComplete
            name="companyName"
            control={control}
            size={2.5}
            setValue={setValue}
            options={uniqueCompanyNames}
            label="Tên công ty"
          />

          <CustomAutoComplete
            name="location"
            control={control}
            size={2.5}
            setValue={setValue}
            options={uniqueLocations}
            label="Địa điểm"
          />

          <CustomAutoComplete
            name="field"
            control={control}
            size={2}
            setValue={setValue}
            options={uniqueFields}
            label="Lĩnh vực"
          />

          <CustomAutoComplete
            name="industry"
            control={control}
            size={2}
            setValue={setValue}
            options={uniqueIndustries}
            label="Ngành nghề"
          />

          <CustomAutoComplete
            name="workingMethod"
            control={control}
            size={1.5}
            setValue={setValue}
            options={["offline", "remote", "hybrid"]}
            label="Hình thức"
          />

          <CustomAutoComplete
            name="workingType"
            control={control}
            size={1.5}
            setValue={setValue}
            options={["fulltime", "partime"]}
            label="Loại hình"
          />

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
