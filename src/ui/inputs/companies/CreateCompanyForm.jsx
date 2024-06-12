import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Grid, MenuItem } from "@mui/material";
import TitleText from "../../sharedComponents/TitleText";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { quillModules, quillFormats } from "../../../constants/quill";
import provinces from "../../../data/provincesData";

const CreateCompanyForm = ({
  onSubmit,
  isCreating,
  currentUser,
  token,
  handleLogout,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const handleFormSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("location", data.location);
    formData.append("country", data.country);
    formData.append("introduction", data.introduction);
    formData.append("employees", data.employees);
    formData.append("website", data.website);
    formData.append("contact_mail", data.contact_mail);
    formData.append("province_id", data.province_id);
    formData.append("logo", data.logo);
    formData.append("cover_image", data.cover_image);
    formData.append("agent_id", currentUser.id);

    await onSubmit(formData);
    handleLogout();
  };

  const handleFormKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <Container maxWidth="sm">
      <TitleText variant="h4" gutterBottom>
        Tạo doanh nghiệp mới
      </TitleText>
      <Grid container spacing={2} style={{ marginTop: "16px" }}>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          onKeyDown={handleFormKeyDown}
        >
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                margin="normal"
                label="Tên doanh nghiệp"
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ""}
              />
            )}
          />

          <Controller
            name="location"
            control={control}
            defaultValue=""
            rules={{ required: "Location is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                margin="normal"
                label="Địa chỉ doanh nghiệp"
                error={!!errors.location}
                helperText={errors.location ? errors.location.message : ""}
              />
            )}
          />

          <Controller
            name="country"
            control={control}
            defaultValue=""
            rules={{ required: "Country is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                margin="normal"
                label="Quốc gia"
                error={!!errors.country}
                helperText={errors.country ? errors.country.message : ""}
              />
            )}
          />

          <Controller
            name="introduction"
            control={control}
            defaultValue=""
            rules={{ required: "Introduction is required" }}
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
            name="employees"
            control={control}
            defaultValue=""
            rules={{ required: "Employees number is required", min: 1 }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                margin="normal"
                label="Số lượng nhân viên"
                type="number"
                error={!!errors.employees}
                helperText={errors.employees ? errors.employees.message : ""}
              />
            )}
          />

          <Controller
            name="website"
            control={control}
            defaultValue=""
            rules={{ required: "Website is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                margin="normal"
                label="Website doanh nghiệp"
                error={!!errors.website}
                helperText={errors.website ? errors.website.message : ""}
              />
            )}
          />

          <Controller
            name="contact_mail"
            control={control}
            defaultValue=""
            rules={{ required: "Mail is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                margin="normal"
                label="Email doanh nghiệp"
                error={!!errors.contact_mail}
                helperText={
                  errors.contact_mail ? errors.contact_mail.message : ""
                }
              />
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
            name="logo"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <TextField
                fullWidth
                margin="normal"
                type="file"
                InputLabelProps={{ shrink: true }}
                inputProps={{ accept: "image/*" }}
                onChange={(e) => field.onChange(e.target.files[0])}
                label="Logo doanh nghiệp"
                error={!!errors.logo}
                helperText={errors.logo ? errors.logo.message : ""}
              />
            )}
          />

          <Controller
            name="cover_image"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <TextField
                fullWidth
                margin="normal"
                type="file"
                InputLabelProps={{ shrink: true }}
                inputProps={{ accept: "image/*" }}
                onChange={(e) => field.onChange(e.target.files[0])}
                label="Ảnh bìa doanh nghiệp"
                error={!!errors.cover_image}
                helperText={
                  errors.cover_image ? errors.cover_image.message : ""
                }
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

export default CreateCompanyForm;
