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
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { ThemeProvider } from "@emotion/react";
import theme from "../theme.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../server.js";

export default function NavBar2({
  login,
  customerRole,
  homePageLogOut,
  setShowComponent,
}) {
  let navigate = useNavigate();

  let displayElements = (value) => {
    setShowComponent(value);
  };

  let logout = async () => {
    displayElements(false);

    await axios
      .get(`${server}/api/logOut`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data === "loggedOut") {
          toast.success("Successfully Logged Out");
          if (window.location.pathname === "/") {
            homePageLogOut();
            displayElements(true);
          } else {
            navigate("/");
          }
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/error");
      });
  };

  let pages = [];
  let settings = [];

  {
    login
      ? customerRole
        ? (pages = [
            {
              name: "Explore Products",
              navigate: () => navigate("/"),
            },
          ])
        : (pages = [
            {
              name: "Host Product",
              navigate: () => navigate("/retailer/products/new"),
            },
          ])
      : (pages = [
          {
            name: "Explore Products",
            navigate: () => navigate("/"),
          },
          {
            name: "Login",
            navigate: () => navigate("/login"),
          },
          {
            name: "SignUp",
            navigate: () => {
              navigate("/signUp");
            },
          },
        ]);
  }

  {
    customerRole
      ? (settings = [
          {
            name: "Cart",
            navigate: () => navigate("/item/cart"),
          },
          {
            name: "Your Orders",
            navigate: () => navigate("/item/orders"),
          },
          {
            name: "Logout",
            navigate: () => {
              logout();
            },
          },
        ])
      : (settings = [
          {
            name: "Your Products",
            navigate: () => navigate("/retailer"),
          },
          {
            name: "Logout",
            navigate: () => {
              logout();
            },
          },
        ]);
  }

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

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar disableGutters style={{ display: "flex" }}>
            <Box
              sx={{
                flexGrow: 0,
                display: { xs: "flex", md: "flex" },
                height: "100%",
                width: "50%",
                alignItems: "center",
                justifyContent: { xs: "space-evenly", md: "start" },
              }}
            >
              <Box
                sx={{
                  flexGrow: 0,
                  display: { xs: "flex", md: "none" },
                  marginRight: "1rem",
                }}
              >
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                  sx={{
                    display: { xs: "block", md: "none" },
                    "&:focus": {
                      outline: "none",
                      boxShadow: "none",
                    },
                  }}
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
                >
                  {pages.map((page) => (
                    <MenuItem
                      key={page.name}
                      onClick={() => {
                        page.navigate();
                        handleCloseNavMenu();
                      }}
                    >
                      <Typography textAlign="center">{page.name}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Avatar
                sx={{
                  display: { xs: "none", md: "flex" },
                  mr: "20%",
                  ml: "5%",
                  p: 0,
                  "&:focus": {
                    outline: "none",
                    boxShadow: "none",
                  },
                }}
                alt="Remy Sharp"
                src="https://up.yimg.com/ib/th?id=OIP.oe02X74CoVyRGmF-9SPo7wHaHa&pid=Api&rs=1&c=1&qlt=95&w=93&h=93 "
              />

              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "sans-serif",
                  fontWeight: 700,
                  letterSpacing: ".1rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                ShopIt
              </Typography>

              <Avatar
                sx={{
                  display: { xs: "flex", md: "none" },
                  mr: 2,
                  p: 0,
                  "&:focus": {
                    outline: "none",
                    boxShadow: "none",
                  },
                }}
                alt="Remy Sharp"
                src="https://up.yimg.com/ib/th?id=OIP.oe02X74CoVyRGmF-9SPo7wHaHa&pid=Api&rs=1&c=1&qlt=95&w=93&h=93 "
              />

              <Typography
                variant="h5"
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "sans-serif",
                  fontWeight: 700,
                  letterSpacing: ".1rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                ShopIt
              </Typography>
            </Box>

            <Box
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
                height: "100%",
                width: "50%",
              }}
            >
              <Box
                sx={{
                  display: {
                    flexGrow: 1,
                    xs: "none",
                    md: "flex",
                    marginRight: "2rem",
                    justifyContent: "space-evenly",
                  },
                }}
              >
                {pages.map((page) => (
                  <Button
                    key={page.name}
                    // onClick={handleCloseNavMenu}
                    onClick={() => {
                      page.navigate();
                    }}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page.name}
                  </Button>
                ))}
              </Box>
              {login ? (
                <Box sx={{ flexGrow: 0.5 }}>
                  <Tooltip title="Open settings">
                    <IconButton
                      onClick={handleOpenUserMenu}
                      sx={{
                        p: 0,
                        "&:focus": {
                          outline: "none",
                          boxShadow: "none",
                        },
                      }}
                    >
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/2.jpg"
                      />
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
                    {settings.map((setting) => (
                      <MenuItem
                        key={setting.name}
                        onClick={() => {
                          setting.navigate();
                          handleCloseUserMenu();
                        }}
                      >
                        <Typography textAlign="center">
                          {setting.name}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              ) : null}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
