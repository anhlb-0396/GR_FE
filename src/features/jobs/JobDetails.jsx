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
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import SendIcon from "@mui/icons-material/Send";
import Comments from "../../ui/Comments";

import { changeCurrency } from "../../utils/helpers";
import PaidIcon from "@mui/icons-material/Paid";

import JobList from "./JobList";
import { useJob } from "./useJob";
import { isBefore } from "date-fns";
import TitleText from "../../ui/inputs/TitleText";

const images = [
  "https://dxwd4tssreb4w.cloudfront.net/image/cbc2ef0d57c22790520b1a970314cfe9",
  "https://image.luatvietnam.vn/uploaded/twebp/images/original/2023/02/28/chuyen-nguoi-lao-dong-sang-lam-viec-khac_2802091944.png",
  "https://cdn.tgdd.vn/Files/2022/06/10/1438689/cong-viec-lam-them-cho-hoc-sinh-sinh-vien-6_800x450.jpg",
];

function JobDetails() {
  const { id } = useParams();
  const { job, isLoading, isError, error } = useJob(id);

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
            Công việc liên quan
          </Typography>

          <Grid item container gap="10px">
            <JobList></JobList>
          </Grid>
        </Grid>

        <Divider orientation="vertical" flexItem></Divider>

        <Grid item xs={12} md={3}>
          <Grid item container direction="column" gap={2}></Grid>

          <Divider>
            <Typography variant="h5">Bình luận</Typography>
          </Divider>

          <Grid item container direction="column" rowGap={2}>
            <Comments></Comments>
            <Comments></Comments>
            <Comments></Comments>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default JobDetails;
