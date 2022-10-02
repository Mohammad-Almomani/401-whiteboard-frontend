import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Alert } from "react-bootstrap";
import { InputLabel, MenuItem, Select } from "@mui/material";
import { useLoginContext } from "../Context/Login_Context";

const theme = createTheme();

export default function SignUp() {
  const {
    togglePassword,
    passwordType,
    NotMatched,
    alreadyExist,
    isValid,
    message,
    role,
    handleRoleChange,
    signUp,
    validateEmail,
    notFilled,
  } = useLoginContext();

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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={signUp} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={validateEmail}
                />
                {!isValid && (
                  <div className={`message ${isValid ? "success" : "error"}`}>
                    {message}
                  </div>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  type={passwordType}
                  name="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type={passwordType}
                  id="confirmPassword"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel id="demo-simple-select-label">
                  Please Pick Your Role
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={role}
                  label="Role"
                  onChange={handleRoleChange}
                >
                  <MenuItem value="user" defaultChecked>
                    User
                  </MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                {notFilled && (
                  <Alert key="light" variant="danger">
                    Please fill all the fields
                  </Alert>
                )}
                {NotMatched && (
                  <Alert key="danger" variant="danger">
                    Your passwords does not match
                  </Alert>
                )}
                {alreadyExist && (
                  <Alert key="danger" variant="danger">
                    This email already exist
                  </Alert>
                )}
                <FormControlLabel
                  control={
                    <Checkbox
                      onClick={togglePassword}
                      value="allowExtraEmails"
                      color="primary"
                    />
                  }
                  label="Show Password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
