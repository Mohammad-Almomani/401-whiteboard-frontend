import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import logo from "./assets/logo-re.png";
import { useLoginContext } from "../Context/AuthContext";

const drawerWidth = 240;

function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const {isAuthorized, handleSignOut, user} = useLoginContext();


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography data-testid="title" variant="h6" sx={{ my: 2 }}>
        Facebook Ultra Lite
        {<img src={logo} style={{ width: "75px" }} />}
      </Typography>
      <Divider />

      {isAuthorized && (
        <List>
          <ListItemText
            primary={`Hello, ${user.username?.toUpperCase()}`}
            />

          <Button
            sx={{ color: "black" }}
            component={Link}
            to="/Post"
            style={{ fontSize: "1rem" }}
            className="navLink"
          >
            Home
          </Button>
          <ListItemText primary={" "} />

          <Button
            sx={{ color: "black" }}
            onClick={handleSignOut}
            component={Link}
            // as={Link}
            // to="/signin"
            style={{ fontSize: "1rem" }}
            className="navLink"
          >
            Sign Out
          </Button>
        </List>
      )}
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            {<img src={logo} style={{ width: "75px" }} />}
          </Typography>

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Facebook Ultra Lite
          </Typography>
          {isAuthorized && (
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Button
                sx={{ color: "#fff" }}
                component={Link}
                to="/Post"
                style={{ fontSize: "1rem" }}
                className="navLink"
              >
                Home
              </Button>
              <a
                sx={{ color: "#fff" }}
                style={{
                  display: "inline-block",
                  fontSize: "1.1rem",
                  margin: "1% 10px",
                }}
              >
                {`Hello, ${user.username?.toUpperCase()}`}
              </a>

              <Button
                sx={{ color: "#fff" }}
                onClick={handleSignOut}
                component={Link}
                // as={Link}
                // to="/signin"
                style={{ fontSize: "1rem" }}
                className="navLink"
              >
                Sign Out
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}

Navbar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Navbar;
