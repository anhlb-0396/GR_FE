import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Grid, MenuItem } from "@mui/material";
import TitleText from "../../sharedComponents/TitleText";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { quillModules, quillFormats } from "../../../constants/quill";
import provinces from "../../../data/provincesData";

const CreateCompanyForm = ({ onSubmit, isCreating, currentUser, token }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const navigate = useNavigate();

  const handleFormSubmit = async (data) => {
    // Handle the form submission, including transforming data if necessary
    // await onSubmit(data);
    console.log(data);
    return;
    navigate("/agent/company");
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
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                margin="normal"
                label="Tên công ty"
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
                label="Địa chỉ công ty"
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
                helperText={
                  errors.employees ? errors.recruitment_number.employees : ""
                }
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
                label="Website công ty"
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
                label="Email công ty"
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
                label="Logo công ty"
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
                label="Ảnh bìa công ty"
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
