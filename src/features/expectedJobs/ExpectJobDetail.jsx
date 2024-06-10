import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  Chip,
  Autocomplete,
} from "@mui/material";
import { useIndustries } from "../industries/useIndustries";

function ExpectJobDetail({ open, onClose, initialValues = {} }) {
  const { industries, isLoading, isError } = useIndustries();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  const years = Array.from({ length: 6 }, (_, i) =>
    i > 0 ? `${i} năm` : `0 yêu cầu kinh nghiệm`
  );

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Mức lương tối thiểu từ (triệu VNĐ)"
              variant="outlined"
              size="small"
              fullWidth
              value={initialValues.min_salary}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              multiple
              value={initialValues.industries}
              options={industries}
              getOptionLabel={(option) => `${option.id} - ${option.industry}`}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    key={option.id || index}
                    label={option.industry}
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Ngành nghề/Lĩnh vực"
                  variant="outlined"
                  size="small"
                  fullWidth
                  disabled
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Kinh nghiệm làm việc"
              variant="outlined"
              size="small"
              fullWidth
              value={initialValues.working_experience}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              value={initialValues.working_method}
              options={["offline", "remote", "hybrid", "tất cả"]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Hình thức làm việc"
                  variant="outlined"
                  size="small"
                  fullWidth
                  disabled
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              value={initialValues.working_type}
              options={["fulltime", "partime", "tất cả"]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Loại công việc"
                  variant="outlined"
                  size="small"
                  fullWidth
                  disabled
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              value={initialValues.province_id}
              options={initialValues.province_id}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tỉnh/Thành phố"
                  variant="outlined"
                  size="small"
                  fullWidth
                  disabled
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Kỹ năng"
              variant="outlined"
              size="small"
              fullWidth
              value={initialValues.skills}
              disabled
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Đóng</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ExpectJobDetail;
