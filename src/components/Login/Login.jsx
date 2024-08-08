import React, { useState } from "react";

import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "../../style/style.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const defaultTheme = createTheme();

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isShaking, setIsShaking] = useState(false); // Add a state variable to control the shaking animation

  const navigate = useNavigate();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        // "http://localhost:8000/login?isAdmin=true",
        "https://nuform-backend-salman170.onrender.com/login?isAdmin=true",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const responseData = await response.json();
      // debugger;
      if (responseData.status) {
        localStorage.setItem("token", responseData.data);
        localStorage.setItem("adminId", responseData.userID);
        localStorage.setItem("userName", responseData.userName);
        localStorage.setItem("email", email);
        toast.success("Login Successfull");
        // window.location.href = "/popup";
        navigate("/");
      } else {
        // Handle other network errors and access response data

        toast.error("Invalid Credentials");
        setIsShaking(true); // Trigger the shake animation
        setTimeout(() => {
          setIsShaking(false);
        }, 300);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Login failed");
      setIsShaking(true); // Trigger the shake animation
      setTimeout(() => {
        setIsShaking(false);
      }, 300);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      {/* <CssBaseline /> */}
      <Box
        // style={{
        //   // margin: "10px 0 20px 0",
        //   backgroundColor: colors.grey[800],
        //   width: "100%",
        //   height: "100vh",
        // }}
        style={{
          margin: "0px -20px 0px 0",

          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            // height: "500px",
            width: "400px",
            my: 8,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "50px",
            boxShadow: "1px 2px 7px rgba(0.3, 0.3, 0.3, 0.3)",
            borderRadius: "20px",
            animation: isShaking ? "shake 0.5s" : "",
          }}
          style={{
            backgroundColor: "#f5f5f5",
            // boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
            // borderRadius: "10px",
            // padding: "20px",
            // width: "300px",
            // margin: "auto",
            // marginTop: "100px",
          }}
        >
          <img
            src="https://nuform.in/static/media/logo.4b69f81166ba17cf1eda.png"
            alt="Logo"
            // height="200"
            width="150"
            style={{ marginRight: "16px", marginBottom: "10px" }}
          />
          {/* <Avatar sx={{ m: 1, backgroundColor: "#3e4396" }}>
          <LockOutlinedIcon />
        </Avatar> */}
          {/* <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
          Sign in
        </Typography> */}

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={handleEmailChange}
              borderRadius="100px"
            />
    
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={handlePasswordChange}
              sx={{ borderRadius: "100px" }}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={toggleShowPassword}
                    aria-label={
                      showPassword ? "Hide Password" : "Show Password"
                    }
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                ),
              }}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#0916ff",
                borderBottomLeftRadius: "20px",
                borderTopRightRadius: "20px",
                borderBottomRightRadius: "20px",
                height: "40px",
                "&:hover": {
                  backgroundColor: "#3e4396",
                },
              }}
            >
              Login In
            </Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Login;
