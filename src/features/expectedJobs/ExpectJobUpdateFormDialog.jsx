import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  Chip,
  Autocomplete,
  MenuItem,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import provinces from "../../data/provincesData";
import TitleText from "../../ui/sharedComponents/TitleText";
import TagsInput from "../../ui/inputs/TagsInput";
import { useIndustries } from "../industries/useIndustries";

function ExpectJobUpdateFormDialog({ open, onClose, onSubmit, requirement }) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const { industries, isLoading, isError } = useIndustries();
  const [industriesList, setIndustriesList] = useState([]);

  useEffect(() => {
    if (requirement && industries) {
      const industriesData = requirement.industries
        ? requirement.industries
            .split(",")
            .map(
              (id) => industries.find((ind) => ind.id === parseInt(id)) || []
            )
        : [];

      setIndustriesList(industriesData);

      const defaultValues = {
        min_salary: requirement.min_salary || "",
        industries: industriesData,
        working_experience: requirement.working_experience.toString() || "",
        working_method: requirement.working_method || "tất cả",
        working_type: requirement.working_type || "tất cả",
        province_id: requirement.province_id || "",
        skills: requirement.skills ? requirement.skills.split(",") : [],
      };

      reset(defaultValues);
    }
  }, [requirement, industries, reset]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  const onSubmitForm = (data) => {
    data.industries = data.industries.map((industry) => industry.id).join(",");
    data.working_experience = parseInt(data.working_experience);
    data.min_salary = parseInt(data.min_salary);

    const province = provinces?.find(
      (province) =>
        parseInt(province.province_id) === parseInt(data.province_id)
    );

    if (!province) {
      // Handle error for province not found
      alert("Invalid province selected.");
      return;
    }

    data.province_id = province ? parseInt(province.province_id) : null;
    data.working_method =
      data.working_method === "tất cả" ? null : data.working_method;
    data.working_type =
      data.working_type === "tất cả" ? null : data.working_type;

    data.skills = data.skills.join(",");

    onSubmit(data);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TitleText variant="h5">Thiết lập gợi ý công việc</TitleText>
            </Grid>
            <Grid item xs={12} md={12}>
              <Controller
                name="min_salary"
                control={control}
                defaultValue=""
                rules={{ required: "Minimum salary is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Mức lương tối thiểu từ (triệu VNĐ)"
                    variant="outlined"
                    size="small"
                    fullWidth
                    error={!!errors.min_salary}
                    helperText={errors.min_salary?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="industries"
                control={control}
                defaultValue={[]}
                rules={{ required: "Industries are required" }}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    multiple
                    value={industriesList}
                    onChange={(event, newValue) => {
                      setIndustriesList(newValue);
                      field.onChange(newValue);
                    }}
                    options={industries}
                    getOptionLabel={(option) => option.industry}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          key={option.id}
                          label={option.industry}
                          {...getTagProps({ index })}
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Ngành nghề/Lĩnh vực"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={!!errors.industries}
                        helperText={errors.industries?.message}
                      />
                    )}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="working_experience"
                control={control}
                defaultValue=""
                rules={{ required: "Working experience is required", min: 0 }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    margin="normal"
                    label="Số năm kinh nghiệm"
                    type="number"
                    error={!!errors.working_experience}
                    helperText={
                      errors.working_experience
                        ? errors.working_experience.message
                        : ""
                    }
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="working_method"
                control={control}
                defaultValue={
                  requirement ? requirement.working_method : "offline"
                }
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    fullWidth
                    margin="normal"
                    label="Phương thức làm việc"
                    error={!!errors.working_method}
                    helperText={
                      errors.working_method ? errors.working_method.message : ""
                    }
                  >
                    {["offline", "remote", "hybrid", "tất cả"].map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="working_type"
                control={control}
                defaultValue={
                  requirement ? requirement.working_type : "fulltime"
                }
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    fullWidth
                    margin="normal"
                    label="Loại hình"
                    error={!!errors.working_type}
                    helperText={
                      errors.working_type ? errors.working_type.message : ""
                    }
                  >
                    {["fulltime", "partime", "tất cả"].map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="province_id"
                control={control}
                defaultValue={requirement ? requirement.province_id : ""}
                rules={{ required: "Province is required" }}
                render={({ field }) => {
                  const selectedProvince = provinces?.find(
                    (province) =>
                      Number(province.province_id) === Number(field.value)
                  );

                  return (
                    <Autocomplete
                      {...field}
                      options={provinces}
                      getOptionLabel={(option) => option.province_name}
                      value={selectedProvince || null}
                      onChange={(event, newValue) => {
                        field.onChange(newValue ? newValue.province_id : "");
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Province"
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          error={!!errors.province_id}
                          helperText={
                            errors.province_id ? errors.province_id.message : ""
                          }
                        />
                      )}
                    />
                  );
                }}
              />
            </Grid>

            {/* Skills Field */}
            <Grid item xs={12}>
              <Controller
                name="skills"
                control={control}
                defaultValue={requirement ? requirement.skills.split(",") : []}
                render={({ field }) => (
                  <TagsInput
                    value={field.value}
                    onChange={field.onChange}
                    error={!!errors.skills}
                    helperText={errors.skills?.message}
                    label="Kỹ năng"
                  />
                )}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button
          type="submit"
          onClick={handleSubmit(onSubmitForm)}
          disabled={!isValid} // Disable button if form is invalid
        >
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ExpectJobUpdateFormDialog;
