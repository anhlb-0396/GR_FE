import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ResumeCard from "../ResumeCard";
import TitleText from "../../../ui/inputs/TitleText";
import SaveButton from "../../../ui/inputs/SaveButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ControlledTextField from "../../../ui/inputs/ControlledTextField";

function Personal() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <ResumeCard container sx={{ maxWidth: "md", margin: "0 auto" }}>
      <TitleText>Thông tin cá nhân</TitleText>

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container sx={{ mt: "2rem" }} rowGap={3}>
          <Grid container item xs={12} md={6} justifyContent="center">
            <ControlledTextField
              id="name"
              name="name"
              label="Họ và tên"
              register={register}
              errors={errors}
              startAdornment={<AccountCircle />}
            />
          </Grid>

          <Grid container item xs={12} md={6} justifyContent="center">
            <ControlledTextField
              id="address"
              name="address"
              label="Địa chỉ"
              register={register}
              errors={errors}
              startAdornment={<LocationOnIcon />}
            />
          </Grid>

          <Grid container item xs={12} md={12} justifyContent="flex-end">
            <SaveButton type="submit" />
          </Grid>
        </Grid>
      </Box>
    </ResumeCard>
  );
}

export default Personal;
