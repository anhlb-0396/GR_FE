import React from "react";
import { styled } from "@mui/material/styles";
import {
  Grid,
  Paper,
  Typography,
  Box,
  Avatar,
  IconButton,
  CircularProgress,
  Alert,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useStatistics } from "./useStatistics";
import { useAuth } from "../../contexts/AuthContext";
import JobAppliedByIndustries from "./JobsAppliedByIndustries";
import AppliesStatistic from "./AppliesStatistics";

// Define styled components
const Root = styled("div")(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  backgroundColor: "#f4f6f8",
  minHeight: "100vh",
}));

const Header = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
  backgroundColor: theme.palette.primary.main,
  color: "#fff",
  marginBottom: theme.spacing(2),
  borderRadius: 8,
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: "center",
  color: theme.palette.text.secondary,
  backgroundColor: "#fff",
  borderRadius: 8,
  boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
}));

const SectionHeader = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: theme.spacing(2),
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(8),
  height: theme.spacing(8),
  marginBottom: theme.spacing(1),
}));

const Dashboard = () => {
  const { currentUser } = useAuth();
  const { isLoading, isError, error, statistics } = useStatistics(
    currentUser?.id
  );

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
      <Box sx={{ width: "80%", margin: "0 auto" }}>
        <Alert severity="error">Không có dữ liệu : {error}</Alert>
      </Box>
    );
  }

  return (
    <Root>
      <Header>
        <Typography variant="h4">Dashboard</Typography>
      </Header>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <StyledPaper>
            <Grid container justifyContent="center">
              <StyledAvatar src={currentUser.avatar} alt="User" />
            </Grid>
            <Typography variant="h6">{currentUser.name}</Typography>
            <Typography variant="body1">
              Số lượng việc làm đã ứng tuyển: {statistics.appliedJobsCount}
            </Typography>
            <Typography variant="body1">
              Số lượng việc làm đã lưu: {statistics.bookmarkedJobsCount}
            </Typography>
            <Typography variant="body1">
              Số lượng ngành nghề đã ứng tuyển:{" "}
              {statistics.appliedByIndustries.length}
            </Typography>
            <Typography variant="body1">
              Số lượng CV đã lưu: {statistics.resumesCount}
            </Typography>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} sm={6} md={8}>
          <StyledPaper>
            <Typography variant="h6">
              Thống kê tỉ lệ khi tham gia ứng tuyển
            </Typography>
            <Typography variant="body1">Biểu diễn bằng biểu đồ tròn</Typography>
            <AppliesStatistic
              statisticsByApplies={statistics.applyCountsByType}
            />
          </StyledPaper>
        </Grid>
        <Grid item xs={12}>
          <StyledPaper>
            <Typography variant="h6">
              Thống kê số lượng công việc trên từng ngành nghề đã ứng tuyển
            </Typography>
            <Typography variant="body1">Biểu diễn bằng biểu đồ cột</Typography>
            <JobAppliedByIndustries
              statistics={statistics.appliedByIndustries}
            />
          </StyledPaper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StyledPaper>
            <Typography variant="h6">User Feedback</Typography>
            <Typography variant="body1">Recent feedback from users</Typography>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StyledPaper>
            <Typography variant="h6">Performance Metrics</Typography>
            <Typography variant="body1">Key performance indicators</Typography>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} sm={6} md={8}>
          <StyledPaper>
            <Typography variant="h6">Additional Section</Typography>
            <Typography variant="body1">Content for another section</Typography>
          </StyledPaper>
        </Grid>
      </Grid>
    </Root>
  );
};

export default Dashboard;
