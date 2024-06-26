import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import { MdSearch } from "react-icons/md";
import { MdMenu } from "react-icons/md";
import { Avatar, Tooltip, Menu, MenuItem, Chip, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useGetUserQuery } from "../../redux/api/userApi";
import { nameSubs } from "../../helper/helper";
import { Link, useNavigate } from "react-router-dom";
import { useLazyLogoutQuery } from "../../redux/api/authApi";
import image from "../../images/avatar.png";
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const Header = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const { data } = useGetUserQuery();
  const navigate = useNavigate();
  const [logout] = useLazyLogoutQuery();
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const logoutHandler = async () => {
    await logout();
    navigate(0);
  };
  return (
    <Box width={"100%"}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2, display: { xs: "block", md: "none" } }}
          >
            <MdMenu className="icon" />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", md: "block" } }}
          >
            <Link style={{ color: "white" }} to={"/"}>
              Mern Stack Project
            </Link>
          </Typography>
          <Search>
            <SearchIconWrapper>
              <MdSearch />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 0, ml: 2 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <>
                  {user ? (
                    <div className="border">{user && nameSubs(user?.name)}</div>
                  ) : (
                    <Avatar src={image} alt="image" />
                  )}
                </>
              </IconButton>
            </Tooltip>
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
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Dashboard</Typography>
              </MenuItem>
              {user ? (
                <MenuItem onClick={handleCloseUserMenu}>
                  <Button onClick={logoutHandler} variant="contained">
                    Logout
                  </Button>
                </MenuItem>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Link to={"/login"}>
                      <Button variant="contained">Login</Button>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Link to={"/register"}>
                      <Button variant="contained">Register</Button>
                    </Link>
                  </MenuItem>
                </Box>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
