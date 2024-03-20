import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AuthProvider } from "./contexts/AuthContext";

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
      main: "rgba(195, 141, 224, 0.7)",
    },
  },
});

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />

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
                    <UserCVProvider>
                      <Resumepage profile={DATA.profile}></Resumepage>
                    </UserCVProvider>
                  }
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
