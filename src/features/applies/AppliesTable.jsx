import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Visibility, Mail as MailIcon } from "@mui/icons-material";
import {
  Chip,
  Box,
  Alert,
  CircularProgress,
  Button,
  IconButton,
  Table,
  TableBody,
  Paper,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";

import { useApplies } from "./useApplies";
import {
  changeDateTimeFormat,
  chooseColorForStatus,
  displayStatus,
} from "../../utils/helpers";
import TitleText from "../../ui/sharedComponents/TitleText";
import ApplyResponseDialog from "../../ui/sharedComponents/ApplyResponseDialog";
import { useAuth } from "../../contexts/AuthContext";

export default function AppliesTable() {
  const { currentUser, token } = useAuth();
  const { applies, isLoading, isError } = useApplies(currentUser?.id);

  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openResponseDialog, setOpenResponseDialog] = useState(false);
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
        <Alert severity="error">Không có thông tin !!</Alert>
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
    jobTitle: apply.Job.title,
    companyName: apply.Job.Company.name,
    responseData: apply.response,
    resume: apply.Resume,
  }));

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
            <TableCell>Công việc</TableCell>
            <TableCell>Trạng thái</TableCell>
            <TableCell>CV ứng tuyển</TableCell>
            <TableCell>Phản hồi từ HR</TableCell>
            <TableCell>Chi tiết</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row.id}>
              <TableCell>{changeDateTimeFormat(row.updatedAt)}</TableCell>
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
              </TableCell>
              <TableCell>
                <IconButton
                  aria-label="Watch details job"
                  onClick={() => {
                    navigate(`/jobs/${row.jobId}`);
                  }}
                  color="primary"
                >
                  <Visibility />
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
    </Paper>
  );
}
