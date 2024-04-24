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
} from "@mui/material";
import TitleText from "../../sharedComponents/TitleText";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import provincesData from "../../../data/provincesData";

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
    getValues, // Add getValues from useForm
  } = useForm();

  const [tags, setTags] = useState([]);
  const [industries, setIndustries] = useState([]);
  const navigate = useNavigate();

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
        working_method: job.working_method || "offline", // Set default value if not provided
        working_type: job.working_type || "fulltime", // Set default value if not provided
        expired_date: formattedExpiredDate,
        start_week_day: job.start_week_day || 2,
        end_week_day: job.end_week_day || 6,
        degree: job.degree || "",
        gender: job.gender || "",
        province_id: job.Province.id || "",
      });
      setTags(job.Tags.map((tag) => tag.tag) || []);
      setIndustries(job.Industries.map((industry) => industry.industry) || []);
    }
  }, [job, reset]);

  const handleAddTag = (event) => {
    const newTag = event.target.value.trim();
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      event.target.value = "";
    }
  };

  const handleRemoveTag = (index) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
  };

  const handleAddIndustry = (event) => {
    const newIndustry = event.target.value.trim();
    if (newIndustry && !industries.includes(newIndustry)) {
      setIndustries([...industries, newIndustry]);
      event.target.value = "";
    }
  };

  const handleRemoveIndustry = (index) => {
    const updatedIndustries = industries.filter((_, i) => i !== index);
    setIndustries(updatedIndustries);
  };

  const handleFormSubmit = async (data) => {
    const formData = {
      ...data,
      tags,
      industries,
      company_id: currentUser.company_id,
      job_id: job.id,
      token,
    };

    console.log(formData);

    return;

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

          {/* Tags field */}
          <TextField
            fullWidth
            margin="normal"
            label="Ngành nghề"
            placeholder="Nhập và nhấn enter"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddIndustry(e);
              }
            }}
          />
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {industries.map((industry, index) => (
              <Chip
                key={index}
                label={industry}
                onDelete={() => handleRemoveIndustry(index)}
                style={{ marginRight: "8px", marginBottom: "8px" }}
              />
            ))}
          </div>

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
            defaultValue={new Date().toISOString().split("T")[0]} // Set today's date as default
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
                {["male", "female"].map((option) => (
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
            render={({ field }) => (
              <TextField
                {...field}
                select
                fullWidth
                margin="normal"
                label="Province"
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

          {/* Tags field */}
          <TextField
            fullWidth
            margin="normal"
            label="Tags"
            placeholder="Enter tags and press Enter"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddTag(e);
              }
            }}
          />
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                onDelete={() => handleRemoveTag(index)}
                style={{ marginRight: "8px", marginBottom: "8px" }}
              />
            ))}
          </div>

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
