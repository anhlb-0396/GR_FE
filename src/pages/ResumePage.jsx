import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Tabs,
  Tab,
} from "@mui/material";
import {
  Create as CreateIcon,
  CloudUpload as CloudUploadIcon,
  AddCircle,
} from "@mui/icons-material";
import TitleText from "../ui/sharedComponents/TitleText";
import ResumeStepper from "../features/resumes/ResumeStepper";
import ResumeUploadForm from "../features/resumes/forms/ResumeUploadForm";
import Resume from "../features/resumes/Resume";
import profileData from "../data/TEMPLATE";
import ResumesTable from "../features/resumes/ResumesTable";

function ResumePage() {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOptionSelection = (option) => {
    setSelectedOption(option);
    setOpen(false);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ margin: "0 auto" }}>
      <TitleText>Sơ yếu lí lịch bản thân</TitleText>

      <Tabs value={tabValue} onChange={handleTabChange} centered>
        <Tab label="Tạo CV" />
        <Tab label="Xem tất cả CV" />
      </Tabs>

      {tabValue === 0 && (
        <Box>
          <Grid container alignItems="center" my={3}>
            <Button
              onClick={handleOpen}
              aria-label="Tạo sơ yếu lý lịch"
              startIcon={<AddCircle />}
              variant="contained"
              sx={{ margin: "0 auto" }}
            >
              Tạo sơ yếu lý lịch
            </Button>
          </Grid>

          {!selectedOption && (
            <Grid>
              <TitleText variant="h5">Template CV mẫu</TitleText>
              <Grid my={1} />
              <Resume profile={profileData.profile} />
            </Grid>
          )}

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
              <TitleText variant="h5">Chọn cách tạo sơ yếu lý lịch</TitleText>
            </DialogTitle>
            <DialogContent>
              <Button
                onClick={() => handleOptionSelection("createInApp")}
                startIcon={<CreateIcon />}
              >
                Tạo sơ yếu lý lịch trong ứng dụng
              </Button>
              <Button
                onClick={() => handleOptionSelection("uploadPdf")}
                startIcon={<CloudUploadIcon />}
              >
                Tạo sơ yếu lý lịch bằng cách tải lên file PDF
              </Button>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Đóng</Button>
            </DialogActions>
          </Dialog>

          {selectedOption === "createInApp" && <ResumeStepper />}
          {selectedOption === "uploadPdf" && <ResumeUploadForm />}
        </Box>
      )}

      {tabValue === 1 && <ResumesTable />}
    </Box>
  );
}

export default ResumePage;
