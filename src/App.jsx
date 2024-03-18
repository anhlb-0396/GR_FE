import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AuthProvider } from "./contexts/AuthContext";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import Homepage from "./pages/Homepage";
import JobDetails from "./pages/JobDetails";
import AppLayouts from "./ui/AppLayouts";
import Resume from "./features/resumes/Resume";
import Login from "./features/authentication/Login";

import DATA from "./features/resumes/TEMPLATE";

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
                {/* <Route path="/signup" element={<Login></Login>} /> */}
                <Route
                  path="/users/cv"
                  element={<Resume profile={DATA.profile}></Resume>}
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
