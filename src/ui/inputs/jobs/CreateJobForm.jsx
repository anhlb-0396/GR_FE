import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Grid,
  MenuItem,
  Chip,
  Autocomplete,
} from "@mui/material";
import TitleText from "../../sharedComponents/TitleText";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { quillModules, quillFormats } from "../../../constants/quill";
import provinces from "../../../data/provincesData";
import { useIndustries } from "../../../features/industries/useIndustries";
import { useTags } from "../../../features/tags/useTags";

const CreateJobForm = ({ onSubmit, isCreating, currentUser, token }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const [industriesList, setIndustriesList] = useState([]);
  const navigate = useNavigate();
  const { industries, isLoading, isError } = useIndustries();
  const {
    tags: availableTags,
    isLoading: isTagsLoading,
    isError: isTagsError,
  } = useTags();

  if (isLoading || isTagsLoading) return <div>Loading...</div>;
  if (isError || isTagsError) return <div>Error...</div>;

  const handleFormSubmit = async (data) => {
    const transformedIndustriesList = industriesList.map((item) =>
      typeof item === "string" ? item : item.industry
    );

    const formData = {
      ...data,
      tags: data.tags.map((tag) => (typeof tag === "string" ? tag : tag.tag)),
      company_id: currentUser.company_id,
      industries: transformedIndustriesList,
      token,
      gender:
        data.gender === "Tất cả"
          ? null
          : data.gender === "Nam"
          ? "male"
          : "female",
    };

    await onSubmit(formData);
    navigate("/agent/jobs");
  };

  const handleFormKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <Container maxWidth="sm">
      <TitleText variant="h4" gutterBottom>
        Tạo công việc mới
      </TitleText>
      <Grid container spacing={2} style={{ marginTop: "16px" }}>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          onKeyDown={handleFormKeyDown}
        >
          <Controller
            name="title"
            control={control}
            defaultValue=""
            rules={{ required: "Title is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                margin="normal"
                label="Tên công việc"
                error={!!errors.title}
                helperText={errors.title ? errors.title.message : ""}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            defaultValue=""
            rules={{ required: "Description is required" }}
            render={({ field }) => (
              <ReactQuill
                {...field}
                modules={quillModules}
                formats={quillFormats}
                theme="snow"
              />
            )}
          />
          <Controller
            name="min_salary"
            control={control}
            defaultValue=""
            rules={{ required: "Minimum salary is required", min: 0 }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                margin="normal"
                label="Lương tối thiểu"
                type="number"
                error={!!errors.min_salary}
                helperText={errors.min_salary ? errors.min_salary.message : ""}
              />
            )}
          />
          <Controller
            name="max_salary"
            control={control}
            defaultValue=""
            rules={{
              required: "Maximum salary is required",
              min: {
                value: 0,
                message: "Salary must be greater than or equal to 0",
              },
              validate: (value) =>
                value > getValues("min_salary") ||
                "Max salary must be greater than min salary",
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                margin="normal"
                label="Lương tối đa"
                type="number"
                error={!!errors.max_salary}
                helperText={errors.max_salary ? errors.max_salary.message : ""}
              />
            )}
          />

          <Controller
            name="recruitment_number"
            control={control}
            defaultValue=""
            rules={{ required: "Recruitment number is required", min: 1 }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                margin="normal"
                label="Số lượng tuyển dụng"
                type="number"
                error={!!errors.recruitment_number}
                helperText={
                  errors.recruitment_number
                    ? errors.recruitment_number.message
                    : ""
                }
              />
            )}
          />

          <Controller
            name="industries"
            control={control}
            rules={{ required: "Ngành nghề/Lĩnh vực là bắt buộc" }}
            render={({ field: { value, onChange, ...other } }) => (
              <Autocomplete
                {...other}
                multiple
                freeSolo
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
                        typeof option === "string" ? option : option.id || index
                      }
                      label={
                        typeof option === "string" ? option : option.industry
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
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && event.target.value) {
                        const newIndustry = event.target.value;
                        const newIndustryObject = {
                          id: newIndustry.toLowerCase().replace(/\s/g, "_"),
                          industry: newIndustry,
                        };

                        const isDuplicate = (value || []).some(
                          (item) =>
                            (typeof item === "string"
                              ? item
                              : item.industry) === newIndustry
                        );

                        if (!isDuplicate) {
                          const updatedValue = [
                            ...(value || []),
                            newIndustryObject,
                          ];
                          const uniqueValues = updatedValue.filter(
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
                        }

                        event.preventDefault();
                        event.target.value = "";
                      }
                    }}
                  />
                )}
              />
            )}
          />

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

          <Controller
            name="working_method"
            control={control}
            defaultValue="offline"
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
                {["offline", "remote", "hybrid"].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            name="working_type"
            control={control}
            defaultValue="fulltime"
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
                {["fulltime", "partime"].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            name="expired_date"
            control={control}
            defaultValue={new Date().toISOString().split("T")[0]}
            rules={{
              required: "Expired date is required",
              validate: (value) =>
                new Date(value) > new Date() ||
                "Expired date must be after today",
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                margin="normal"
                label="Hạn ứng tuyển đến"
                type="date"
                error={!!errors.expired_date}
                helperText={
                  errors.expired_date ? errors.expired_date.message : ""
                }
              />
            )}
          />

          <Controller
            name="start_week_day"
            control={control}
            defaultValue={2}
            rules={{
              required: "Start week day is required",
              min: {
                value: 2,
                message: "Start week day must be between 2 and 8",
              },
              max: {
                value: 8,
                message: "Start week day must be between 2 and 8",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                margin="normal"
                label="Start Week Day"
                type="number"
                error={!!errors.start_week_day}
                helperText={
                  errors.start_week_day ? errors.start_week_day.message : ""
                }
              />
            )}
          />

          <Controller
            name="end_week_day"
            control={control}
            defaultValue={6}
            rules={{
              required: "End week day is required",
              min: {
                value: 2,
                message: "End week day must be between 2 and 8",
              },
              max: {
                value: 8,
                message: "End week day must be between 2 and 8",
              },
              validate: (value) =>
                value > getValues("start_week_day") ||
                "End week day must be greater than start week day",
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                margin="normal"
                label="End Week Day"
                type="number"
                error={!!errors.end_week_day}
                helperText={
                  errors.end_week_day ? errors.end_week_day.message : ""
                }
              />
            )}
          />

          <Controller
            name="degree"
            control={control}
            defaultValue="Nhân viên"
            rules={{ required: "Degree is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                select
                fullWidth
                margin="normal"
                label="Degree"
                error={!!errors.degree}
                helperText={errors.degree ? errors.degree.message : ""}
              >
                {[
                  "Thực tập sinh",
                  "Nhân viên",
                  "Trưởng nhóm",
                  "Giám đốc",
                  "Tổng giám đốc",
                ].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            name="gender"
            control={control}
            defaultValue=""
            rules={{ required: "Gender is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                select
                fullWidth
                margin="normal"
                label="Gender"
                error={!!errors.gender}
                helperText={errors.gender ? errors.gender.message : ""}
              >
                {["Nam", "Nữ", "Tất cả"].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            name="province_id"
            control={control}
            defaultValue={null}
            rules={{ required: "Province is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                select
                fullWidth
                margin="normal"
                label="Tỉnh thành"
                error={!!errors.province_id}
                helperText={
                  errors.province_id ? errors.province_id.message : ""
                }
              >
                {provinces.map((province) => (
                  <MenuItem
                    key={province.province_id}
                    value={province.province_id}
                  >
                    {province.province_name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            name="tags"
            control={control}
            defaultValue={[]} // Add a default value here
            render={({ field: { value, onChange, ...other } }) => (
              <Autocomplete
                {...other}
                multiple
                freeSolo
                value={value || []}
                onChange={(event, newValue) => {
                  const uniqueValues = newValue.filter(
                    (option, index, self) =>
                      index ===
                      self.findIndex(
                        (t) =>
                          (typeof t === "string" ? t : t.tag) ===
                          (typeof option === "string" ? option : option.tag)
                      )
                  );
                  onChange(uniqueValues);
                }}
                options={availableTags}
                getOptionLabel={(option) =>
                  typeof option === "string" ? option : option.tag
                }
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      key={
                        typeof option === "string" ? option : option.id || index
                      }
                      label={typeof option === "string" ? option : option.tag}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tags"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={!!errors.tags}
                    helperText={errors.tags?.message}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && event.target.value) {
                        const newTag = event.target.value.trim();
                        if (newTag) {
                          const isDuplicate = (value || []).some(
                            (item) =>
                              (typeof item === "string" ? item : item.tag) ===
                              newTag
                          );

                          if (!isDuplicate) {
                            const updatedValue = [...(value || []), newTag];
                            const uniqueValues = updatedValue.filter(
                              (option, index, self) =>
                                index ===
                                self.findIndex(
                                  (t) =>
                                    (typeof t === "string" ? t : t.tag) ===
                                    (typeof option === "string"
                                      ? option
                                      : option.tag)
                                )
                            );
                            onChange(uniqueValues);
                          }

                          event.preventDefault();
                          event.target.value = "";
                        }
                      }
                    }}
                  />
                )}
              />
            )}
          />

          <Controller
            name="images"
            control={control}
            defaultValue={[]}
            rules={{
              validate: (value) => {
                if (value.length > 3) {
                  return "Maximum 3 images allowed";
                }
                return true;
              },
            }}
            render={({ field }) => (
              <TextField
                fullWidth
                margin="normal"
                type="file"
                InputLabelProps={{ shrink: true }}
                inputProps={{ multiple: true, accept: "image/*" }}
                onChange={(e) => field.onChange(e.target.files)}
                label="Ảnh minh họa công việc (tối đa 3 ảnh)"
                error={!!errors.images}
                helperText={errors.images ? errors.images.message : ""}
              />
            )}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isCreating}
            sx={{ my: "16px", color: "white" }}
          >
            {isCreating ? "Đang tạo ..." : "Tạo"}
          </Button>
        </form>
      </Grid>
    </Container>
  );
};

export default CreateJobForm;
