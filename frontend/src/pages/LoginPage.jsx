import React, { useState } from "react";
import {
  Box,
  Button,
  CssBaseline,
  TextField,
  Typography,
  Paper,
  Grid,
  Avatar,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import baseforge from "../assets/BaseForge.svg";
import { useAdminAuth } from "../hooks/useAdminAuth";
import { useNavigate } from "react-router-dom";
import { useSuccess } from "../hooks/context/useSuccess";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#1e1e1e", // Dark gray wrapper background
    },
    primary: {
      main: "#1e88e5",
    },
  },
});

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {  checkAdmin } = useAdminAuth();
  const { setNotifData } = useSuccess();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
  event.preventDefault();
  const isAuthenticated = await checkAdmin(username, password); // boolean
  if (isAuthenticated) {
      setNotifData({
      success : true,
      message: "successfully log in",
      severity: "success",
    });
    console.log("Admin authenticated successfully");
    navigate("/admin/dashboard");
  } else {
    console.error("Admin authenticated unsuccessfully");
  }
};


  return (
    <ThemeProvider theme={darkTheme} >
      <CssBaseline />
      <Grid 
        container
        justifyContent="center"
        alignItems="center"
        sx={{ fontFamily : "'Cascadia Code', sans-serif",  minHeight: "", backgroundColor: "", padding: 2 }}
      >
        <Grid item   sx={{mt : 5 ,width :"500px", height : "400px"}}>
          <Paper
            elevation={4}
            sx={{
              backgroundColor: "#121212", // Black form panel
              borderRadius: 3,
              padding: 4,
              boxShadow: "0 8px 20px rgba(0,0,0,0.4)", // subtle shadow
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Logo */}
            <Box >
              <img
            
                src={baseforge}
                alt="BaseForge Logo"
                style={{ width: "200px" }}
              />
            </Box>

            {/* Avatar and Heading */}
            <Avatar sx={{  bgcolor: "primary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h6" color="white" gutterBottom>
              Admin Login
            </Typography>

            {/* Form */}
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1, width: "100%" }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="username"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                InputLabelProps={{ style: { color: "rgba(255,255,255,0.7)" } }}
                InputProps={{ style: { color: "white" } }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputLabelProps={{ style: { color: "rgba(255,255,255,0.7)" } }}
                InputProps={{ style: { color: "white" } }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, py: 1.3, fontWeight: "bold" }}
              >
                Log In
              </Button>
            </Box>

            <Typography
              variant="body2"
              color="gray"
              sx={{ mt: 3, textAlign: "center" }}
            >
              &copy; 2025 BaseForge Admin. All rights reserved.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
