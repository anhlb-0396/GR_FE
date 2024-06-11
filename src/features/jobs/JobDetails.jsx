import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Grid,
  Box,
  ImageList,
  ImageListItem,
  Typography,
  Chip,
  Button,
  Stack,
  IconButton,
  Divider,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  CircularProgress,
  Rating,
  Tabs,
  Tab,
} from "@mui/material";

import {
  Bookmark as BookmarkIcon,
  Send as SendIcon,
  MapsHomeWork as MapsHomeWorkIcon,
  Wc as WcIcon,
  LocalOffer as LocalOfferIcon,
  Paid as PaidIcon,
  PeopleAlt as PeopleAltIcon,
  SupportAgent as SupportAgentIcon,
  Chat,
  AccessTime as AccessTimeIcon,
  UpdateDisabled as UpdateDisabledIcon,
  WorkHistory,
} from "@mui/icons-material";

import { toast } from "react-hot-toast";
import { useJob } from "./useJob";
import { isBefore } from "date-fns";
import { useAuth } from "../../contexts/AuthContext";
import { useCreateComment } from "../comments/userCreateComment";
import { changeCurrency } from "../../utils/helpers";

import JobList from "./JobList";
import Bookmark from "../bookmarks/Bookmark";
import Apply from "../applies/Apply";
import CommentList from "../comments/CommentList";
import CompanySummaryCard from "../companies/CompanySummaryCard";
import TitleText from "../../ui/sharedComponents/TitleText";
import RelatedJobist from "./RelatedJobList";
import CompanyJobList from "./CompanyJobList";
import { useSocket } from "../../contexts/SocketContext";

