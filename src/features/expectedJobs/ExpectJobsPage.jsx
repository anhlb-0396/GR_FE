import { useState } from "react";
import { Box, CircularProgress, Alert, Button } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import { useExpectJobs } from "./useExpectJobs";
import { useCreateExpectJobs } from "./userCreateExpectJobs";
import TitleText from "../../ui/sharedComponents/TitleText";
import ExpectJobFormDialog from "./ExpectJobFormDialog";
import ExpectJobsList from "./ExpectJobsList";
import ExpectJobUpdateFormDialog from "./ExpectJobUpdateFormDialog";

function ExpectJobsPage() {
  const { currentUser, token } = useAuth();
  const [openDialog, setOpenDialog] = useState(false);
  const { createNewExpectJob, isCreating } = useCreateExpectJobs(
    currentUser.id
  );
  const { expectations, isLoading, isError } = useExpectJobs(currentUser.id);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSubmitForm = (formData) => {
    createNewExpectJob({ ...formData, user_id: currentUser.id, token });
    setOpenDialog(false);
  };

  const handleUpdateForm = (formData) => {
    console.log(formData);
  };

  if (isLoading || isCreating) {
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
        <TitleText>Gợi ý việc làm</TitleText>
        <Alert severity="error">
          Không có dữ liệu ! Vui lòng thiết lập gợi ý công việc
        </Alert>
        <Button onClick={handleOpenDialog}>Thiết lập gợi ý</Button>
        <ExpectJobFormDialog
          open={openDialog}
          onClose={handleCloseDialog}
          onSubmit={handleSubmitForm}
        />
      </Box>
    );
  }

  return (
    <Box sx={{ width: "80%", margin: "0 auto" }}>
      <TitleText>Gợi ý việc làm</TitleText>
      <Button onClick={handleOpenDialog}>Sửa lại thiết lập gợi ý</Button>
      <ExpectJobUpdateFormDialog
        open={openDialog}
        onClose={handleCloseDialog}
        requirement={expectations?.requirement}
        onSubmit={handleUpdateForm}
      />
      <ExpectJobsList expectations={expectations?.expectJobs} />
    </Box>
  );
}

export default ExpectJobsPage;
