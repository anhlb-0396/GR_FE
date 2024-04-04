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
import AppLayouts from "./ui/layouts/AppLayouts";
import Resume from "./features/resumes/Resume";
import Login from "./features/authentication/Login";
import Register from "./features/authentication/Register";
import ProtectedRoute from "./pages/ProtectedRoute";
import ResumeCreatePage from "./pages/ResumeCreatePage";

import { UserCVProvider } from "./contexts/UserCVContext";
import ResumeDisplayPage from "./pages/ResumeDisplayPage";
import Dashboard from "../src/features/dashboard/Dashboard";

const queryClient = new QueryClient();
const theme = createTheme({
  palette: {
    primary: {
      main: "rgba(53, 162, 235, 1)",
    },
    error: {
      main: "rgba(255, 99, 132, 1)",
    },
    success: {
      main: "rgba(75, 192, 192, 1)",
    },
    warning: {
      main: "rgba(255, 159, 64, 1)",
    },
    info: {
      main: "rgba(54, 162, 235, 1)",
    },
  },
});

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <UserCVProvider>
            <BrowserRouter>
              <Routes>
                <Route element={<AppLayouts />}>
                  <Route path="/" element={<Homepage />} />
                  <Route path="/jobs/:id" element={<JobDetails />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Register />} />
                  <Route path="/users/:id/cv" element={<ResumeDisplayPage />} />
                  <Route
                    path="/users/cv/create"
                    element={
                      <ProtectedRoute>
                        <ResumeCreatePage />
                      </ProtectedRoute>
                    }
                  />
                </Route>

                <Route
                  path="/agent/dashboard"
                  element={<Dashboard></Dashboard>}
                ></Route>
              </Routes>
            </BrowserRouter>
          </UserCVProvider>

          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: {
                duration: 3000,
              },
              error: {
                duration: 5000,
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
    </AuthProvider>
  );
}

export default App;
