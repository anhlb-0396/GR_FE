import {
  Box,
  Button,
  IconButton,
  TextField,
  Card,
  CardContent,
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material"; // Import CloudUpload icon
import { useForm, Controller } from "react-hook-form";

function ResumeUploadForm({ onSubmit }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("resumeFile", data.resumeFile[0]);

    console.log(formData);
    return;
    onSubmit(data);
  };

  // Custom validation rule to check file size
  const validateFileSize = (file) => {
    console.log(file);
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      return "File size must be less than 5MB";
    }
    return true;
  };

  return (
    <Card variant="outlined" sx={{ maxWidth: "300px", margin: "0 auto" }}>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Đặt tên cho CV"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name ? errors.name.message : ""}
                  size="small"
                />
              )}
            />
            <Controller
              name="resumeFile"
              control={control}
              defaultValue=""
              rules={{
                required: "Resume file is required",
                validate: validateFileSize, // Add custom validation rule
              }}
              render={({ field }) => (
                <input
                  {...field}
                  id="upload-button" // Assign id for label association
                  type="file"
                  accept=".pdf"
                />
              )}
            />
            <label htmlFor="upload-button">
              <IconButton component="span">
                <CloudUpload />
                Upload Resume
              </IconButton>
            </label>
            {errors.resumeFile && (
              <span style={{ color: "red" }}>{errors.resumeFile.message}</span>
            )}
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
}

export default ResumeUploadForm;
