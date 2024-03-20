import { useForm } from "react-hook-form";
import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import ResumeCard from "../ResumeCard";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";

import TitleText from "../../../ui/inputs/TitleText";
import SaveButton from "../../../ui/inputs/SaveButton";

import ControlledTextField from "../../../ui/inputs/ControlledTextField";

import { useFieldArray } from "react-hook-form";
import React from "react";

// function Skills() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const [count, setCount] = useState(2);

//   const onSubmit = (data) => {
//     console.log(data);
//   };

//   const handleAdd = () => {
//     if (count < 5) setCount(count + 1);
//   };

//   const handleRemove = () => {
//     if (count > 1) setCount(count - 1);
//   };

//   return (
//     <ResumeCard container sx={{ maxWidth: "md", margin: "0 auto" }}>
//       <TitleText>Kĩ năng cá nhân</TitleText>

//       <Box component="form" onSubmit={handleSubmit(onSubmit)}>
//         <Grid container sx={{ mt: "2rem" }} rowGap={3}>
//           {Array.from({ length: count }, (_, index) => index).map((index) => (
//             <>
//               <Grid container item xs={12} md={6} justifyContent="center">
//                 <ControlledTextField
//                   id={`skill_title[${index}]`}
//                   name={`skill_title[${index}]`}
//                   label="Kĩ năng"
//                   register={register}
//                   errors={errors}
//                   startAdornment={<HomeRepairServiceIcon />}
//                 />
//               </Grid>

//               <Grid container item xs={12} md={6} justifyContent="center">
//                 <ControlledTextField
//                   id={`skill_description[${index}]`}
//                   name={`skill_description[${index}]`}
//                   label="Mô tả chi tiết"
//                   register={register}
//                   errors={errors}
//                 />
//               </Grid>
//             </>
//           ))}

//           <Box
//             sx={{
//               "& > :not(style)": { m: 1 },
//               display: "flex",
//               justifyContent: "center",
//               width: "100%",
//             }}
//           >
//             <Fab
//               color="primary"
//               aria-label="add"
//               size="small"
//               sx={{ color: "white" }}
//               onClick={handleAdd}
//             >
//               <AddIcon />
//             </Fab>
//             <Fab
//               color="primary"
//               aria-label="remove"
//               size="small"
//               sx={{ color: "white" }}
//               onClick={handleRemove}
//             >
//               <RemoveIcon />
//             </Fab>
//           </Box>

//           <Grid container item xs={12} md={12} justifyContent="flex-end">
//             <SaveButton type="submit" />
//           </Grid>
//         </Grid>
//       </Box>
//     </ResumeCard>
//   );
// }

function Skills() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      skills: [{ title: "", description: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  const onSubmit = (data) => {
    console.log(data);
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
          onClick={() => append({ title: "", description: "" })}
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
                  id={`skills[${index}].title`}
                  name={`skills[${index}].title`}
                  label="Kĩ năng"
                  register={register}
                  errors={errors}
                  startAdornment={<HomeRepairServiceIcon />}
                />
              </Grid>

              <Grid container item xs={12} md={7} justifyContent="center">
                <ControlledTextField
                  id={`skills[${index}].description`}
                  name={`skills[${index}].description`}
                  label="Mô tả chi tiết"
                  register={register}
                  errors={errors}
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
