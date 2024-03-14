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
import Comments from "../ui/Comments";

import JobList from "../features/jobs/JobList";

const job = {
  id: 1,
  business_id: 1,
  title: "Thực Tập Sinh Tư Vấn Đầu Tư Chứng Khoán",
  description:
    "<p><strong>3 lý do để gia nhập công ty</strong></p>\n<p>&nbsp; 1. Dẫn đầu thị trường: Công ty này luôn đứng đầu trong việc định hình và thay đổi ngành công nghiệp, tạo ra cơ hội để tham gia vào các dự án tiên tiến và đổi mới.</p>\r\n                <p>&nbsp; 2. Cơ hội thử thách và phát triển bản thân: Tại đây, tôi được khích lệ và hỗ trợ để đối mặt với những thách thức mới, từ đó phát triển kỹ năng và nâng cao khả năng cá nhân.</p>\r\n                <p>&nbsp; 3. Môi trường làm việc đa dạng và sáng tạo: Công ty tạo điều kiện cho sự đa dạng về ý kiến, sự sáng tạo và cơ hội hợp tác với những người tài năng từ khắp nơi trên thế giới.</p>\r\n                <p><strong>Mô tả công việc</strong></p>\r\n                <p>&nbsp; Trách nhiệm chính của vị trí này tập trung vào việc [mô tả chi tiết về nhiệm vụ, trách nhiệm, và các hoạt động cụ thể]. Đây là một cơ hội tuyệt vời để [nhấn mạnh cơ hội phát triển, ảnh hưởng của công việc đối với mục tiêu của công ty, hoặc lợi ích cá nhân].</p>",
  salary: "5000000.0",
  recruitment_number: 16,
  industry: "Kinh doanh",
  field: "Chứng khoán",
  internship_duration: 2,
  internship_method: "offline",
  internship_type: "fulltime",
  is_closed: 0,
  created_at: "2023-10-23T06:55:32.000000Z",
  updated_at: "2023-12-05T22:55:32.000000Z",
  business: {
    id: 1,
    name: "Công ty cổ phần chứng khoán VPS",
    industry: "Kinh doanh/ Bán hàng",
    location: "2A Đại Cồ Việt, Hai Bà Trưng, Hà Nội",
    country: "Việt Nam",
    province: "Thành phố Hà Nội",
    employees_number: 1200,
    business_logo:
      "https://cdn-new.topcv.vn/unsafe/140x/filters:format(webp)/https://static.topcv.vn/company_logos/cong-ty-co-phan-chung-khoan-vps-5ff1a3dc0a075.jpg",
    website: "https://www.vps.com.vn/",
    contact_email: "ckvps@gmail.com",
    created_at: "2023-12-25T07:55:32.000000Z",
    updated_at: "2023-12-23T17:55:32.000000Z",
    start_week_day: 1,
    end_week_day: 6,
  },
  images: [
    "https://dxwd4tssreb4w.cloudfront.net/image/cbc2ef0d57c22790520b1a970314cfe9",
    "https://image.luatvietnam.vn/uploaded/twebp/images/original/2023/02/28/chuyen-nguoi-lao-dong-sang-lam-viec-khac_2802091944.png",
    "https://cdn.tgdd.vn/Files/2022/06/10/1438689/cong-viec-lam-them-cho-hoc-sinh-sinh-vien-6_800x450.jpg",
  ],
};

function JobDetails() {
  return (
    <Box sx={{ width: "90%", margin: "0 auto" }}>
      <Grid container justifyContent="space-between">
        <Grid item xs={12} md={8} container flexDirection="column" rowGap={4}>
          <Grid item container rowGap={2}>
            <Grid item container direction="column" gap={2}>
              <Typography variant="h4" sx={{ fontWeight: "500" }}>
                {job.title}
              </Typography>

              <Typography variant="h5" sx={{ fontWeight: "300" }}>
                {job.business.name}
              </Typography>

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

              <Grid item container justifyContent="flex-start">
                <AttachMoneyIcon />
                <Typography level="title-md">
                  Lương: {job.salary || "Thỏa thuận"}
                </Typography>
              </Grid>
            </Grid>
            {/* For images */}
            <Grid item container>
              <ImageList cols={3} rowHeight="auto">
                {job.images.map((image, index) => (
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
                <strong>Thời gian thực tập:</strong>
                <Chip
                  size="small"
                  label={`${job.internship_duration} tháng`}
                ></Chip>
              </Typography>
              <Typography>
                <strong>Phương thức thực tập:</strong>
                <Chip size="small" label={job.internship_method}></Chip>
              </Typography>
              <Typography>
                <strong>Loại hình thực tập:</strong>
                <Chip size="small" label={job.internship_type}></Chip>
              </Typography>
              <Typography>
                <strong>Số lượng tuyển dụng:</strong>
                <Chip size="small" label={job.recruitment_number}></Chip>
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
