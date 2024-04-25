import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
  Alert,
  Chip,
} from "@mui/material";
import { Delete, Visibility } from "@mui/icons-material";
import { useAuth } from "../../contexts/AuthContext";
import { useResumes } from "./useResumes";

function ResumesTable() {
  const { currentUser } = useAuth();
  const { resumes, isLoading, isError, error } = useResumes(currentUser.id);

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
      <Box sx={{ width: "80%", margin: "20px auto" }}>
        <Alert severity="error">
          Người dùng chưa có CV ! Vui lòng tạo CV mới : {error.message}
        </Alert>
      </Box>
    );
  }

  console.log(resumes);

  const handleDelete = (resumeId) => {
    console.log("Deleting resume with ID:", resumeId);
  };

  const handleWatch = (resumeId) => {
    console.log("Watching resume with ID:", resumeId);
  };

  return (
    <Box mt={4} maxWidth="md" margin="10px auto">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tên CV</TableCell>
              <TableCell>Loại CV</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resumes.map((resume) => (
              <TableRow key={resume.id}>
                <TableCell>{resume.id}</TableCell>
                <TableCell>{resume.name}</TableCell>
                <TableCell>
                  <Chip
                    label={!resume.is_uploaded ? "CV hệ thống" : "CV Upload"}
                    variant="rounded"
                    color={!resume.is_uploaded ? "info" : "error"}
                    sx={{ color: "white" }}
                  ></Chip>
                </TableCell>
                <TableCell>
                  <IconButton
                    aria-label="Watch"
                    onClick={() => handleWatch(resume.id)}
                  >
                    <Visibility />
                  </IconButton>
                  <IconButton
                    aria-label="Delete"
                    onClick={() => handleDelete(resume.id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ResumesTable;
