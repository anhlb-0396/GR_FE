import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Container, Avatar, Box, Grid } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import TitleText from "../../ui/sharedComponents/TitleText";
import { useUpdateProfile } from "./userUpdateProfile";

const Profile = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const { register, handleSubmit, setValue, control } = useForm();
  const { updateUserProfile, isUpdating } = useUpdateProfile(currentUser.id);

  useEffect(() => {
    if (currentUser) {
      setValue("name", currentUser.name || "");
      setValue("gmail", currentUser.gmail || "");
      setValue("role", currentUser.role || "");

      // Convert and set the date_of_birth value
      const formattedDateOfBirth = currentUser.date_of_birth
        ? new Date(currentUser.date_of_birth).toISOString().split("T")[0]
        : "";
      setValue("date_of_birth", formattedDateOfBirth || "");
    }
  }, [currentUser, setValue]);

  const onSubmit = (data) => {
    const avatarFile = data.avatar[0];
    const formDataWithAvatar = {
      ...data,
      avatar: avatarFile,
      userId: currentUser.id,
    };
    updateUserProfile(formDataWithAvatar);
    setCurrentUser({ ...currentUser, ...data });
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
                src={currentUser?.avatar || "/default-avatar.jpg"}
                alt="Avatar"
                sx={{ width: 100, height: 100 }}
              />
              <input
                {...register("avatar")}
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isUpdating}
            >
              Lưu
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Profile;
