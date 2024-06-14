import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "react-hot-toast";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import Homepage from "./pages/Homepage";
import JobDetails from "./features/jobs/JobDetails";
import AppLayouts from "./ui/layouts/guest/AppLayouts";
import Login from "./features/authentication/Login";
import Register from "./features/authentication/Register";
import ProtectedRoute from "./pages/ProtectedRoute";
import ResumePage from "./pages/ResumePage";
import ResumeDisplayPage from "./pages/ResumeDisplayPage";
import AgentLayouts from "./ui/layouts/agent/AgentLayouts";
import AppliesTable from "./features/agents/applies/AppliesTable";
import UserAppliesTable from "./features/applies/AppliesTable";
import Unauthorize from "./pages/Unauthorize";
import JobsOfCompany from "./features/agents/jobs/JobsOfCompany";
import CreateJob from "./features/agents/jobs/CreateJob";
import NotFoundPage from "./pages/NotFoundPage";
import UpdateJob from "./features/agents/jobs/UpdateJob";
import Notification from "./features/notifications/Notification";
import AgentCompany from "./features/agents/companies/AgentCompany";
import { UserCVProvider } from "./contexts/UserCVContext";
import { SocketProvider } from "./contexts/SocketContext";
import ExpectJobsPage from "./features/expectedJobs/ExpectJobsPage";
import StatisticsPage from "./pages/StatisticsPage";
import Chat from "./features/chat/Chat";
import Profile from "./features/profiles/Profile";
import UserLayouts from "./ui/layouts/user/UserLayouts";
import CompanyPage from "./features/companies/CompanyPage";
import CompanyDetails from "./features/companies/CompanyDetails";
import BookmarkJobList from "./features/bookmarks/BookmarkJobList";
import CreateCompany from "./features/agents/companies/CreateCompany";
import Dashboard from "./features/dashboard/Dashboard";
import NotificationPage from "./pages/NotificationPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
});
const theme = createTheme({
  palette: {
    primary: {
      main: "#2d3758",
    },
    error: {
      main: "rgba(255, 99, 132, 1)",
      // main: "#f44336",
    },
    success: {
      // main: "rgba(75, 192, 192, 1)",
      // main: "#4caf50",
      main: "#00c853",
    },
    warning: {
      // main: "rgba(255, 206, 86, 1)",
      main: "#ff9800",
    },
    info: {
      // main: "rgba(54, 162, 235, 1)",
      main: "#2196f3",
    },

    text: {
      primary: "#333",
    },

    background: {
      default: "#f4f6f8",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          <AuthProvider>
            <SocketProvider>
              <UserCVProvider>
                <Routes>
                  <Route element={<AppLayouts />}>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/jobs/:id" element={<JobDetails />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Register />} />
                    <Route
                      path="/resumes/:id"
                      element={<ResumeDisplayPage />}
                    />
                  </Route>

                  <Route
                    element={
                      <ProtectedRoute role="user">
                        <UserLayouts />
                      </ProtectedRoute>
                    }
                  >
                    <Route
                      path="/user/home"
                      element={<Homepage isGuest={false} />}
                    />
                    <Route path="/user/profiles" element={<Profile />} />
                    <Route path="/user/companies" element={<CompanyPage />} />
                    <Route
                      path="/user/companies/:id"
                      element={<CompanyDetails />}
                    />
                    <Route
                      path="/user/jobs/bookmarks"
                      element={<BookmarkJobList />}
                    />
                    <Route path="/user/chats" element={<Chat />} />
                    <Route path="/user/jobs/:id" element={<JobDetails />} />
                    <Route
                      path="/user/resumes/:id"
                      element={<ResumeDisplayPage />}
                    />
                    <Route path="/user/cv/" element={<ResumePage />} />
                    <Route
                      path="/user/jobs/expectations"
                      element={<ExpectJobsPage />}
                    ></Route>
                    <Route
                      path="/user/applies"
                      element={<UserAppliesTable />}
                    ></Route>
                    <Route
                      path="/user/dashboard"
                      element={<Dashboard />}
                    ></Route>
                    <Route
                      path="/user/notifications"
                      element={<NotificationPage />}
                    ></Route>
                  </Route>

                  <Route
                    element={
                      <ProtectedRoute role="agent">
                        <AgentLayouts />
                      </ProtectedRoute>
                    }
                  >
                    <Route path="/agent/profiles" element={<Profile />} />
                    <Route path="/agent/chats" element={<Chat />} />
                    <Route path="/agent/applies" element={<AppliesTable />} />
                    <Route path="/agent/jobs" element={<JobsOfCompany />} />
                    <Route path="/agent/jobs/create" element={<CreateJob />} />
                    <Route
                      path="/agent/jobs/:id/update"
                      element={<UpdateJob />}
                    />
                    <Route
                      path="/agent/companies/create"
                      element={<CreateCompany />}
                    />
                    <Route
                      path="/agent/statistics"
                      element={<StatisticsPage />}
                    />
                    <Route
                      path="/agent/notifications"
                      element={<NotificationPage />}
                    />
                    <Route path="/agent/company" element={<AgentCompany />} />
                  </Route>

                  <Route path="/unauthorize" element={<Unauthorize />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </UserCVProvider>
            </SocketProvider>
          </AuthProvider>
        </BrowserRouter>

        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 3000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
            },
          }}
        />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
