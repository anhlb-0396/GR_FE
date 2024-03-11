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
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SendIcon from "@mui/icons-material/Send";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";

function JobItem({ company }) {
  return (
    <Paper elevation={3} sx={{ borderRadius: "8px", p: "1rem", m: "0 auto" }}>
      <Grid container sx={{ borderRadius: "10px", height: "auto" }} xs={12}>
        {/* Company Image */}
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

        {/* Job Information */}
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
                flexWrap="wrap"
                width={{ xs: "100%", sm: "80%" }}
                gap={1}
              >
                <Chip
                  icon={<LocationOnIcon />}
                  label={company.location}
                  size="small"
                />

                <Chip
                  icon={<WorkIcon />}
                  label={company.industry}
                  size="small"
                />
                <Chip icon={<WorkIcon />} label={company.field} size="small" />

                <Chip
                  icon={<AccessTimeFilledIcon />}
                  label={company.internship_type}
                  size="small"
                />

                <Chip
                  icon={<PeopleAltRoundedIcon />}
                  label={`${company.recruitment_number} người`}
                  size="small"
                />

                <Chip
                  icon={<AccountBalanceIcon />}
                  label={company.internship_method}
                  size="small"
                />
              </Stack>
            </Grid>
          </Grid>
        </Grid>

        {/* Action */}
        <Grid container item xs={2}>
          <Stack
            justifyContent="space-between"
            alignItems="flex-end"
            sx={{ width: "100%", p: 0 }}
          >
            <IconButton aria-label="bookmarks" size="small">
              <BookmarkIcon />
            </IconButton>

            <Button
              size="small"
              variant="contained"
              endIcon={<SendIcon />}
              sx={{ fontSize: 12, bgcolor: "error.light", color: "white" }}
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
