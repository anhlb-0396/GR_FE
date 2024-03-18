import JobList from "../features/jobs/JobList";
import JobSearchInput from "../ui/inputs/JobSearchInput";
import { Box } from "@mui/material";
import Chart from "../ui/charts/Chart";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const { handleLogout } = useAuth();
  const navigate = useNavigate();

  return (
    <Box sx={{ width: { md: "80%", xs: "100%" }, margin: "0 auto" }}>
      <button
        onClick={() => {
          handleLogout();
          navigate("/login");
        }}
      >
        Logout
      </button>
      <Chart></Chart>
      <JobSearchInput></JobSearchInput>
      <JobList></JobList>
    </Box>
  );
}

export default Homepage;
