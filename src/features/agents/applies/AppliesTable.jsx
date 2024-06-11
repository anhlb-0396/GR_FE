import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  Check as CheckIcon,
  Close as CloseIcon,
  Chat as ChatIcon,
  Visibility,
  Mail as MailIcon,
} from "@mui/icons-material";
import {
  Chip,
  Box,
  Alert,
  CircularProgress,
  ButtonGroup,
  Button,
  IconButton,
  Table,
  TableBody,
  Paper,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  Select,
  MenuItem,
  Backdrop,
} from "@mui/material";

import { quillModules, quillFormats } from "../../../constants/quill";
import { useApplies } from "./useApplies";
import { useAuth } from "../../../contexts/AuthContext";
import {
  changeDateTimeFormat,
  chooseColorForStatus,
  displayStatus,
} from "../../../utils/helpers";
import { useUpdateApply } from "./agentUpdateApply";
import { useSocket } from "../../../contexts/SocketContext";
import { createNewNotification } from "../../../services/notifications/notificationAPI";
import TitleText from "../../../ui/sharedComponents/TitleText";
import ApplyResponseDialog from "../../../ui/sharedComponents/ApplyResponseDialog";
import {
  PASS_INTERVIEW_RESPONSE,
  PASS_CV_RESPONSE,
} from "../../../data/responseData";

