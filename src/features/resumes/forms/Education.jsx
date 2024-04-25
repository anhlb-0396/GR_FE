import toast from "react-hot-toast";
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Box, Grid, Fab } from "@mui/material";
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  WorkspacePremium as WorkspacePremiumIcon,
  AccessTime as AccessTimeIcon,
  Grade as GradeIcon,
  School as SchoolIcon,
} from "@mui/icons-material";

import SaveButton from "../../../ui/inputs/SaveButton";
import TitleText from "../../../ui/sharedComponents/TitleText";
import ResumeCard from "../ResumeCard";
import ControlledTextField from "../../../ui/inputs/ControlledTextField";
import { useUserCV } from "../../../contexts/UserCVContext";

function Education() {
  const { state, dispatch } = useUserCV();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      education: state.education,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  const onSubmit = (data) => {
    dispatch({ type: "ADD_EDUCATION", payload: data.education });
    toast.success("Đã lưu thông tin học vấn");
  };

  return (
    <ResumeCard container sx={{ maxWidth: "md", margin: "0 auto" }}>
      <TitleText>Background trình độ học vấn</TitleText>
      <Box
        sx={{
          "& > :not(style)": { m: 1 },
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
        }}
      >
        <Fab
          color="primary"
          aria-label="add"
          size="small"
          sx={{ color: "white" }}
          onClick={() => append({ degree: "", date: "", school: "", gpa: "" })}
        >
          <AddIcon />
        </Fab>
        {fields.length > 1 && (
          <Fab
            color="primary"
            aria-label="remove"
            size="small"
            sx={{ color: "white" }}
            onClick={() => remove(fields.length - 1)}
          >
            <RemoveIcon />
          </Fab>
        )}
      </Box>

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container sx={{ mt: "2rem" }} rowGap={3}>
          {fields.map((field, index) => (
            <React.Fragment key={field.id}>
              <Grid
                container
                item
                xs={12}
                md={4}
                justifyContent="center"
                sx={{ ml: { md: "2rem" } }}
              >
                <ControlledTextField
                  id={`education[${index}].degree`}
                  name={`education[${index}].degree`}
                  label="Tên bằng cấp"
                  register={register}
                  errors={errors}
                  startAdornment={<WorkspacePremiumIcon />}
                />
              </Grid>

              <Grid container item xs={12} md={4} justifyContent="center">
                <ControlledTextField
                  id={`education[${index}].date`}
                  name={`education[${index}].date`}
                  label="Thời gian"
                  register={register}
                  errors={errors}
                  startAdornment={<AccessTimeIcon />}
                />
              </Grid>

              <Grid container item xs={12} md={3.1} justifyContent="center">
                <ControlledTextField
                  id={`education[${index}].gpa`}
                  name={`education[${index}].gpa`}
                  label="GPA trung bình"
                  register={register}
                  errors={errors}
                  startAdornment={<GradeIcon />}
                />
              </Grid>

              <Grid container item xs={12} md={14} justifyContent="center">
                <ControlledTextField
                  id={`education[${index}].school`}
                  name={`education[${index}].school`}
                  label="Trường học / Tổ chức"
                  register={register}
                  errors={errors}
                  startAdornment={<SchoolIcon />}
                />
              </Grid>
            </React.Fragment>
          ))}

          <Grid container item xs={12} md={12} justifyContent="flex-end">
            <SaveButton type="submit" />
          </Grid>
        </Grid>
      </Box>
    </ResumeCard>
  );
}

export default Education;
