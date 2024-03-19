import { Grid, Autocomplete, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

function CustomAutoComplete({
  name,
  control,
  setValue,
  options,
  size = 3,
  label,
}) {
  return (
    <Grid item xs={size}>
      <Controller
        name={name}
        control={control}
        defaultValue={null}
        render={({ field }) => (
          <Autocomplete
            {...field}
            variant="outlined"
            size="small"
            options={options}
            onChange={(event, value) => setValue(name, value)}
            renderInput={(params) => <TextField {...params} label={label} />}
          />
        )}
      ></Controller>
    </Grid>
  );
}

export default CustomAutoComplete;
