import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
// import "@fontsource/inter";

import AppLayouts from "./ui/AppLayouts";
import Homepage from "./pages/Homepage";
import JobDetails from "./pages/JobDetails";
import AppLayoutsFix from "./ui/AppLayoutsFix";

const queryClient = new QueryClient();
const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />

        <BrowserRouter>
          <Routes>
            <Route element={<AppLayouts></AppLayouts>}>
              <Route path="/" element={<Homepage></Homepage>} />
            </Route>
            <Route element={<AppLayoutsFix></AppLayoutsFix>}>
              <Route path="/jobs" element={<JobDetails></JobDetails>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
