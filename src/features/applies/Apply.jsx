import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useCreateApply } from "./userCreateApply";
import { useDeleteApply } from "./userDeleteApply";
import { useApplies } from "./useApplies";
import { useResume } from "../resumes/useResume";
import TitleText from "../../ui/inputs/TitleText";

function Apply({ job, currentUser, token, isAuthenticated }) {
  const [openDialog, setOpenDialog] = useState(false);
  const { createNewApply, isCreating } = useCreateApply(currentUser.id);
  const { deleteNewApply, isDeleting } = useDeleteApply(currentUser.id);
  const { applies, isLoading, isError } = useApplies(currentUser.id);
  const { isLoading: isResumeLoading, isError: isResumeError } = useResume(
    currentUser.id
  );
  const navigate = useNavigate();

  if (isLoading) return null;
  if (isError) return null;

  if (isResumeLoading)
    return (
      <Button
        startIcon={<AssignmentIndIcon></AssignmentIndIcon>}
        variant="outlined"
        color="primary"
        disabled
      >
        Đang kiểm tra CV...
      </Button>
    );
  if (isResumeError)
    return (
      <Button
        startIcon={<AssignmentIndIcon></AssignmentIndIcon>}
        variant="outlined"
        color="warning"
        onClick={() => navigate("/users/cv/create")}
        disabled={isCreating || isDeleting}
      >
        Tạo CV để ứng tuyển
      </Button>
    );

  const isApplied = applies.some(
    (apply) => apply.job_id === job.id && apply.user_id === currentUser.id
  );

  const currentStatus = applies.find(
    (apply) => apply.job_id === job.id && apply.user_id === currentUser.id
  )?.status;

  const handleApply = () => {
    setOpenDialog(true); // Open the confirmation dialog
  };

  const handleConfirmation = () => {
    setOpenDialog(false); // Close the confirmation dialog
    if (!isApplied) {
      const applyData = {
        user_id: currentUser.id,
        job_id: job.id,
        token,
      };
      createNewApply(applyData);
    } else {
      const applyId = applies.find(
        (apply) => apply.job_id === job.id && apply.user_id === currentUser.id
      ).id;

      const applyData = {
        user_id: currentUser.id,
        apply_id: applyId,
        token,
      };

      deleteNewApply(applyData);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the confirmation dialog without proceeding
  };

  return (
    <>
      {(currentStatus === "pending" || !currentStatus) && (
        <Button
          startIcon={<SendIcon></SendIcon>}
          variant="outlined"
          color={isApplied ? "error" : "primary"}
          onClick={handleApply}
          disabled={isCreating || isDeleting}
        >
          {isApplied ? "Hủy ứng tuyển" : "Ứng tuyển"}
        </Button>
      )}
      {currentStatus === "accepted" && (
        <Button
          startIcon={<CheckIcon />}
          variant="outlined"
          color="success"
          disabled
        >
          Đã được chấp nhận
        </Button>
      )}

      {currentStatus === "rejected" && (
        <Button
          startIcon={<CloseIcon />}
          variant="outlined"
          color="error"
          disabled
        >
          Đã bị từ chối
        </Button>
      )}
      {/* Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <TitleText variant="h6">
            {isApplied ? "Hủy ứng tuyển công việc" : "Ứng tuyển công việc"}
          </TitleText>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {!isApplied
              ? "Bạn có chắc muốn ứng tuyển công việc này hay không ???"
              : "Bạn có chắc muốn hủy ứng tuyển công việc này hay không ???"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Hủy
          </Button>
          <Button onClick={handleConfirmation} color="primary" autoFocus>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Apply;
