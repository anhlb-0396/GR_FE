import React from "react";
import {
  Box,
  Grid,
  Typography,
  Avatar,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Phone as PhoneIcon,
  Email as EmailIcon,
  Home as HomeIcon,
} from "@mui/icons-material";
import ResumeCard from "./ResumeCard";

const getIconComponent = (iconName) => {
  switch (iconName) {
    case "Phone":
      return <PhoneIcon />;
    case "Email":
      return <EmailIcon />;
    case "Address":
      return <HomeIcon />;
    default:
      return null;
  }
};

export default function Resume({ profile }) {
  console.log(profile);

  return (
    <Box sx={{ width: { xs: "100%", md: "60%" }, margin: "0 auto" }}>
      {/* Left Column */}
      <Grid item xs={12} md={12}>
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
                <ListItemIcon>{getIconComponent(contact.label)}</ListItemIcon>
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
        {/* <ResumeCard>
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
          </ResumeCard> */}
      </Grid>

      {/* Right Column */}
      <Grid item xs={12} md={12}>
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
    </Box>
  );
}
