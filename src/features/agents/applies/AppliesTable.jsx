import { useState } from "react";
import { Link } from "react-router-dom";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { quillModules, quillFormats } from "../../../constants/quill";
import TitleText from "../../../ui/sharedComponents/TitleText";
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
import ApplyResponseDialog from "../../../ui/sharedComponents/ApplyResponseDialog";

export default function AppliesTable() {
  const { currentUser, token } = useAuth();
  const { socket } = useSocket();
  const { applies, isLoading, isError } = useApplies(currentUser.company_id);
  const { isUpdating, updateCurrentApply } = useUpdateApply(
    currentUser.company_id
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [acceptedDescription, setAcceptedDescription] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [openResponseDialog, setOpenResponseDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedResponse, setSelectedResponse] = useState("");

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

  console.log(applies);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDialog = (row) => {
    setSelectedRow(row);
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

  const rows = applies.map((apply) => ({
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
  }));

  const handleAccept = async () => {
    if (!selectedRow) return;

    const row = selectedRow;

    if (row.status === "pending") {
      updateCurrentApply({
        applyId: row.id,
        status: "accepted-cv-round",
        response: acceptedDescription,
      });
    } else if (row.status === "accepted-cv-round") {
      updateCurrentApply({
        applyId: row.id,
        status: "accepted-interview-round",
        response: acceptedDescription,
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

    updateCurrentApply({ applyId: row.id, status: "rejected" });
    await createNewNotification(notificationObject);
    socket.emit("agentDenyJobApply", notificationObject);
  };

  const handleConfirmAccept = () => {
    handleAccept();
    handleCloseDialog();
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
      <TitleText variant="h5">Danh sách ứng tuyển gần đây</TitleText>
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
                <Button
                  variant="outlined"
                  component={Link}
                  to={`/users/${row.userId}/cv`}
                  size="small"
                >
                  Xem CV
                </Button>
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
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleOpenResponseDialog(row.responseData)}
                  disabled={
                    row.status === "pending" || row.status === "rejected"
                  }
                >
                  Xem
                </Button>
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

      <ApplyResponseDialog
        open={openResponseDialog}
        onClose={handleCloseResponseDialog}
        responseData={selectedResponse}
      />

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
    </Paper>
  );
}
