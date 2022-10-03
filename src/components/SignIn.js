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
import { Alert } from "react-bootstrap";
import {useLoginContext} from "../Context/Login_Context"

const theme = createTheme();

export default function MaterialSignIn() {
  
const {notFilledSignIn, notAuthed, togglePasswordSignIn, handleForgetPassword, handleLogIn, contactAdmin, passwordTypeSignIn} =useLoginContext()


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
              data-testid="username"
              required
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type={passwordTypeSignIn}
              id="password"
              autoComplete="current-password"
              data-testid="password"
              required
            />
            <FormControlLabel
              control={
                <Checkbox
                  onClick={togglePasswordSignIn}
                  value="remember"
                  color="primary"
                />
              }
              label="Show Password"
            />
            {notFilledSignIn && (
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
              data-testid="signInButton"
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
                <Link to='/signup'  variant="body2" data-testid="signUpRoute">
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
