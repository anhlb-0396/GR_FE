import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Container, Avatar, Box, Grid } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import TitleText from "../../ui/sharedComponents/TitleText";

const Profile = () => {
  const { currentUser } = useAuth();
  const { register, handleSubmit, setValue, control } = useForm();

  // Set default values for form fields when currentUser changes
  useEffect(() => {
    if (currentUser) {
      setValue("name", currentUser.name || "");
      setValue("gmail", currentUser.gmail || "");
      setValue("role", currentUser.role || "");
      setValue("date_of_birth", currentUser.date_of_birth || "");
    }
  }, [currentUser, setValue]);

  const onSubmit = (data) => {
    const formDataWithAvatar = { ...data };
    console.log(formDataWithAvatar);
  };

  return (
    <Container maxWidth="sm">
      <TitleText>Thông tin cá nhân</TitleText>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          direction="column"
          alignItems="center"
          spacing={2}
          mt={2}
        >
          <Grid item>
            <Box position="relative">
              <Avatar
                src={currentUser?.avatar || "/default-avatar.jpg"} // Default avatar image
                alt="Avatar"
                sx={{ width: 100, height: 100 }}
              />
              <input
                {...register("avatar", {
                  validate: (value) => value && value[0].size <= 1048576, // Validate size <= 1MB
                })}
                type="file"
                accept="image/*"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  opacity: 0,
                  cursor: "pointer",
                }}
              />
            </Box>
          </Grid>
          <Grid item>
            <TextField
              {...register("name")}
              label="Name"
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              {...register("gmail")}
              label="Gmail"
              fullWidth
              margin="normal"
              variant="outlined"
              InputProps={{ readOnly: true }}
            />
            <TextField
              {...register("role")}
              label="Role"
              fullWidth
              margin="normal"
              variant="outlined"
              InputProps={{ readOnly: true }}
            />
            <TextField
              {...register("date_of_birth")}
              label="Date of Birth"
              type="date"
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained" color="primary">
              Lưu
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Profile;
