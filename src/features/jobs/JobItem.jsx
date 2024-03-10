import { Grid, Avatar, Stack, Chip, Typography, Paper } from "@mui/material";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";

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
  business_name: "Công ty cổ phần chứng khoán VPS",
  province: "Thành phố Hà Nội",
  location: "2A Đại Cồ Việt, Hai Bà Trưng, Hà Nội",
  business_logo:
    "https://cdn-new.topcv.vn/unsafe/140x/filters:format(webp)/https://static.topcv.vn/company_logos/cong-ty-co-phan-chung-khoan-vps-5ff1a3dc0a075.jpg",
};

function JobItem({ company }) {
  return (
    // <Grid container sx={{ borderRadius: "10px", height: "auto" }} xs={12}>
    //   <Grid
    //     item
    //     xs={2}
    //     sx={{
    //       display: "flex",
    //       alignItems: "center",
    //       justifyContent: "center",
    //     }}
    //   >
    //     <Avatar
    //       alt={job.business_name}
    //       src={job.business_logo}
    //       sx={{ width: "80%", height: "auto", objectFit: "cover" }}
    //       variant="rounded"
    //     />
    //   </Grid>
    //   <Grid item xs={8}>
    //     <Grid container rowGap={1}>
    //       <Grid item xs={12}>
    //         <Typography variant="h6">{job.title}</Typography>
    //         <Typography variant="caption" fontWeight="400">
    //           {job.business_name}
    //         </Typography>
    //       </Grid>

    //       <Grid item xs={12} container sx={{ mt: "1rem" }}>
    //         <Stack
    //           direction="row"
    //           spacing={1}
    //           flexWrap="wrap"
    //           width="20rem"
    //           rowGap="5px"
    //         >
    //           <Chip label="Clickable" size="small" />
    //           <Chip label="Clickable" size="small" />
    //           <Chip label="Clickable" size="small" />
    //           <Chip label="Clickable" size="small" />
    //           <Chip label="Clickable" size="small" />
    //           <Chip label="Clickable" size="small" />
    //           <Chip label="Clickable" size="small" />
    //           <Chip label="Clickable" size="small" />
    //         </Stack>
    //       </Grid>
    //     </Grid>
    //   </Grid>
    //   <Grid item xs={2} bgcolor={"green"}>
    //     <p>Deadline</p>
    //   </Grid>
    // </Grid>

    <Paper elevation={2} sx={{ borderRadius: "10px", p: "1rem", m: "0 auto" }}>
      <Grid container sx={{ borderRadius: "10px", height: "auto" }} xs={12}>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar
            alt={company.business_name}
            src={company.business_logo}
            sx={{ width: "80%", height: "auto", objectFit: "cover" }}
            variant="rounded"
          />
        </Grid>
        <Grid item xs={8}>
          <Grid container rowGap={1}>
            <Grid item xs={12}>
              <Typography variant="h6">{company.title}</Typography>
              <Typography variant="caption" fontWeight="400">
                {company.business_name}
              </Typography>
            </Grid>

            <Grid item xs={12} container sx={{ mt: "1rem" }}>
              <Stack
                direction="row"
                spacing={1}
                flexWrap="wrap"
                width={{ xs: "100%", sm: "80%" }}
                rowGap="5px"
              >
                <Chip label="Clickable" size="small" />
                <Chip label="Clickable" size="small" />
                <Chip label="Clickable" size="small" />
                <Chip label="Clickable" size="small" />
                <Chip label="Clickable" size="small" />
                <Chip label="Clickable" size="small" />
                <Chip label="Clickable" size="small" />
                <Chip label="Clickable" size="small" />
                <Chip label="Clickable" size="small" />
                <Chip label="Clickable" size="small" />
                <Chip label="Clickable" size="small" />
                <Chip label="Clickable" size="small" />
                <Chip label="Clickable" size="small" />
              </Stack>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          container
          item
          xs={2}
          direction="column"
          justifyContent="space-between"
          spacing={1}
        >
          <Grid item container sx={{ mt: "1rem" }} rowGap="10px">
            <Grid item container>
              <PaidOutlinedIcon fontSize="small" />
              <Typography variant="caption" sx={{ ml: 1 }}>
                {company.salary}
              </Typography>
            </Grid>

            <Grid item container>
              <PeopleAltRoundedIcon fontSize="small" />
              <Typography variant="caption" sx={{ ml: 1 }}>
                Number: {company.recruitment_number}
              </Typography>
            </Grid>
          </Grid>

          <Grid
            item
            sx={{
              backgroundColor: "red",
              borderRadius: "5px",
              padding: "5px",
              textAlign: "center",
            }}
          >
            {" "}
            {/* Add background color, padding, border radius, and center text */}
            <Typography variant="body2" sx={{ color: "#fff" }}>
              12/11/2022
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default JobItem;
