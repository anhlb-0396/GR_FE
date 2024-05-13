import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from "@mui/material";
import {
  Check as CheckIcon,
  Close as CloseIcon,
  Send as SendIcon,
  AssignmentInd as AssignmentIndIcon,
} from "@mui/icons-material";

import { useCreateApply } from "./userCreateApply";
import { useDeleteApply } from "./userDeleteApply";
import { useApplies } from "./useApplies";
import { useResumes } from "../resumes/useResumes";
import TitleText from "../../ui/sharedComponents/TitleText";
import { useSocket } from "../../contexts/SocketContext";
import { createNewNotification } from "../../services/notifications/notificationAPI";
import ApplyResponseDialog from "../../ui/sharedComponents/ApplyResponseDialog";
import ResumesTable from "../resumes/ResumesTable";
import toast from "react-hot-toast";

function Apply({ job, currentUser, token, isAuthenticated }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [choosedResume, setChoosedResume] = useState(null);
  const { createNewApply, isCreating } = useCreateApply(currentUser.id);
  const { deleteNewApply, isDeleting } = useDeleteApply(currentUser.id);
  const { applies, isLoading, isError } = useApplies(currentUser.id);
  const { isLoading: isResumeLoading, isError: isResumeError } = useResumes(
    currentUser.id
  );

  const navigate = useNavigate();
  const { socket } = useSocket();
  const [openResponseDialog, setOpenResponseDialog] = useState(false);

  if (isLoading) return null;
  if (isError) return null;

  if (isResumeLoading)
    return (
      <Button
        startIcon={<AssignmentIndIcon />}
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
        startIcon={<AssignmentIndIcon />}
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

  const currentResponseData = applies.find(
    (apply) => apply.job_id === job.id && apply.user_id === currentUser.id
  )?.response;

  const handleApply = () => {
    setOpenDialog(true);
  };

  const handleConfirmation = async () => {
    if (!isApplied) {
      if (choosedResume === null) {
        toast.error("Vui lòng chọn CV để ứng tuyển");
        return;
      }

      const applyData = {
        user_id: currentUser.id,
        job_id: job.id,
        resume_id: choosedResume,
        token,
      };
      createNewApply(applyData);

      const notificationObject = {
        sender_id: currentUser.id,
        receiver_id: job.ownerId,
        type: "job_apply",
        message: `👩‍💻 ${currentUser.name} đã yêu cầu ứng tuyển công việc ${job.title}`,
        companyId: job.Company.id,
        createdAt: new Date().toISOString(),
      };

      await createNewNotification(notificationObject);

      socket.emit("applyForJob", notificationObject);
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
    setOpenDialog(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenResponseDialog = async () => {
    await setOpenResponseDialog(true);
  };

  const handleCloseResponseDialog = () => {
    setOpenResponseDialog(false);
  };

  return (
    <Grid>
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

      {currentStatus === "accepted-cv-round" && (
        <Button
          startIcon={<CheckIcon />}
          variant="outlined"
          color="success"
          onClick={() => handleOpenResponseDialog()}
        >
          Đã qua vòng xét duyệt CV! Vui lòng kiểm tra thông báo
        </Button>
      )}

      {currentStatus === "accepted-interview-round" && (
        <Button
          startIcon={<CheckIcon />}
          variant="outlined"
          color="success"
          onClick={() => handleOpenResponseDialog()}
        >
          Đã trúng tuyển công việc
        </Button>
      )}

      {currentStatus === "rejected" && (
        <Button startIcon={<CloseIcon />} variant="outlined" color="error">
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
            {!isApplied ? (
              <ResumesTable
                type="apply"
                choosedResume={choosedResume}
                setChoosedResume={setChoosedResume}
              />
            ) : (
              "Bạn có chắc muốn hủy ứng tuyển công việc này hay không ???"
            )}
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

      {/* Display the response dialog here */}
      <ApplyResponseDialog
        open={openResponseDialog}
        onClose={handleCloseResponseDialog}
        responseData={currentResponseData}
      />
    </Grid>
  );
}

export default Apply;
