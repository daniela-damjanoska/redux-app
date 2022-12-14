import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { pink } from "@mui/material/colors";

//pages imports
import SignInPage from "./Pages/SignInPage";
import SignUpPage from "./Pages/SignUpPage";
import BlogPage from "./Pages/BlogPage";
import NotFoundPage from "./Pages/NotFoundPage";

const theme = createTheme({
  palette: {
    primary: {
      light: pink[300],
      main: pink[600],
      dark: pink[900],
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<SignInPage />}></Route>
          <Route path="/SignUp" element={<SignUpPage />}></Route>
          <Route path="/Blog" element={<BlogPage />}></Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
