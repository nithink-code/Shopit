import { useRouteError } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar2 from "../../components/NavBar2";

export default function ErrorPage() {
  let navigate = useNavigate();
  let [navLoginStatus, setNavLoginStatus] = useState(true);
  let error = useRouteError();
  console.log(error);

  useEffect(() => {
    async function checkLogin() {
      await axios
        .post("/api/isLoggedIn", { route: window.location.pathname })
        .then((status) => {
          let res = status.data;
          if (res === "notLogIn") {
            setNavLoginStatus(false);
            navigate("/login");
          } else if (res === "LoggedIn") {
            setNavLoginStatus(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    checkLogin();
  }, []);

  return (
    <div className="errorPage">
      {/* <Navbar
        style={{ marginBottom: "0rem" }}
        loginStatus={navLoginStatus}
        navLoginCheckRoute={"/api/navbar/isLoggedIn"}
      /> */}
      <NavBar2 login={navLoginStatus} />
      <Alert severity="error">
        {" "}
        <h1>Oops there was an error</h1>
      </Alert>
      <p>
        <b>{error?.status}</b>
      </p>
      <p>
        <b>{error?.statusText}</b>
      </p>
      <p>
        <b>{error?.message}</b>
      </p>
    </div>
  );
}
