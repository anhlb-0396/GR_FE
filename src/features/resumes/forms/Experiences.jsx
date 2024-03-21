import { useForm, useFieldArray } from "react-hook-form";
import React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import ResumeCard from "../ResumeCard";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WorkIcon from "@mui/icons-material/Work";

import TitleText from "../../../ui/inputs/TitleText";
import SaveButton from "../../../ui/inputs/SaveButton";

import ControlledTextField from "../../../ui/inputs/ControlledTextField";
import { useUserCV } from "../../../contexts/UserCVContext";

function Experiences() {
  const { state, dispatch } = useUserCV();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      experience: [{ title: "", date: "", description: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience",
  });

  const onSubmit = (data) => {
    dispatch({ type: "ADD_EXPERIENCES", payload: data.experience });
  };

  return (
    <ResumeCard container sx={{ maxWidth: "md", margin: "0 auto" }}>
      <TitleText>Kinh nghiệm hoặc dự án thực tế đã làm</TitleText>
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
                md={6}
                justifyContent="center"
                sx={{ ml: { md: "1.4rem" } }}
              >
                <ControlledTextField
                  id={`experience[${index}].title`}
                  name={`experience[${index}].title`}
                  label="Tên chức vụ"
                  register={register}
                  errors={errors}
                  startAdornment={<HomeRepairServiceIcon />}
                />
              </Grid>

              <Grid container item xs={12} md={5.35} justifyContent="center">
                <ControlledTextField
                  id={`experience[${index}].date`}
                  name={`experience[${index}].date`}
                  label="Thời gian"
                  register={register}
                  errors={errors}
                  startAdornment={<AccessTimeIcon />}
                />
              </Grid>

              <Grid container item xs={12} md={12} justifyContent="center">
                <ControlledTextField
                  id={`experience[${index}].description`}
                  name={`experience[${index}].description`}
                  label="Mô tả dự án / công việc chi tiết"
                  register={register}
                  errors={errors}
                  startAdornment={<WorkIcon />}
                  multipleline
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

export default Experiences;
