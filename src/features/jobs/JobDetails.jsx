import { useParams } from "react-router-dom";
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
} from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

import BookmarkIcon from "@mui/icons-material/Bookmark";
import SendIcon from "@mui/icons-material/Send";
import Comments from "../comments/Comments";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import WcIcon from "@mui/icons-material/Wc";

import { changeCurrency } from "../../utils/helpers";
import PaidIcon from "@mui/icons-material/Paid";

import JobList from "./JobList";
import { useJob } from "./useJob";
import { isBefore } from "date-fns";
import TitleText from "../../ui/inputs/TitleText";
import { useState } from "react";

import Rating from "@mui/material/Rating";
import CompanySummaryCard from "../companies/CompanySummaryCard";
import { useAuth } from "../../contexts/AuthContext";
import { company } from "faker/lib/locales/az";
import { useCreateComment } from "../comments/userCreateComment";
import CommentList from "../comments/CommentList";

const images = [
  "https://dxwd4tssreb4w.cloudfront.net/image/cbc2ef0d57c22790520b1a970314cfe9",
  "https://image.luatvietnam.vn/uploaded/twebp/images/original/2023/02/28/chuyen-nguoi-lao-dong-sang-lam-viec-khac_2802091944.png",
  "https://cdn.tgdd.vn/Files/2022/06/10/1438689/cong-viec-lam-them-cho-hoc-sinh-sinh-vien-6_800x450.jpg",
];

const initialRatings = {
  salary_rating: 0,
  working_space_rating: 0,
  colleague_relationship_rating: 0,
};

function JobDetails() {
  const { id } = useParams();
  const { job, isLoading, isError, error } = useJob(id);
  const [isOpenCommentDialog, setIsOpenCommentDialog] = useState(false);
  const { currentUser, token } = useAuth();

  const { createComment, isCreating } = useCreateComment();

  const [ratings, setRatings] = useState(initialRatings);

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

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;

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
                  size="large"
                  variant="outlined"
                  color="success"
                />

                <Chip
                  label={
                    isBefore(new Date(job.expired_date), new Date())
                      ? "Hết hạn"
                      : "Đang tuyển dụng"
                  }
                  size="large"
                  variant="outlined"
                  color="success"
                />
              </Grid>

              <Stack
                variant="outlined"
                color="primary"
                direction="row"
                flexWrap="wrap"
                justifyContent="space-between"
              >
                <Button
                  startIcon={<SendIcon></SendIcon>}
                  variant="outlined"
                  color="primary"
                >
                  Ứng tuyển ngay
                </Button>

                <IconButton aria-label="bookmarks" size="md">
                  <BookmarkIcon />
                </IconButton>
              </Stack>

              <Stack>
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={handleCommentDialogClickOpen}
                >
                  Viết đánh giá về công ty này
                </Button>

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
                {images.map((image, index) => (
                  <ImageListItem key={index}>
                    <img
                      src={image}
                      alt={job.title}
                      style={{ borderRadius: "5px" }}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Grid>
            {/* For additional information */}
            <Grid item container direction="column" gap={2}>
              <Typography variant="h5" fontWeight="bold">
                Thông tin thêm
              </Typography>
              <Typography>
                <strong>Ngành nghề:</strong>
                <Chip size="small" label={job.industry}></Chip>
              </Typography>
              <Typography>
                <strong>Lĩnh vực:</strong>
                <Chip size="small" label={job.field}></Chip>
              </Typography>
              <Typography>
                <strong>Kinh nghiệm:</strong>
                <Chip
                  size="small"
                  label={`${job.working_experience} năm`}
                ></Chip>
              </Typography>
              <Typography>
                <strong>Phương thức làm việc:</strong>
                <Chip size="small" label={job.working_method}></Chip>
              </Typography>
              <Typography>
                <strong>Loại hình làm việc:</strong>
                <Chip size="small" label={job.working_type}></Chip>
              </Typography>
              <Typography>
                <strong>Số lượng tuyển dụng:</strong>
                <Chip
                  size="small"
                  label={`${job.recruitment_number} nhân viên`}
                ></Chip>
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

          <Typography
            variant="h4"
            fontWeight="bold"
            textAlign="center"
            color="primary"
          >
            Các công việc khác
          </Typography>

          <Grid item container gap="10px">
            <JobList></JobList>
          </Grid>
        </Grid>

        <Divider orientation="vertical" flexItem></Divider>

        <Grid item xs={12} md={3}>
          <CompanySummaryCard></CompanySummaryCard>

          <Divider>
            <TitleText variant="h5">Bình luận</TitleText>
          </Divider>

          <CommentList companyId={job.company_id}></CommentList>
        </Grid>
      </Grid>
    </Box>
  );
}

export default JobDetails;
