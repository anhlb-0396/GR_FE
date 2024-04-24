import { Grid, Button, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useJobs } from "../../../features/jobs/useJobs";
import CustomAutoComplete from "../CustomAutoComplete";
import TitleText from "../../sharedComponents/TitleText";
import provinces from "../../../data/provincesData";
import { useNavigate } from "react-router-dom";
import { useIndustries } from "../../../features/industries/useIndustries";

function JobSearchInput() {
  const navigate = useNavigate();
  const { isLoading, isError, error, jobs } = useJobs();
  const {
    isLoading: isLoadingIndustries,
    isError: isErrorIndustries,
    industries,
  } = useIndustries();
  const { control, handleSubmit, setValue } = useForm();

  if (isLoading || isLoadingIndustries) return <div>Loading...</div>;
  if (isError || isErrorIndustries) return <div>{error.message}</div>;

  const uniqueCompanyNames = [...new Set(jobs.map((job) => job.Company.name))];

  const onSubmit = (data) => {
    const location = provinces.find(
      (province) => province.province_name === data.location
    );

    data.location = location ? location.province_id : null;

    const queryString = Object.entries(data)
      .filter((el) => !!el[1])
      .map((el) => el.join("="))
      .join("&");

    navigate(`?${queryString}`);
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
            xs={6}
            md={2.5}
            setValue={setValue}
            options={uniqueCompanyNames}
            label="Tên công ty"
          />

          <CustomAutoComplete
            name="location"
            control={control}
            xs={6}
            md={2}
            setValue={setValue}
            options={provinces.map((province) => province.province_name)}
            label="Địa điểm"
          />

          <CustomAutoComplete
            name="industry"
            control={control}
            xs={6}
            md={2.5}
            setValue={setValue}
            options={industries.map((industry) => industry.industry)}
            label="Ngành nghề"
          />

          <CustomAutoComplete
            name="workingMethod"
            control={control}
            xs={6}
            md={1.25}
            setValue={setValue}
            options={["offline", "remote", "hybrid"]}
            label="Hình thức"
          />

          <CustomAutoComplete
            name="workingType"
            control={control}
            xs={6}
            md={1.25}
            setValue={setValue}
            options={["fulltime", "partime"]}
            label="Loại hình"
          />

          <Grid item xs={6} md={2.5}>
            <Controller
              name="minSalary"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Mức lương tối thiểu"
                  variant="outlined"
                  size="small"
                  fullWidth
                />
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
