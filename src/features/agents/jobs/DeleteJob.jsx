import { useState } from "react";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { useDeleteJob } from "./agentDeleteJob";

function DeleteJob({ job, currentUser, token }) {
  const { isDeleting, deleteNewJob } = useDeleteJob(currentUser.company_id);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDeleteJob = () => {
    deleteNewJob(job.id);
    handleCloseDialog();
  };

  return (
    <>
      <IconButton disabled={isDeleting} onClick={handleOpenDialog}>
        <DeleteIcon />
      </IconButton>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Xác nhận</DialogTitle>
        <DialogContent>
          <p>Bạn có chắc muốn xóa tất cả dữ liệu về công việc này hay không?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Hủy
          </Button>
          <Button onClick={handleDeleteJob} color="error" autoFocus>
            Đồng ý xóa
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DeleteJob;
