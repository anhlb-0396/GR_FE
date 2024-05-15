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
  Grid,
} from "@mui/material";
import {
  Delete,
  Visibility,
  RadioButtonUnchecked,
  RadioButtonChecked,
} from "@mui/icons-material";
import { useAuth } from "../../contexts/AuthContext";
import { useResumes } from "./useResumes";
import { useNavigate } from "react-router-dom";

function ResumesTable({ type = "normal", choosedResume, setChoosedResume }) {
  const { currentUser } = useAuth();
  const { resumes, isLoading, isError, error } = useResumes(currentUser.id);
  const navigate = useNavigate();

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

  const handleDelete = (resume) => {
    console.log("Deleting resume with ID:", resume.id);
  };

  const handleWatch = (resume) => {
    if (resume.is_uploaded) {
      const url = resume.resume_url;
      window.open(url, "_blank");
    } else {
      navigate(`/resumes/${resume.id}`);
    }
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
                    onClick={() => handleWatch(resume)}
                  >
                    <Visibility />
                  </IconButton>
                  {type === "normal" && (
                    <IconButton
                      aria-label="Delete"
                      onClick={() => handleDelete(resume)}
                    >
                      <Delete />
                    </IconButton>
                  )}

                  {type === "apply" && (
                    <IconButton
                      aria-label="Choose"
                      onClick={() => setChoosedResume(resume.id)}
                    >
                      {choosedResume === resume.id ? (
                        <RadioButtonChecked color="primary" />
                      ) : (
                        <RadioButtonUnchecked />
                      )}
                    </IconButton>
                  )}
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
