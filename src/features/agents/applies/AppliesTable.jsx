import React, { useState } from "react";
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
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TitleText from "../../../ui/inputs/TitleText";
import { useApplies } from "./useApplies";
import { useAuth } from "../../../contexts/AuthContext";
import { changeDateTimeFormat } from "../../../utils/helpers";
import TablePagination from "@mui/material/TablePagination";
import { useUpdateApply } from "./agentUpdateApply";

export default function AppliesTable() {
  const { currentUser, token } = useAuth();
  const { applies, isLoading, isError } = useApplies(currentUser.company_id);
  const { isUpdating, updateCurrentApply } = useUpdateApply(
    currentUser.company_id
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  const rows = applies.map((apply) => ({
    id: apply.id,
    jobId: apply.job_id,
    userId: apply.user_id,
    status: apply.status,
    updatedAt: apply.updatedAt,
    name: apply.User.name,
    avatar: apply.User.avatar,
    jobTitle: apply.Job.title,
  }));

  const handleAccept = (row) => {
    updateCurrentApply({ applyId: row.id, status: "accepted" });
  };

  const handleDeny = (row) => {
    updateCurrentApply({ applyId: row.id, status: "rejected" });
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <React.Fragment>
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
                  label={row.status}
                  variant="outlined"
                  color={
                    row.status === "pending"
                      ? "warning"
                      : row.status === "accepted"
                      ? "success"
                      : "error"
                  }
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
                    onClick={() => handleAccept(row)}
                    aria-label="accept"
                    color="success"
                    disabled={row.status !== "pending" || isUpdating}
                  >
                    <CheckIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeny(row)}
                    aria-label="deny"
                    color="error"
                    disabled={row.status !== "pending" || isUpdating}
                  >
                    <CloseIcon />
                  </IconButton>
                </ButtonGroup>
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
    </React.Fragment>
  );
}
