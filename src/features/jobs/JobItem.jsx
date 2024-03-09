import { Grid, Avatar } from "@mui/material";

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

function JobItem() {
  return (
    <Grid container sx={{ bgcolor: "beige", borderRadius: "10px" }} xs={12}>
      <Grid item xs={2}>
        <Avatar
          alt="Ava"
          variant="rounded"
          src={job.business_logo}
          sx={{ width: "100%", objectFit: "cover", height: "100%" }}
        />
      </Grid>
      <Grid item xs={8}>
        <Grid container>
          <Grid item xs={12}>
            <h3>{job.title}</h3>
          </Grid>
          <Grid item xs={12}>
            <p>{job.business_name}</p>
          </Grid>
          <Grid item xs={12}>
            <p>{job.province}</p>
          </Grid>
          <Grid item xs={12}>
            <p>{job.salary}</p>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={2}>
        <p>Deadline</p>
      </Grid>
    </Grid>
  );
}

export default JobItem;
