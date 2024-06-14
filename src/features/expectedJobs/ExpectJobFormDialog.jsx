import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  Chip,
  Autocomplete,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import CustomAutoComplete from "../../ui/inputs/CustomAutoComplete";
import provinces from "../../data/provincesData";
import TitleText from "../../ui/sharedComponents/TitleText";
import TagsInput from "../../ui/inputs/TagsInput";
import { useIndustries } from "../industries/useIndustries";

function ExpectJobFormDialog({ open, onClose, onSubmit, initialValues = {} }) {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  });

  const { industries, isLoading, isError } = useIndustries();
  const [industriesList, setIndustriesList] = useState(
    initialValues.industries || []
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  const years = Array.from({ length: 6 }, (_, i) =>
    i > 0 ? `${i} năm` : `0 yêu cầu kinh nghiệm`
  );

  const onSubmitForm = (data) => {
    data.industries = data.industries.map((industry) => industry.id).join(",");
    data.working_experience = parseInt(data.working_experience);
    data.min_salary = parseInt(data.min_salary);
    const selectedProvince = data.province_id;
    const province = provinces.find(
      (province) => province.province_name === selectedProvince
    );
    data.province_id = province ? parseInt(province.province_id) : null;
    data.working_method =
      data.working_method === "tất cả" ? null : data.working_method;
    data.working_type =
      data.working_type === "tất cả" ? null : data.working_type;

    onSubmit(data);
    onClose();
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
                rules={{ required: "Mức lương tối thiểu là bắt buộc" }}
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
                rules={{ required: "Ngành nghề/Lĩnh vực là bắt buộc" }}
                render={({ field: { value, onChange, ...other } }) => (
                  <Autocomplete
                    {...other}
                    multiple
                    value={value || []}
                    onChange={(event, newValue) => {
                      const uniqueValues = newValue.filter(
                        (option, index, self) =>
                          index ===
                          self.findIndex(
                            (t) =>
                              (typeof t === "string" ? t : t.industry) ===
                              (typeof option === "string"
                                ? option
                                : option.industry)
                          )
                      );
                      setIndustriesList(uniqueValues);
                      onChange(uniqueValues);
                    }}
                    options={industries}
                    getOptionLabel={(option) =>
                      typeof option === "string" ? option : option.industry
                    }
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          key={
                            typeof option === "string"
                              ? option
                              : option.id || index
                          }
                          label={
                            typeof option === "string"
                              ? option
                              : option.industry
                          }
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
            <CustomAutoComplete
              name="working_experience"
              control={control}
              setValue={setValue}
              options={years}
              label="Kinh nghiệm làm việc"
              xs={12}
              md={12}
              rules={{ required: "Kinh nghiệm làm việc là bắt buộc" }}
              error={!!errors.working_experience}
              helperText={errors.working_experience?.message}
            />
            <CustomAutoComplete
              name="working_method"
              control={control}
              setValue={setValue}
              options={["offline", "remote", "hybrid", "tất cả"]}
              label="Hình thức làm việc"
              xs={12}
              md={4}
              rules={{ required: "Hình thức làm việc là bắt buộc" }}
              error={!!errors.working_method}
              helperText={errors.working_method?.message}
            />
            <CustomAutoComplete
              name="working_type"
              control={control}
              setValue={setValue}
              options={["fulltime", "partime", "tất cả"]}
              label="Loại công việc"
              xs={12}
              md={4}
              rules={{ required: "Loại công việc là bắt buộc" }}
              error={!!errors.working_type}
              helperText={errors.working_type?.message}
            />
            <CustomAutoComplete
              name="province_id"
              control={control}
              setValue={setValue}
              options={provinces.map((province) => province.province_name)}
              label="Tỉnh/Thành phố"
              xs={12}
              md={4}
              rules={{ required: "Tỉnh/Thành phố là bắt buộc" }}
              error={!!errors.province_id}
              helperText={errors.province_id?.message}
            />
            <Grid item xs={12}>
              <Controller
                name="skills"
                control={control}
                defaultValue=""
                // rules={{ required: "Kỹ năng là bắt buộc" }}
                render={() => (
                  <TagsInput
                    control={control}
                    setValue={setValue}
                    initialSkills={initialValues.skills}
                    // error={!!errors.skills}
                    // helperText={errors.skills?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button type="submit" onClick={handleSubmit(onSubmitForm)}>
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ExpectJobFormDialog;
