import JobList from "../features/jobs/JobList";
import JobSearchInput from "./JobSearchInput";

function Homepage() {
  return (
    <div>
      <JobSearchInput></JobSearchInput>
      <JobList></JobList>
    </div>
  );
}

export default Homepage;
