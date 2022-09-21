import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {Link} from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import base64 from "base-64";
import { useState } from "react";
import { Alert } from "react-bootstrap";
import cookies from 'react-cookies';


const theme = createTheme();

export default function MaterialSignIn(props) {
  const [passwordType, setPasswordType] = useState("password");
  const [notFilled, setNotFilled] = useState(false);
  const [notAuthed, setNotAuthed] = useState(false);
  const [contactAdmin, setContactAdmin] = useState(false);

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const handleForgetPassword = () => {
   return setContactAdmin(!contactAdmin);
  };

  const handleLogIn =  (e) => {
    e.preventDefault();
    const filledData = new FormData(e.currentTarget);
    setNotAuthed(false)
    setNotFilled(false);
    if (!filledData.get("email") || !filledData.get("password")) {
      setNotFilled(true);
      return;
    }
    setNotFilled(false);

    const data = {
      username: filledData.get("email"),
      password: filledData.get("password"),
    };
    const encodedCredintial = base64.encode(
        `${data.username}:${data.password}`
        );
   axios.post(
        `${process.env.REACT_APP_BACKEND}/signin`,
        {},
        {
          headers: {
            Authorization: `Basic ${encodedCredintial}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.user);
        cookies.save('token', res.data.token);
        cookies.save('userID', res.data.user._id);
        cookies.save('username', res.data.user.username)
        props.checkIfAuthorized(true);
      })
      .catch((err) => setNotAuthed(true));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleLogIn}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email or Username"
              name="email"
              type="email"
              autoFocus
              required
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type={passwordType}
              id="password"
              autoComplete="current-password"
              required
            />
            <FormControlLabel
              control={
                <Checkbox
                  onClick={togglePassword}
                  value="remember"
                  color="primary"
                />
              }
              label="Show Password"
            />
            {notFilled && (
              <Alert key="light" variant="danger">
                Please enter your email and password
              </Alert>
            )}
            {notAuthed && (
              <Alert key="strong" variant="danger">
                You are not authorized, please check your login information
              </Alert>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>

            <Grid container>
              <Grid item xs>
                <Link onClick={handleForgetPassword}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to='/signup'  variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        { contactAdmin&& (
              <Alert key="strong" variant="danger" onClick={handleForgetPassword}>
                Please contact the admin to reset your password
              </Alert>
            )}
      </Container>
    </ThemeProvider>
  );
}
