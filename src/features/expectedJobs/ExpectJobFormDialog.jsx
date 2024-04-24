import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import CustomAutoComplete from "../../ui/inputs/CustomAutoComplete";
import provinces from "../../data/provincesData";
import TitleText from "../../ui/sharedComponents/TitleText";
import TagsInput from "../../ui/inputs/TagsInput";

function ExpectJobFormDialog({ open, onClose, onSubmit, initialValues = {} }) {
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: initialValues,
  });

  const years = Array.from({ length: 6 }, (_, i) =>
    i > 0 ? `${i} năm` : `0 yêu cầu kinh nghiệm`
  );

  console.log(years);

  const onSubmitForm = (data) => {
    // Convert selected working_experience to number
    data.working_experience = parseInt(data.working_experience);

    // Find province_id based on the selected province name
    const selectedProvince = data.province_id;
    const province = provinces.find(
      (province) => province.province_name === selectedProvince
    );
    data.province_id = province ? parseInt(province.province_id) : null;

    onSubmit(data);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TitleText variant="h5">Thiết lập gợi ý công việc</TitleText>
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="min_salary"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Mức lương tối thiểu"
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="max_salary"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Mức lương tối đa"
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="field"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Ngành nghề/Lĩnh vực"
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <CustomAutoComplete
              name="working_experience"
              control={control}
              setValue={setValue}
              options={years}
              label="Kinh nghiệm làm việc"
              xs={12}
              md={12}
            />
            <CustomAutoComplete
              name="working_method"
              control={control}
              setValue={setValue}
              options={["offline", "remote", "hybrid", "tất cả"]}
              label="Hình thức làm việc"
              xs={12}
              md={4}
            />
            <CustomAutoComplete
              name="working_type"
              control={control}
              setValue={setValue}
              options={["fulltime", "partime", "tất cả"]}
              label="Loại công việc"
              xs={12}
              md={4}
            />
            <CustomAutoComplete
              name="province_id"
              control={control}
              setValue={setValue}
              options={provinces.map((province) => province.province_name)}
              label="Tỉnh/Thành phố"
              xs={12}
              md={4}
            />
            <Grid item xs={12}>
              <Controller
                name="skills"
                control={control}
                defaultValue=""
                render={() => (
                  <TagsInput
                    control={control}
                    setValue={setValue}
                    initialSkills={initialValues.skills}
                  />
                )}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button type="submit" onClick={handleSubmit(onSubmitForm)}>
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ExpectJobFormDialog;
