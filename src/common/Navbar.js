import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";
import { Images } from "../utils/Images";

const pages = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Lets Vote", path: "/voting" },
];
const settings = ["Admin Panel", "Logout"];

const Navbar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { userData, login } = useSelector((store) => store);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleNavigation = (path) => {
    setAnchorElNav(null);

    history.push(path);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    dispatch(actions.logout());
    localStorage.removeItem("token");
    localStorage.removeItem("userid");
    handleCloseUserMenu();

    history.push("/");
  };
  const handleSettingsMenu = (name) => {
    if (name === "Logout") {
      handleLogout();
    } else history.push("/admin");
    handleCloseUserMenu();
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            onClick={() => history.push("/")}
            sx={{
              display: { xs: "none", md: "block" },
              mr: 2,

              maxWidth: 200,
              maxHeight: 50,
              cursor: "pointer",
              overflow: "hidden",
            }}
          >
            <img
              style={{
                height: 40,

                objectFit: "contain",
              }}
              src={Images.logo}
              alt="sdf"
            ></img>
          </Box>

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
              {pages.map((page, i) => (
                <MenuItem key={i} onClick={() => handleNavigation(page.path)}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            onClick={() => history.push("/")}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              cursor: "pointer",
            }}
          >
            <img
              style={{
                height: 40,

                objectFit: "contain",
              }}
              src={Images.logo}
              alt="sdf"
            ></img>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, i) => (
              <Button
                key={i}
                onClick={() => handleNavigation(page.path)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton sx={{ p: 0 }} onClick={handleOpenUserMenu}>
              <Avatar alt="Remy Sharp" src={userData?.profilePic} />
            </IconButton>
            {login && (
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => handleSettingsMenu(setting)}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
