// React
import React from "react";

// MUI
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Local
import ResumeCard from "./ResumeCard";

// ResumePortfolio: A React component that displays a resume/portfolio.
export default function Resume({ profile }) {
  const downloadPDF = () => {
    const capture = document.querySelector(".download-pdf-container");

    // Adjust the style for better PDF layout
    capture.style.width = "fit-content";
    capture.style.padding = "20px";

    html2canvas(capture, { scrollY: -window.scrollY }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a3");
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Calculate A4 height

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("resume.pdf");

      // Restore the original style after export
      capture.style.width = "auto";
      capture.style.padding = "0";
    });
  };

  return (
    <Box>
      <div className="download-pdf-container">
        <Grid container spacing={2}>
          {/* Left Column */}
          <Grid item xs={12} md={4}>
            {/* Profile */}
            <ResumeCard>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar
                  alt={profile.name}
                  src={profile.avatar}
                  sx={{ width: 100, height: 100 }}
                />
                <Typography variant="h5" component="div" sx={{ mt: 2 }}>
                  {profile.name}
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 1 }}>
                  {profile.address}
                </Typography>
                {/* ... other personal information */}
              </Box>

              {/* Contact Details */}
              <Divider sx={{ mt: 2 }} />
              <List component="nav" dense>
                {profile.contacts.map((contact, index) => (
                  <ListItemButton key={index}>
                    <ListItemIcon>
                      <contact.icon />
                    </ListItemIcon>
                    <ListItemText
                      primary={contact.label}
                      secondary={contact.value}
                    />
                  </ListItemButton>
                ))}
              </List>
              <Divider sx={{ mb: 2 }} />

              {/* Skills */}
              <Typography variant="h6" component="div" sx={{ mt: 2 }}>
                Skills
              </Typography>
              <List component="nav" dense>
                {profile.skills.map((skill, index) => (
                  <ListItemButton key={index}>
                    <ListItemText
                      primary={skill.category}
                      secondary={skill.skills}
                    />
                  </ListItemButton>
                ))}
              </List>
            </ResumeCard>

            {/* Social Media Links */}
            <ResumeCard>
              <Typography
                variant="h6"
                component="div"
                sx={{ textAlign: "center" }}
              >
                Social Media
              </Typography>
              <Box sx={{ mt: 2, textAlign: "center" }}>
                {profile.socialMedia.map((media, index) => (
                  <IconButton color="primary" key={index}>
                    <media.icon />
                  </IconButton>
                ))}
              </Box>
            </ResumeCard>
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} md={8}>
            {/* Education */}
            <ResumeCard>
              <Typography variant="h6" component="div">
                Education
              </Typography>
              <Box sx={{ mt: 2 }}>
                {profile.education.map((education, index) => (
                  <React.Fragment key={index}>
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle1">
                        {education.degree}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {education.date}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {education.school}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {education.gpa}
                      </Typography>
                    </Box>

                    {/* Divider but not for single or last item */}
                    {index !== profile.education.length - 1 && (
                      <Divider sx={{ mb: 2 }} />
                    )}
                  </React.Fragment>
                ))}
              </Box>
            </ResumeCard>

            {/* Work Experience */}
            <ResumeCard>
              <Typography variant="h6" component="div">
                Work Experience
              </Typography>
              <Box sx={{ mt: 2 }}>
                {profile.experience.map((experience, index) => (
                  <React.Fragment key={index}>
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle1">
                        {experience.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {experience.date}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {experience.description}
                      </Typography>
                    </Box>

                    {/* Divider but not for single or last item */}
                    {index !== profile.experience.length - 1 && (
                      <Divider sx={{ mb: 2 }} />
                    )}
                  </React.Fragment>
                ))}
              </Box>
            </ResumeCard>
          </Grid>
        </Grid>
      </div>

      <Button variant="contained" onClick={downloadPDF}>
        DOWNLOAD PDF
      </Button>
    </Box>
  );
}
