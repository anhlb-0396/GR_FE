import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "react-router-dom";
import { useResume } from "../features/resumes/useResume";
import TitleText from "../ui/sharedComponents/TitleText";
import Resume from "../features/resumes/Resume";

function ResumeDisplayPage() {
  const { id } = useParams();
  const { isLoading, isError, resume } = useResume(id);

  const downloadAsPDF = async () => {
    const input = document.getElementById("component-to-download");
    const pdf = new jsPDF("p", "mm", "a4");
    const pageHeight = pdf.internal.pageSize.getHeight();

    let yPos = 0;

    await html2canvas(input, { scrollY: -window.scrollY }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, yPos, width, height);
      yPos += height;

      // Check if content overflowed the page
      if (yPos + height > pageHeight) {
        pdf.addPage();
        yPos = 0;
      }
    });

    pdf.save("resume.pdf");
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "50vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress size={80} />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ width: "80%", margin: "0 auto" }}>
        <Alert severity="error">Người dùng chưa có CV !!</Alert>
      </Box>
    );
  }

  const resumeData = JSON.parse(resume.data);

  return (
    <Box sx={{ width: "80%", margin: "0 auto" }}>
      <Grid item xs={12} md={12} sx={{ mb: 5 }}>
        <TitleText>Sơ yếu lí lịch CV</TitleText>
      </Grid>

      <Grid container justifyContent="center" sx={{ mb: 3 }}>
        <Button onClick={downloadAsPDF} variant="outlined">
          Tải xuống CV (pdf)
        </Button>
      </Grid>

      <div id="component-to-download">
        <Resume profile={resumeData}></Resume>
      </div>
    </Box>
  );
}

export default ResumeDisplayPage;