export default function AppliesTable() {
  const { currentUser, token } = useAuth();
  const { socket, setCurrentChatUserId, chattingUsers, setChattingUsers } =
    useSocket();
  const { applies, isLoading, isError } = useApplies(currentUser.company_id);
  const { isUpdating, updateCurrentApply } = useUpdateApply(
    currentUser.company_id
  );
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [acceptedDescription, setAcceptedDescription] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [openResponseDialog, setOpenResponseDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedResponse, setSelectedResponse] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

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
      <Box sx={{ width: "100%", margin: "0 auto" }}>
        <Alert severity="error">
          Không có thông tin !! Vui lòng tạo thông tin về doanh nghiệp...
        </Alert>
      </Box>
    );
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDialog = (row) => {
    setSelectedRow(row);
    if (row.status === "pending") {
      setAcceptedDescription(PASS_CV_RESPONSE);
    }

    if (row.status === "accepted-cv-round") {
      setAcceptedDescription(PASS_INTERVIEW_RESPONSE);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRow(null);
  };

  const handleOpenResponseDialog = async (responseText) => {
    await setOpenResponseDialog(true);
    setSelectedResponse(responseText);
  };

  const handleCloseResponseDialog = () => {
    setOpenResponseDialog(false);
    setSelectedResponse("");
  };

  const filteredApplies = applies.filter((apply) => {
    if (selectedStatus === "all") return true;
    return apply.status === selectedStatus;
  });

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
    setPage(0);
  };

  const rows = filteredApplies.map((apply) => ({
    id: apply.id,
    jobId: apply.job_id,
    userId: apply.user_id,
    status: apply.status,
    updatedAt: apply.updatedAt,
    name: apply.User.name,
    avatar: apply.User.avatar,
    jobTitle: apply.Job.title,
    companyName: apply.Job.Company.name,
    responseData: apply.response,
    resume: apply.Resume,
  }));

  const handleAccept = async () => {
    if (!selectedRow) return;

    const row = selectedRow;

    if (row.status === "pending") {
      updateCurrentApply({
        applyId: row.id,
        status: "accepted-cv-round",
        response: acceptedDescription,
        sender_id: currentUser.id,
        receiver_id: row.userId,
        job_id: row.jobId,
        message:
          row.status === "pending"
            ? `✅ Công ty ${row.companyName} đã chấp nhận duyệt hồ sơ ứng tuyển của bạn với công việc ${row.jobTitle}`
            : `✅ Chúc mừng ! Công ty ${row.companyName} đã chấp nhận bạn là nhân viên chính thức với công việc ${row.jobTitle}`,
      });
    } else if (row.status === "accepted-cv-round") {
      updateCurrentApply({
        applyId: row.id,
        status: "accepted-interview-round",
        response: acceptedDescription,
        sender_id: currentUser.id,
        receiver_id: row.userId,
        job_id: row.jobId,
        message:
          row.status === "pending"
            ? `✅ Công ty ${row.companyName} đã chấp nhận duyệt hồ sơ ứng tuyển của bạn với công việc ${row.jobTitle}`
            : `✅ Chúc mừng ! Công ty ${row.companyName} đã chấp nhận bạn là nhân viên chính thức với công việc ${row.jobTitle}`,
      });
    }

    const notificationObject = {
      sender_id: currentUser.id,
      receiver_id: row.userId,
      type: "job_accept",
      message:
        row.status === "pending"
          ? `✅ Công ty ${row.companyName} đã chấp nhận duyệt hồ sơ ứng tuyển của bạn với công việc ${row.jobTitle}`
          : `✅ Chúc mừng ! Công ty ${row.companyName} đã chấp nhận bạn là nhân viên chính thức với công việc ${row.jobTitle}`,
      createdAt: new Date(),
    };

    await createNewNotification(notificationObject);
    socket.emit("agentAcceptJobApply", notificationObject);
  };

  const handleDeny = async (row) => {
    const notificationObject = {
      sender_id: currentUser.id,
      receiver_id: row.userId,
      type: "job_reject",
      message: `❌ Công ty ${row.companyName} đã từ chối ứng tuyển của bạn với công việc ${row.jobTitle}`,
      createdAt: new Date(),
    };

    updateCurrentApply({
      applyId: row.id,
      status: "rejected",
      sender_id: currentUser.id,
      receiver_id: row.userId,
      job_id: row.jobId,
      message: `❌ Công ty ${row.companyName} đã từ chối ứng tuyển của bạn với công việc ${row.jobTitle}`,
    });
    await createNewNotification(notificationObject);
    socket.emit("agentDenyJobApply", notificationObject);
  };

  const handleConfirmAccept = () => {
    handleAccept();
    handleCloseDialog();
  };

  const handleChatButtonClick = (row) => {
    setCurrentChatUserId(row.userId);
    setChattingUsers((prev) => {
      if (!prev.map((user) => user.id).includes(row.userId)) {
        return [
          ...prev,
          { id: row.userId, name: row.name, avatar: row.avatar },
        ];
      }
      return prev;
    });
    navigate("/agent/chats");
  };

  const handleWatch = (resume) => {
    if (resume.is_uploaded) {
      const url = resume.resume_url;
      window.open(url, "_blank");
    } else {
      navigate(`/resumes/${resume.id}`);
    }
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        height: "auto",
      }}
    >
      <TitleText>Danh sách ứng tuyển gần đây</TitleText>

      <FormControl sx={{ mb: 2, mt: 2, maxWidth: "160px" }}>
        <Select
          labelId="status-select-label"
          value={selectedStatus}
          onChange={handleStatusChange}
          size="small"
        >
          <MenuItem value="all">Tất cả</MenuItem>
          <MenuItem value="pending">Chờ duyệt</MenuItem>
          <MenuItem value="accepted-cv-round">Đỗ vòng hồ sơ</MenuItem>
          <MenuItem value="accepted-interview-round">Trúng tuyển</MenuItem>
          <MenuItem value="rejected">Từ chối</MenuItem>
        </Select>
      </FormControl>

      <Table size="medium" sx={{ mt: 3 }}>
        <TableHead>
          <TableRow>
            <TableCell>Thời gian</TableCell>
            <TableCell>Họ tên</TableCell>
            <TableCell>Công việc</TableCell>
            <TableCell>Trạng thái</TableCell>
            <TableCell>Xem CV</TableCell>
            <TableCell>Hành động</TableCell>
            <TableCell>Phản hồi</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row.id}>
              <TableCell>{changeDateTimeFormat(row.updatedAt)}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.jobTitle}</TableCell>
              <TableCell>
                <Chip
                  label={displayStatus(row.status)}
                  variant="outlined"
                  color={chooseColorForStatus(row.status)}
                ></Chip>
              </TableCell>
              <TableCell>
                <IconButton
                  aria-label="Watch"
                  onClick={() => handleWatch(row.resume)}
                  color="primary"
                >
                  <Visibility />
                </IconButton>
              </TableCell>
              <TableCell>
                <ButtonGroup variant="outlined">
                  <IconButton
                    onClick={() => handleOpenDialog(row)}
                    aria-label="accept"
                    color="success"
                    disabled={
                      (row.status !== "pending" &&
                        row.status !== "accepted-cv-round") ||
                      isUpdating
                    }
                  >
                    <CheckIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeny(row)}
                    aria-label="deny"
                    color="error"
                    disabled={
                      (row.status !== "pending" &&
                        row.status !== "accepted-cv-round") ||
                      isUpdating
                    }
                  >
                    <CloseIcon />
                  </IconButton>
                </ButtonGroup>
              </TableCell>

              <TableCell>
                <IconButton
                  variant="outlined"
                  size="small"
                  onClick={() => handleOpenResponseDialog(row.responseData)}
                  disabled={
                    row.status === "pending" || row.status === "rejected"
                  }
                  color="primary"
                >
                  <MailIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleChatButtonClick(row)}
                  color="primary"
                >
                  <ChatIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {selectedResponse && (
        <ApplyResponseDialog
          open={openResponseDialog}
          onClose={handleCloseResponseDialog}
          responseData={selectedResponse}
        />
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md">
        <DialogTitle>
          <TitleText variant="h6">
            Gửi nội dung thông báo cho ứng viên
          </TitleText>
        </DialogTitle>
        <DialogContent>
          <ReactQuill
            theme="snow"
            value={acceptedDescription}
            onChange={(value) => setAcceptedDescription(value)}
            modules={quillModules}
            formats={quillFormats}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={() => {
              if (acceptedDescription.trim() !== "") {
                handleConfirmAccept();
              }
            }}
            disabled={acceptedDescription.trim() === ""}
          >
            Accept
          </Button>
        </DialogActions>
      </Dialog>

      {/* Backdrop Component */}
      <Backdrop
        sx={{ color: "primary", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isUpdating}
        // onClick={handleBackdropClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Paper>
  );
}
