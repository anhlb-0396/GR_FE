import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

import {
  Grid,
  Avatar,
  Stack,
  Chip,
  Typography,
  Paper,
  Button,
  IconButton,
} from "@mui/material";

import {
  PeopleAltRounded as PeopleAltRoundedIcon,
  LocationOn as LocationOnIcon,
  Work as WorkIcon,
  AccessTimeFilled as AccessTimeFilledIcon,
  AccountBalance as AccountBalanceIcon,
  Send as SendIcon,
  Bookmark as BookmarkIcon,
  PunchClock as PunchClockIcon,
  Paid as PaidIcon,
} from "@mui/icons-material";

import { changeCurrency } from "../../utils/helpers";

function JobItem({ job }) {
  const navigate = useNavigate();

  return (
    <Paper elevation={3} sx={{ borderRadius: "8px", p: "1rem", m: "0 auto" }}>
      <Grid
        container
        item
        sx={{ borderRadius: "10px", height: "auto" }}
        xs={12}
      >
        {/* job Image */}
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
            alt={job.Company.name}
            src={job.Company.logo}
            sx={{ width: "80%", height: "auto", objectFit: "cover" }}
            variant="rounded"
          />
        </Grid>

        {/* Job Information */}
        <Grid item xs={7} md={8}>
          <Grid container rowGap={1}>
            <Grid item xs={12}>
              <Typography variant="h6">{job.title}</Typography>
              <Typography variant="caption" fontWeight="400">
                {job.Company.name}
              </Typography>
            </Grid>

            <Grid item xs={12} container sx={{ mt: "1rem" }}>
              <Stack
                direction="row"
                flexWrap="wrap"
                width={{ xs: "100%", sm: "80%" }}
                gap={1}
              >
                <Chip
                  icon={<LocationOnIcon />}
                  label={job.Company.location}
                  size="small"
                />

                <Chip icon={<WorkIcon />} label={job.industry} size="small" />
                <Chip icon={<WorkIcon />} label={job.field} size="small" />

                <Chip
                  icon={<AccessTimeFilledIcon />}
                  label={job.working_type}
                  size="small"
                />

                <Chip
                  icon={<PeopleAltRoundedIcon />}
                  label={`${job.recruitment_number} người`}
                  size="small"
                />

                <Chip
                  icon={<AccountBalanceIcon />}
                  label={job.working_method}
                  size="small"
                />

                <Chip
                  icon={<PunchClockIcon />}
                  label={`${job.working_experience} năm kinh nghiệm`}
                  size="small"
                />

                <Chip
                  icon={<PaidIcon />}
                  label={`${changeCurrency(job.min_salary)} - ${changeCurrency(
                    job.max_salary
                  )} triệu`}
                  size="small"
                />
              </Stack>
            </Grid>
          </Grid>
        </Grid>

        {/* Action */}
        <Grid container item xs={3} md={2}>
          <Stack
            justifyContent="space-between"
            alignItems="flex-end"
            sx={{ width: "100%", p: 0 }}
          >
            <IconButton aria-label="bookmarks" size="small" color="error">
              <BookmarkIcon />
            </IconButton>

            <Chip
              icon={<AccessTimeFilledIcon />}
              label={`Hạn ${format(new Date(job.expired_date), "dd/MM/yyyy")}`}
              variant="outlined"
              color="error"
              size="small"
            />

            <Button
              size="small"
              variant="contained"
              endIcon={<SendIcon />}
              sx={{
                fontSize: { xs: 10, md: 12 },
                bgcolor: "primary",
                color: "white",
              }}
              onClick={() => navigate(`/jobs/${job.id}`)}
            >
              Ứng tuyển
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default JobItem;
