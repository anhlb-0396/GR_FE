import { useForm, useFieldArray } from "react-hook-form";
import React from "react";
import toast from "react-hot-toast";
import { Box, Grid, Fab } from "@mui/material";
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  BorderColor as BorderColorIcon,
  HomeRepairService as HomeRepairServiceIcon,
} from "@mui/icons-material";

import ResumeCard from "../ResumeCard";
import TitleText from "../../../ui/sharedComponents/TitleText";
import SaveButton from "../../../ui/inputs/SaveButton";
import ControlledTextField from "../../../ui/inputs/ControlledTextField";
import { useUserCV } from "../../../contexts/UserCVContext";

function Skills() {
  const { state, dispatch } = useUserCV();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      skills: state.skills,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  const onSubmit = (data) => {
    dispatch({ type: "ADD_SKILLS", payload: data.skills });
    toast.success("Đã lưu kĩ năng cá nhân");
  };

  return (
    <ResumeCard container sx={{ maxWidth: "md", margin: "0 auto" }}>
      <TitleText>Kĩ năng cá nhân</TitleText>
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
          onClick={() => append({ category: "", skills: "" })}
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
              <Grid container item xs={12} md={5} justifyContent="center">
                <ControlledTextField
                  id={`skills[${index}].category`}
                  name={`skills[${index}].category`}
                  label="Kĩ năng"
                  register={register}
                  errors={errors}
                  startAdornment={<HomeRepairServiceIcon />}
                />
              </Grid>

              <Grid container item xs={12} md={7} justifyContent="center">
                <ControlledTextField
                  id={`skills[${index}].skills`}
                  name={`skills[${index}].skills`}
                  label="Mô tả chi tiết"
                  register={register}
                  errors={errors}
                  startAdornment={<BorderColorIcon />}
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

export default Skills;
