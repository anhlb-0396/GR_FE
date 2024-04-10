import { useState } from "react";
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
import TitleText from "./TitleText";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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

const CreateJobForm = ({ onSubmit, isCreating, currentUser, token }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues, // Add getValues from useForm
  } = useForm();

  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

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

  const handleFormSubmit = (data) => {
    const formData = {
      ...data,
      tags,
      company_id: currentUser.company_id,
      token,
    };
    onSubmit(formData);
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
              <ReactQuill>
                <ReactQuill
                  {...field}
                  modules={quillModules}
                  formats={quillFormats}
                  theme="snow"
                />
              </ReactQuill>
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
            name="industry"
            control={control}
            defaultValue=""
            rules={{ required: "Industry is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                margin="normal"
                label="Ngành nghề"
                error={!!errors.industry}
                helperText={errors.industry ? errors.industry.message : ""}
              />
            )}
          />

          <Controller
            name="field"
            control={control}
            defaultValue=""
            rules={{ required: "Field is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                margin="normal"
                label="Lĩnh vực"
                error={!!errors.field}
                helperText={errors.field ? errors.field.message : ""}
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
            disabled={isCreating}
            sx={{ my: "16px" }}
          >
            {isCreating ? "Đang tạo ..." : "Tạo"}
          </Button>
        </form>
      </Grid>
    </Container>
  );
};

export default CreateJobForm;
