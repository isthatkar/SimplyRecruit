import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import LogoutButton from "./Auth/LogoutButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import { useLocation } from "react-router-dom";

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

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCandidate, setIsCandidate] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const roles = localStorage.getItem("roles");
    if (roles) {
      setIsEmployee(roles.includes("Employee"));
      setIsCandidate(roles.includes("Candidate"));
    } else {
      setIsCandidate(false);
      setIsEmployee(false);
    }
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [location]);

  return (
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
              {isEmployee ? (
                <MenuItem
                  onClick={handleCloseNavMenu}
                  component="a"
                  href="/projects"
                >
                  <Typography textAlign="center">PROJECTS</Typography>
                </MenuItem>
              ) : (
                ""
              )}
              {isLoggedIn ? (
                <MenuItem
                  onClick={handleCloseNavMenu}
                  component="a"
                  href="/positions"
                >
                  <Typography textAlign="center">OPEN POSITIONS</Typography>
                </MenuItem>
              ) : (
                ""
              )}
              {isCandidate ? (
                <MenuItem
                  onClick={handleCloseNavMenu}
                  component="a"
                  href="/userApplications"
                >
                  <Typography textAlign="center">MY APPLICATIONS</Typography>
                </MenuItem>
              ) : (
                ""
              )}
              {isLoggedIn ? (
                <MenuItem
                  onClick={handleCloseNavMenu}
                  component="a"
                  href="/userMeetings"
                >
                  <Typography textAlign="center">MY MEETINGS</Typography>
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
            {isEmployee ? (
              <Button
                sx={{ my: 2, color: "white", display: "block" }}
                component="a"
                href="/projects"
              >
                PROJECTS
              </Button>
            ) : (
              ""
            )}
            {isLoggedIn ? (
              <Button
                sx={{ my: 2, color: "white", display: "block" }}
                component="a"
                href="/positions"
              >
                OPEN POSITIONS
              </Button>
            ) : (
              ""
            )}
            {isCandidate ? (
              <Button
                sx={{ my: 2, color: "white", display: "block" }}
                component="a"
                href="/userApplications"
              >
                MY APPLICATIONS
              </Button>
            ) : (
              ""
            )}
            {isLoggedIn ? (
              <Button
                sx={{ my: 2, color: "white", display: "block" }}
                component="a"
                href="/userMeetings"
              >
                MY MEETINGS
              </Button>
            ) : (
              ""
            )}
          </Box>
          {isLoggedIn ? (
            <Box sx={{ flexGrow: 0 }}>
              <LogoutButton></LogoutButton>
            </Box>
          ) : (
            ""
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Nav;
