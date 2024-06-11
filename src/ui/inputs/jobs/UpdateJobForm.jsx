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
import provincesData from "../../../data/provincesData";
import { useTags } from "../../../features/tags/useTags";
import { useIndustries } from "../../../features/industries/useIndustries";

const provinces = provincesData.map((province) => ({
  province_id: Number(province.province_id),
  province_name: province.province_name,
}));

const quillModules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["clean"],
  ],
};

const quillFormats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
];

const UpdateJobForm = ({ onSubmit, isUpdating, currentUser, token, job }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm();
  const [industriesList, setIndustriesList] = useState([]);
  const [tagsList, setTagsList] = useState([]);
  const navigate = useNavigate();
  const {
    industries,
    isLoading: isIndustriesLoading,
    isError: isIndustriesError,
  } = useIndustries();
  const {
    tags: availableTags,
    isLoading: isTagsLoading,
    isError: isTagsError,
  } = useTags();

  useEffect(() => {
    if (job) {
      const formattedExpiredDate = job.expired_date
        ? job.expired_date.split("T")[0]
        : new Date().toISOString().split("T")[0];
      reset({
        title: job.title || "",
        description: job.description || "",
        min_salary: job.min_salary || "",
        max_salary: job.max_salary || "",
        recruitment_number: job.recruitment_number || "",
        working_experience: job.working_experience || "",
        working_method: job.working_method || "offline",
        working_type: job.working_type || "fulltime",
        expired_date: formattedExpiredDate,
        start_week_day: job.start_week_day || 2,
        end_week_day: job.end_week_day || 6,
        degree: job.degree || "",
        gender: !job.gender ? "Tất cả" : job.gender === "male" ? "Nam" : "Nữ",
        province_id: job.Province.id || "",
        industries: job.Industries.map((industry) => industry.industry) || [],
        tags: job.Tags.map((tag) => tag.tag) || [],
      });

      // Set the initial values for industriesList and tagsList
      setIndustriesList(
        job.Industries.map((industry) => industry.industry) || []
      );
      setTagsList(job.Tags.map((tag) => tag.tag) || []);
    }
  }, [job, reset]);

  const handleFormSubmit = async (data) => {
    const transformedIndustriesList = industriesList.map((item) =>
      typeof item === "string" ? item : item.industry
    );

    const transformedTagsList = tagsList.map((item) =>
      typeof item === "string" ? item : item.tag
    );

    const formData = {
      ...data,
      tags: transformedTagsList,
      industries: transformedIndustriesList,
      company_id: currentUser.company_id,
      job_id: job.id,
      gender:
        data.gender === "Tất cả"
          ? null
          : data.gender === "Nam"
          ? "male"
          : "female",
      token,
    };

    await onSubmit(formData);
    navigate("/agent/jobs");
  };

  const handleFormKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  console.log(job);

  if (isIndustriesLoading || isTagsLoading) return <div>Loading...</div>;
  if (isIndustriesError || isTagsError) return <div>Error...</div>;

  return (
    <Container maxWidth="sm">
      <TitleText variant="h4" gutterBottom>
        Cập nhật lại thông tin công việc
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
            defaultValue={job ? job.working_method : "offline"}
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
            defaultValue={job ? job.working_type : "fulltime"}
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
            defaultValue={job ? job.degree : "Nhân viên"}
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
            defaultValue={
              !job.gender ? "Tất cả" : job.gender === "male" ? "Nam" : "Nữ"
            }
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
            rules={{ required: "Province is required" }}
            defaultValue={job ? job.province_id : ""}
            render={({ field }) => {
              const selectedProvince = provinces.find(
                (province) => province.province_id === field.value
              );

              return (
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
                      selected={job && job.province_id === province.province_id}
                    >
                      {province.province_name}
                    </MenuItem>
                  ))}
                </TextField>
              );
            }}
          />

          {/* Industries field */}
          <Controller
            name="industries"
            control={control}
            defaultValue={
              job ? job.Industries.map((industry) => industry.industry) : []
            }
            rules={{ required: "Industries are required" }}
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
                  onChange(uniqueValues);
                  setIndustriesList(uniqueValues);
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
                    label="Industries"
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
                          onChange(uniqueValues);
                          setIndustriesList(uniqueValues);
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

          {/* Tags field */}
          <Controller
            name="tags"
            control={control}
            defaultValue={job ? job.Tags.map((tag) => tag.tag) : []}
            rules={{ required: "Tags are required" }}
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
                  setTagsList(uniqueValues);
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
                            setTagsList(uniqueValues);
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

          {/* Image upload field */}
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
            disabled={isUpdating}
            sx={{ my: "16px" }}
          >
            {isUpdating ? "Đang Sửa ..." : "Sửa"}
          </Button>
        </form>
      </Grid>
    </Container>
  );
};

export default UpdateJobForm;
