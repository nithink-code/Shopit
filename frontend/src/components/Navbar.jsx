import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";

export default function Navbar({
  login,
  customerRole,
  loginPage,
  roleNotLogin,
  homePageLogOut,
}) {
  let navigate = useNavigate();
  let [showNavBar, setShowNavBar] = useState(true);
  let logout = async () => {
    setShowNavBar(false);
    await axios
      .get("/api/logOut")
      .then((res) => {
        console.log(res);
        if (res.data === "loggedOut") {
          toast.success("Successfully Logged Out");
          if (window.location.pathname === "/") {
            homePageLogOut();
            setShowNavBar(true);
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

  return (
    <>
      {showNavBar ? (
        <>
          <AppBar position="fixed">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                component="div"
                style={{ position: "relative", left: "50rem" }}
              >
                {!loginPage ? (
                  <>
                    {!roleNotLogin ? (
                      <>
                        {customerRole ? (
                          <>
                            <Link
                              style={{
                                color: "white",
                                margin: "1rem",
                                fontSize: "large",
                              }}
                              to="/item/cart"
                            >
                              Cart
                            </Link>
                          </>
                        ) : (
                          <>
                            <Link
                              style={{
                                color: "white",
                                margin: "1rem",
                                fontSize: "large",
                              }}
                              to="/retailer/products/new"
                            >
                              Create Item
                            </Link>
                            <Link
                              style={{
                                color: "white",
                                margin: "1rem",
                                fontSize: "large",
                              }}
                              to="/retailer"
                            >
                              RetailerHome
                            </Link>
                          </>
                        )}
                      </>
                    ) : null}
                  </>
                ) : null}

                {!login ? (
                  <>
                    <Link
                      style={{
                        color: "white",
                        margin: "1rem",
                        fontSize: "large",
                      }}
                      to="/"
                    >
                      Home
                    </Link>
                    <Link
                      style={{
                        color: "white",
                        margin: "1rem",
                        fontSize: "large",
                      }}
                      to="/signUp"
                    >
                      SignUp
                    </Link>
                    <Link
                      style={{
                        color: "white",
                        margin: "1rem",
                        fontSize: "large",
                      }}
                      to="/login"
                    >
                      Login
                    </Link>
                  </>
                ) : (
                  <>
                    {customerRole ? (
                      <Link
                        style={{
                          color: "white",
                          margin: "1rem",
                          fontSize: "large",
                        }}
                        to="/"
                      >
                        Home
                      </Link>
                    ) : null}
                    <Link
                      style={{
                        color: "white",
                        margin: "1rem",
                        fontSize: "large",
                      }}
                      onClick={logout}
                    >
                      LogOut
                    </Link>
                  </>
                )}
              </Typography>
            </Toolbar>
          </AppBar>
        </>
      ) : (
        <CircularProgress style={{ position: "fixed", top: "0px" }} />
      )}
    </>
  );
}
