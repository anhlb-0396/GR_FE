import React from "react";
import {
  Box,
  Button,
  IconButton,
  TextField,
  Card,
  CardContent,
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { useAuth } from "../../../contexts/AuthContext";
import { useCreatePdfResume } from "../userCreateResume";

function ResumeUploadForm() {
  const { currentUser } = useAuth();
  const { isCreating, createPdfResume } = useCreatePdfResume(currentUser.id);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("resumeFile", data.resumeFile);
    formData.append("userId", currentUser.id);

    createPdfResume(formData);
  };

  const validateFileSize = (file) => {
    const maxSize = 5 * 1024 * 1024;
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
                <React.Fragment>
                  <TextField
                    fullWidth
                    margin="normal"
                    type="file"
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ accept: ".pdf" }}
                    onChange={(e) => field.onChange(e.target.files[0])}
                    error={!!errors.resumeFile}
                    helperText={
                      errors.resumeFile ? errors.resumeFile.message : ""
                    }
                    label="Upload Resume"
                  />
                  <label htmlFor="upload-button">
                    <IconButton component="span">
                      <CloudUpload />
                      Upload Resume
                    </IconButton>
                  </label>
                </React.Fragment>
              )}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isCreating}
            >
              Submit
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
}

export default ResumeUploadForm;
