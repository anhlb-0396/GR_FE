import JobList from "../features/jobs/JobList";
import JobSearchInput from "../ui/JobSearchInput";
import AppPagination from "../ui/AppPagination";

function Homepage() {
  return (
    <>
      <JobSearchInput></JobSearchInput>
      <JobList></JobList>
      <AppPagination></AppPagination>
    </>
  );
}

export default Homepage;
