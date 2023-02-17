import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import Button from "@mui/material/Button";
import React from "react";
import LogoutButton from "./Auth/LogoutButton";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { ThemeProvider } from "@mui/material";
import Theme from "../Styles/Theme";

const Nav = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  return (
    <ThemeProvider theme={Theme}>
      <AppBar position="sticky" color="primary">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <WorkOutlineIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              SimplyRecruit
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {!token ? (
                  <MenuItem
                    onClick={handleCloseNavMenu}
                    component="a"
                    href="/login"
                  >
                    <Typography textAlign="center">Login</Typography>
                  </MenuItem>
                ) : (
                  ""
                )}
                {token ? (
                  <MenuItem
                    onClick={handleCloseNavMenu}
                    component="a"
                    href="/projects"
                  >
                    <Typography textAlign="center">Projects</Typography>
                  </MenuItem>
                ) : (
                  ""
                )}
              </Menu>
            </Box>
            <WorkOutlineIcon
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              SimplyRecruit
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {!token ? (
                <Button
                  sx={{ my: 2, color: "white", display: "block" }}
                  component="a"
                  href="/login"
                >
                  Login
                </Button>
              ) : (
                ""
              )}
              {token ? (
                <Button
                  sx={{ my: 2, color: "white", display: "block" }}
                  component="a"
                  href="/projects"
                >
                  Projects
                </Button>
              ) : (
                ""
              )}
              {token ? (
                <Button
                  sx={{ my: 2, color: "white", display: "block" }}
                  component="a"
                  href="/positions"
                >
                  Positions
                </Button>
              ) : (
                ""
              )}
            </Box>

            {token ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Logout">
                  <IconButton sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" />
                  </IconButton>
                </Tooltip>
                <LogoutButton></LogoutButton>
              </Box>
            ) : (
              ""
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Nav;