const initialRatings = {
  salary_rating: 0,
  working_space_rating: 0,
  colleague_relationship_rating: 0,
};

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { job, isLoading, isError } = useJob(id);
  const [isOpenCommentDialog, setIsOpenCommentDialog] = useState(false);
  const { currentUser, token, isAuthenticated } = useAuth();
  const { createComment, isCreating } = useCreateComment();
  const [ratings, setRatings] = useState(initialRatings);
  const [selectedTab, setSelectedTab] = useState(0);
  const { setCurrentChatUserId, setChattingUsers } = useSocket();

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleRatingChange = (name, value) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [name]: value,
    }));
  };

  const handleCommentDialogClickOpen = () => {
    setIsOpenCommentDialog(true);
  };

  const handleCommentDialogClickClose = () => {
    setIsOpenCommentDialog(false);
  };

  const handleNotLoginBookmark = () => {
    if (!isAuthenticated) {
      toast.error("Vui lòng đăng nhập để lưu công việc này !");
      return;
    }
  };

  const handleNotLoginApply = () => {
    if (!isAuthenticated) {
      toast.error("Vui lòng đăng nhập để tham gia ứng tuyển công việc này !");
      return;
    }
  };

  const handleChattingWithAgent = () => {
    const agentId = job.Company.User.id;
    if (!agentId) {
      toast.error("Không thể liên lạc được với HR");
      return;
    }

    setCurrentChatUserId(agentId);
    setChattingUsers((prev) => {
      if (!prev.map((user) => user.id).includes(agentId)) {
        return [
          ...prev,
          {
            id: agentId,
            name: job.Company.User.name,
            avatar: job.Company.User.avatar,
          },
        ];
      }
      return prev;
    });
    navigate("/user/chats");
  };

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
        <Alert severity="error">Không có dữ liệu nào về công việc này!!!</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "90%", margin: "0 auto" }}>
      <Grid container justifyContent="space-between">
        <Grid item xs={12} md={8} container flexDirection="column" rowGap={4}>
          <Grid item container rowGap={2}>
            <Grid item container direction="column" gap={2}>
              <TitleText textAlign="left">{job.title}</TitleText>
              <TitleText textAlign="left" variant="title">
                {job.Company.name}
              </TitleText>

              <Grid container gap={2}>
                <Chip
                  icon={<PaidIcon />}
                  label={`Lương dao động từ ${changeCurrency(
                    job.min_salary
                  )} - ${changeCurrency(job.max_salary)} triệu`}
                  size="medium"
                  variant="outlined"
                  color="success"
                />

                <Grid container gap={2}>
                  <Chip
                    icon={<AccessTimeIcon />}
                    label={`Hạn nộp hồ sơ: ${new Date(
                      job.expired_date
                    ).toLocaleDateString()}`}
                    size="medium"
                    variant="filled"
                    color="primary"
                  />

                  <Chip
                    icon={
                      isBefore(new Date(job.expired_date), new Date()) ? (
                        <UpdateDisabledIcon />
                      ) : (
                        <WorkHistory />
                      )
                    }
                    label={
                      isBefore(new Date(job.expired_date), new Date())
                        ? "Đã hết hạn ứng tuyển"
                        : "Đang tuyển dụng"
                    }
                    size="medium"
                    variant="filled"
                    color={
                      isBefore(new Date(job.expired_date), new Date())
                        ? "error"
                        : "success"
                    }
                    sx={{ color: "white" }}
                  />

                  <Chip
                    icon={<PeopleAltIcon />}
                    label={`${job.Applies.length} ứng viên đã ứng tuyển`}
                    size="medium"
                    variant="outlined"
                    color="primary"
                  />
                </Grid>
              </Grid>

              <Grid>
                <Button
                  variant="contained"
                  startIcon={<SupportAgentIcon />}
                  endIcon={<Chat />}
                  disableRipple
                  size="small"
                  onClick={handleChattingWithAgent}
                >
                  Liên hệ với nhà tuyển dụng
                </Button>
              </Grid>

              <Stack
                variant="outlined"
                color="primary"
                direction="row"
                flexWrap="wrap"
                justifyContent="space-between"
              >
                {!isAuthenticated &&
                  isBefore(new Date(job.expired_date), new Date()) && (
                    <Button
                      startIcon={<SendIcon></SendIcon>}
                      variant="outlined"
                      color="primary"
                      onClick={handleNotLoginApply}
                    >
                      Ứng tuyển ngay
                    </Button>
                  )}

                {isAuthenticated &&
                  (!isBefore(new Date(job.expired_date), new Date()) &&
                  job.recruitment_number > 0 ? (
                    <Apply
                      job={job}
                      currentUser={currentUser}
                      token={token}
                      isAuthenticated={isAuthenticated}
                    ></Apply>
                  ) : (
                    <Button>
                      Đã hết hạn ứng tuyển hoặc đã đủ số lượng tuyển dụng
                    </Button>
                  ))}

                {!isAuthenticated && (
                  <IconButton>
                    <BookmarkIcon onClick={handleNotLoginBookmark} />
                  </IconButton>
                )}

                {isAuthenticated && (
                  <Bookmark
                    job={job}
                    currentUser={currentUser}
                    token={token}
                    isAuthenticated={isAuthenticated}
                  ></Bookmark>
                )}
              </Stack>

              <Stack>
                {isAuthenticated && (
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={handleCommentDialogClickOpen}
                  >
                    Viết đánh giá về công ty này
                  </Button>
                )}

                {!isAuthenticated && (
                  <Button color="primary" variant="outlined" disabled>
                    Đăng nhập để viết đánh giá về công ty này
                  </Button>
                )}

                <Dialog
                  open={isOpenCommentDialog}
                  onClose={handleCommentDialogClickClose}
                  PaperProps={{
                    component: "form",
                    onSubmit: (event) => {
                      event.preventDefault();
                      const formData = new FormData(event.currentTarget);
                      const formJson = Object.fromEntries(formData.entries());
                      const comment = formJson.comment;
                      setRatings(initialRatings);

                      const commentObject = {
                        ...ratings,
                        comment,
                        user_id: currentUser.id,
                        company_id: job.company_id,
                        token,
                      };

                      createComment(commentObject);
                      handleCommentDialogClickClose();
                    },
                  }}
                >
                  <DialogTitle>
                    <TitleText variant="h5">Đánh giá công ty</TitleText>
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Để lại đánh giá bình luận của bản thân về công ty này và
                      đánh giá chất lượng không gian làm việc, chế độ lương
                      thưởng và nhân sự trong công ty
                    </DialogContentText>
                    <Grid
                      container
                      mt={2}
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Chip
                        icon={<PaidIcon />}
                        label="Đánh giá lương thưởng"
                        size="large"
                        variant="outlined"
                        color="primary"
                      />
                      <Rating
                        value={ratings.salary_rating}
                        onChange={(event, newValue) =>
                          handleRatingChange("salary_rating", newValue)
                        }
                        name="salary_rating"
                        label="Đánh giá lương thưởng"
                      />
                    </Grid>

                    <Grid
                      container
                      mt={2}
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Chip
                        icon={<MapsHomeWorkIcon />}
                        label="Đánh giá không gian làm việc"
                        size="large"
                        variant="outlined"
                        color="primary"
                      />
                      <Rating
                        value={ratings.working_space_rating}
                        onChange={(event, newValue) =>
                          handleRatingChange("working_space_rating", newValue)
                        }
                        name="working_space_rating"
                        label="Đánh giá không gian làm việc"
                      />
                    </Grid>

                    <Grid
                      container
                      mt={2}
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Chip
                        icon={<WcIcon />}
                        label="Đánh giá mối quan hệ với đồng nghiệp"
                        size="large"
                        variant="outlined"
                        color="primary"
                      />
                      <Rating
                        value={ratings.colleague_relationship_rating}
                        onChange={(event, newValue) =>
                          handleRatingChange(
                            "colleague_relationship_rating",
                            newValue
                          )
                        }
                        name="colleague_relationship_rating"
                        label="Đánh giá mối quan hệ với đồng nghiệp"
                      />
                    </Grid>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      label="Bình luận"
                      variant="outlined"
                      margin="dense"
                      required
                      name="comment"
                      id="comment"
                      sx={{ mt: 3 }}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCommentDialogClickClose}>Hủy</Button>
                    <Button type="submit" disabled={isCreating}>
                      Đánh giá ngay
                    </Button>
                  </DialogActions>
                </Dialog>
              </Stack>
            </Grid>
            {/* For images */}
            <Grid item container>
              <ImageList cols={3} rowHeight="auto">
                {job.handledImages.map((image) => (
                  <ImageListItem key={image.id}>
                    <img
                      src={image.image}
                      alt={job.title}
                      style={{ borderRadius: "5px" }}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Grid>
            {/* For additional information */}
            <Grid item container direction="column" gap={2}>
              <TitleText>Thông tin thêm</TitleText>

              <Typography color="text.secondary">
                <strong>Kinh nghiệm:</strong>
                <Chip
                  size="small"
                  label={
                    job.working_experience > 0
                      ? `${job.working_experience} năm`
                      : "Không yêu cầu kinh nghiệm"
                  }
                  color="error"
                  variant="filled"
                  sx={{ ml: 1, color: "white" }}
                ></Chip>
              </Typography>

              <Typography color="text.secondary">
                <strong>Phương thức làm việc:</strong>
                <Chip
                  size="small"
                  label={job.working_method}
                  color="error"
                  variant="filled"
                  sx={{ ml: 1, color: "white" }}
                ></Chip>
              </Typography>

              <Typography color="text.secondary">
                <strong>Loại hình làm việc:</strong>
                <Chip
                  size="small"
                  label={job.working_type}
                  color="error"
                  variant="filled"
                  sx={{ ml: 1, color: "white" }}
                ></Chip>
              </Typography>

              <Typography color="text.secondary">
                <strong>Số lượng tuyển dụng:</strong>
                <Chip
                  size="small"
                  label={`${job.recruitment_number} nhân viên`}
                  color="error"
                  variant="filled"
                  sx={{ ml: 1, color: "white" }}
                ></Chip>
              </Typography>

              <Typography color="text.secondary">
                <strong>Cấp bậc:</strong>
                <Chip
                  size="small"
                  label={job.degree}
                  color="error"
                  variant="filled"
                  sx={{ ml: 1, color: "white" }}
                ></Chip>
              </Typography>

              <Typography color="text.secondary">
                <strong>Địa điểm làm việc:</strong>
                <Chip
                  size="small"
                  label={job.Province.name}
                  color="error"
                  variant="filled"
                  sx={{ ml: 1, color: "white" }}
                ></Chip>
              </Typography>

              <Typography color="text.secondary">
                <strong>Thời gian làm việc:</strong>
                <Chip
                  size="small"
                  label={`Từ thứ ${job.start_week_day} đến thứ ${job.end_week_day} hàng tuần`}
                  color="error"
                  variant="filled"
                  sx={{ ml: 1, color: "white" }}
                ></Chip>
              </Typography>

              <Typography color="text.secondary">
                <strong>Ngành nghề:</strong>
                {job.Industries.map((industry) => (
                  <Chip
                    key={industry.id}
                    size="small"
                    label={industry.industry}
                    color="error"
                    variant="filled"
                    sx={{ ml: 1, color: "white" }}
                  ></Chip>
                ))}
              </Typography>
            </Grid>
          </Grid>

          <Grid item>
            <Typography
              variant="h4"
              fontWeight="bold"
              textAlign="center"
              color="primary"
            >
              Mô tả công việc
            </Typography>
            <Typography
              dangerouslySetInnerHTML={{ __html: job.description }}
              variant="body2"
              color="text.secondary"
              sx={{
                mt: 4,
                p: 3,
                border: "1px solid #e0e0e0",
                borderRadius: "5px",
              }}
            ></Typography>
          </Grid>

          <Grid item container columnGap={1}>
            {job.Tags.map((tag) => (
              <Chip
                key={tag.id}
                label={tag.tag}
                color="primary"
                sx={{ color: "white" }}
                icon={<LocalOfferIcon></LocalOfferIcon>}
                size="small"
              ></Chip>
            ))}
          </Grid>

          <Typography
            variant="h4"
            fontWeight="bold"
            textAlign="center"
            color="primary"
          >
            Các công việc khác
          </Typography>

          <Box>
            <Tabs value={selectedTab} onChange={handleChange} centered>
              <Tab label="Tất cả" />
              <Tab label="Cùng lĩnh vực/ngành nghề" />
              <Tab label="Cùng công ty" />
            </Tabs>
            {selectedTab === 0 && (
              <Grid item container gap="10px">
                <JobList />
              </Grid>
            )}
            {selectedTab === 1 && (
              <Grid item container gap="10px">
                <RelatedJobist job={job} />
              </Grid>
            )}
            {selectedTab === 2 && (
              <Grid item container gap="10px">
                <CompanyJobList company={job.Company} />
              </Grid>
            )}
          </Box>
        </Grid>

        <Divider orientation="vertical" flexItem></Divider>

        <Grid item xs={12} md={3}>
          <CompanySummaryCard company={job.Company}></CompanySummaryCard>

          <Divider sx={{ mt: 5, mb: 3 }}>
            <TitleText variant="h5">Bình luận</TitleText>
          </Divider>

          <CommentList companyId={job.company_id}></CommentList>
        </Grid>
      </Grid>
    </Box>
  );
}

export default JobDetails;
