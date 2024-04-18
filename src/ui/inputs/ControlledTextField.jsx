import { TextField, InputAdornment } from "@mui/material";

const ControlledTextField = ({
  id,
  name,
  label,
  register,
  errors,
  startAdornment,
  ...rest
}) => {
  return (
    <TextField
      id={id}
      {...register(name, { required: `${label} is required` })}
      label={label}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{startAdornment}</InputAdornment>
        ),
      }}
      variant="outlined"
      size="large"
      sx={{ width: "90%" }}
      error={Boolean(errors[name])}
      helperText={errors[name] && errors[name].message}
      {...rest}
    />
  );
};

export default ControlledTextField;
