import * as React from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

import Resume from "./Resume";
import Personal from "./forms/Personal";
import Skills from "./forms/Skills";
import Education from "./forms/Education";
import Experiences from "./forms/Experiences";
import { useUserCV } from "../../contexts/UserCVContext";
import { useCreateResume } from "./userCreateResume";
import { useAuth } from "../../contexts/AuthContext";

const steps = [
  "Thông tin cá nhân",
  "Kĩ năng",
  "Học vấn",
  "Kinh nghiệm",
  "Xem trước",
];

function displayStepContent(step, state) {
  switch (step) {
    case 0:
      return <Personal />;

    case 1:
      return <Skills />;

    case 2:
      return <Education />;

    case 3:
      return <Experiences />;

    case 4:
      return <Resume profile={state} />;
  }
}

function ResumeStepper() {
  const { currentUser } = useAuth();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [openDialog, setOpenDialog] = React.useState(false);
  const [resumeName, setResumeName] = React.useState("");
  const { isCreating, createResume } = useCreateResume(currentUser.id);
  const { state } = useUserCV();
  const navigate = useNavigate();

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleComplete = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleAccept = () => {
    const data = state;
    createResume({
      resume: { ...data, resume_name: resumeName },
      user_id: currentUser.id,
      resume_name: resumeName,
    });
    navigate("/");
  };

  return (
    <Box sx={{ width: "100%", mt: "4rem" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => {
          const stepProps = {};
          const labelProps = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </>
      ) : (
        <>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Quay lại
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />

            {activeStep < steps.length - 1 && (
              <Button onClick={handleNext}>Tiếp theo</Button>
            )}

            {activeStep === steps.length - 1 && (
              <Button onClick={handleComplete} disabled={isCreating}>
                Hoàn tất
              </Button>
            )}
          </Box>
        </>
      )}

      <Box sx={{ my: "2rem" }}>{displayStepContent(activeStep, state)}</Box>

      {/* Resume Name Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Đặt tên cho CV</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Tên CV"
            fullWidth
            value={resumeName}
            onChange={(e) => setResumeName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Hủy</Button>
          <Button onClick={handleAccept}>Xác nhận</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ResumeStepper;
