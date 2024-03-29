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
import DATA from "./features/resumes/TEMPLATE";

import Homepage from "./pages/Homepage";
import JobDetails from "./features/jobs/JobDetails";
import AppLayouts from "./ui/layouts/AppLayouts";
import Resume from "./features/resumes/Resume";
import Login from "./features/authentication/Login";
import Register from "./features/authentication/Register";
import Resumepage from "./pages/Resumepage";
import ProtectedRoute from "./pages/ProtectedRoute";
import { UserCVProvider } from "./contexts/UserCVContext";

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
      main: "rgba(255, 206, 86, 0.7)",
    },
    info: {
      main: "rgba(200, 157, 223, 0.7)",
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
                <Route element={<AppLayouts></AppLayouts>}>
                  <Route path="/" element={<Homepage></Homepage>} />
                  <Route path="/jobs/:id" element={<JobDetails></JobDetails>} />
                  <Route path="/login" element={<Login></Login>} />
                  <Route path="/signup" element={<Register></Register>} />
                  <Route
                    path="/users/cv"
                    element={<Resume profile={DATA.profile}></Resume>}
                  />
                  <Route
                    path="/users/cv/create"
                    element={
                      <ProtectedRoute>
                        <Resumepage profile={DATA.profile}></Resumepage>
                      </ProtectedRoute>
                    }
                  />
                </Route>
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
