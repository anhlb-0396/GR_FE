import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Avatar,
  Paper,
  Button,
  Link,
  CircularProgress,
  Alert,
  Rating,
  Tabs,
  Tab,
} from "@mui/material";
import {
  LocationOn,
  Web,
  PeopleAlt as PeopleAltIcon,
  Mail as MailIcon,
  Flag as FlagIcon,
} from "@mui/icons-material";
import TitleText from "../../ui/sharedComponents/TitleText";
import { useParams } from "react-router-dom";
import { useCompany } from "../agents/companies/useCompany";
import { useJobs } from "../agents/jobs/useJobs";
import AppPagination from "../../ui/sharedComponents/AppPagination";
import JobItem from "../jobs/JobItem";
import CommentList from "../comments/CommentList";

const JOB_PER_PAGE = 4;
const DEFAULT_COVER_IMAGE =
  "https://static.topcv.vn/v4/image/normal-company/cover/company_cover_1.jpg";

const CompanyDetailsPage = ({ companyId }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const { id } = useParams();
  const { company, isLoading, isError } = useCompany(id || companyId);
  const {
    jobs,
    isLoading: isJobsLoading,
    isError: isJobsError,
  } = useJobs(id || companyId);
  const [currentPage, setCurrentPage] = useState(1);
  const [tabValue, setTabValue] = useState(0);

  if (isLoading || isJobsLoading) {
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

  if (isError || isJobsError) {
    return (
      <Box sx={{ width: "80%", margin: "0 auto" }}>
        <Alert severity="error">Tải dữ liệu thất bại</Alert>
      </Box>
    );
  }

  const startIndex = (currentPage - 1) * JOB_PER_PAGE;
  const endIndex = currentPage * JOB_PER_PAGE;
  const paginatedJobs = jobs.slice(startIndex, endIndex);
  const count = Math.ceil(jobs.length / JOB_PER_PAGE);

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
  };

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Box mt={4} mb={4}>
        <Card sx={{ borderRadius: 2, overflow: "hidden" }}>
          <CardMedia
            component="img"
            height="300"
            image={company?.cover_image || DEFAULT_COVER_IMAGE}
            alt="Company cover image"
          />
          <CardContent sx={{ position: "relative" }}>
            <Grid container spacing={2} alignItems="center" columnGap={1}>
              <Grid item xs={12} md={5} sx={{ textAlign: "center" }}>
                <Avatar
                  alt={company.name}
                  src={company.logo}
                  sx={{
                    width: "100%",
                    height: "250px",
                    margin: "0 auto",
                    objectFit: "cover",
                  }}
                  variant="rounded"
                />
              </Grid>
              <Grid item xs={12} md={6.5}>
                <TitleText variant="h4" textAlign="left">
                  {company.name}
                </TitleText>

                <Box display="flex" alignItems="center" mt={1}>
                  <LocationOn color="action" />
                  <Typography
                    variant="body1"
                    ml={1}
                    color="textSecondary"
                    gutterBottom
                  >
                    {company.location}
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" mt={1}>
                  <MailIcon color="action" />
                  <Typography
                    variant="body1"
                    ml={1}
                    color="textSecondary"
                    gutterBottom
                  >
                    {company.contact_mail}
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" mt={1}>
                  <PeopleAltIcon color="action" />
                  <Typography
                    variant="body1"
                    ml={1}
                    color="textSecondary"
                    gutterBottom
                  >
                    {company.employees} nhân viên
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" mt={1}>
                  <FlagIcon color="action" />
                  <Typography
                    variant="body1"
                    ml={1}
                    color="textSecondary"
                    gutterBottom
                  >
                    {company.country}
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" mt={1}>
                  <Web color="action" />
                  <Typography variant="body1" ml={1}>
                    <Link
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      color="textSecondary"
                      sx={{ textDecoration: "none" }}
                    >
                      {company.website}
                    </Link>
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  color={isFollowing ? "secondary" : "primary"}
                  onClick={handleFollowClick}
                  sx={{ mt: 2 }}
                >
                  {isFollowing ? "Following" : "Follow"}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Box mt={4}>
          <Tabs value={tabValue} onChange={handleTabChange} centered>
            <Tab label="Giới thiệu" />
            <Tab label="Đánh giá" />
            <Tab label="Bình luận" />
          </Tabs>
          {tabValue === 0 && (
            <Box mt={4}>
              <TitleText variant="h5" textAlign="left">
                Giới thiệu về công ty
              </TitleText>
              <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, mt: 1 }}>
                <Typography
                  dangerouslySetInnerHTML={{ __html: company.introduction }}
                  variant="body1"
                  color="text.secondary"
                ></Typography>
              </Paper>
            </Box>
          )}
          {tabValue === 1 && (
            <Box mt={4}>
              <TitleText variant="h5" textAlign="left">
                Đánh giá công ty
              </TitleText>
              <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, mt: 1 }}>
                <Box
                  display="flex"
                  alignItems="center"
                  sx={{ mt: 1 }}
                  justifyContent="space-between"
                >
                  <Typography variant="body1" color="text.secondary">
                    Đánh giá trung bình:
                  </Typography>
                  <Rating
                    name="averageRating"
                    value={company?.average_rating}
                    precision={0.5}
                    readOnly
                    sx={{ ml: 1 }}
                  />
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  sx={{ mt: 1 }}
                  justifyContent="space-between"
                >
                  <Typography variant="body1" color="text.secondary">
                    Lương thưởng đãi ngộ:
                  </Typography>
                  <Rating
                    name="averageRating"
                    value={company?.average_salary_rating}
                    precision={0.5}
                    readOnly
                    sx={{ ml: 1 }}
                  />
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  sx={{ mt: 1 }}
                  justifyContent="space-between"
                >
                  <Typography variant="body1" color="text.secondary">
                    Môi trường làm việc:
                  </Typography>
                  <Rating
                    name="averageRating"
                    value={company?.average_working_space_rating}
                    precision={0.5}
                    readOnly
                    sx={{ ml: 1 }}
                  />
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  sx={{ mt: 1 }}
                  justifyContent="space-between"
                >
                  <Typography variant="body1" color="text.secondary">
                    Nhân sự:
                  </Typography>
                  <Rating
                    name="averageRating"
                    value={company?.average_colleague_rating}
                    precision={0.5}
                    readOnly
                    sx={{ ml: 1 }}
                  />
                </Box>
              </Paper>
            </Box>
          )}
          {tabValue === 2 && (
            <Grid item xs={12} container>
              <Box>
                <Grid item container xs={12} alignItems="center" mb={3}>
                  <TitleText variant="h5">Bình luận về doanh nghiệp</TitleText>
                </Grid>
              </Box>
              <CommentList companyId={company.id} isAgent />
            </Grid>
          )}
        </Box>

        <Box mt={4}>
          <TitleText variant="h5" textAlign="left">
            Công việc đăng tuyển {`(${jobs.length})`}
          </TitleText>

          <Grid container spacing={2} rowGap={4} margin="10px auto" mt={3}>
            {paginatedJobs?.map((job) => (
              <JobItem job={job} key={job.id} />
            ))}
          </Grid>
          <AppPagination
            onChange={handleChangePage}
            currentPage={currentPage}
            count={count}
          ></AppPagination>
        </Box>
      </Box>
    </Container>
  );
};

export default CompanyDetailsPage;
