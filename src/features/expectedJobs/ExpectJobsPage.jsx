import { useState } from "react";
import { Box, CircularProgress, Alert, Button } from "@mui/material";
import { Settings } from "@mui/icons-material";
import { useAuth } from "../../contexts/AuthContext";
import { useExpectJobs } from "./useExpectJobs";
import { useCreateExpectJobs } from "./userCreateExpectJobs";
import { useUpdateExpectJobs } from "./userUpdateExpectJobs";
import ExpectJobFormDialog from "./ExpectJobFormDialog";
import ExpectJobsList from "./ExpectJobsList";
import ExpectJobUpdateFormDialog from "./ExpectJobUpdateFormDialog";
import TitleText from "../../ui/sharedComponents/TitleText";

function ExpectJobsPage() {
  const { currentUser, token } = useAuth();
  const [openDialog, setOpenDialog] = useState(false);
  const { createNewExpectJob, isCreating } = useCreateExpectJobs(
    currentUser.id
  );
  const { updateExistingExpectJob, isUpdating } = useUpdateExpectJobs(
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
    updateExistingExpectJob({ ...formData, user_id: currentUser.id, token });
    setOpenDialog(false);
  };

  if (isLoading || isCreating || isUpdating) {
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
        <Button
          onClick={handleOpenDialog}
          variant="outlined"
          startIcon={<Settings />}
        >
          Thiết lập gợi ý
        </Button>
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
      <TitleText>Gợi ý việc làm cho bạn</TitleText>
      <Button
        onClick={handleOpenDialog}
        variant="outlined"
        startIcon={<Settings />}
      >
        Sửa lại thiết lập gợi ý
      </Button>
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
