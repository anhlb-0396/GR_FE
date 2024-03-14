import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import Homepage from "./pages/Homepage";
import JobDetails from "./pages/JobDetails";
import AppLayouts from "./ui/AppLayouts";

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
              <Route path="/jobs" element={<JobDetails></JobDetails>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
