import Box from "@mui/material/Box";

import TitleText from "../ui/sharedComponents/TitleText";
import ResumeStepper from "../features/resumes/ResumeStepper";

function ResumeCreatePage() {
  return (
    <Box sx={{ width: "80%", margin: "0 auto" }}>
      <TitleText>Tạo sơ yếu lí lịch bản thân</TitleText>
      <ResumeStepper></ResumeStepper>
    </Box>
  );
}

export default ResumeCreatePage;
