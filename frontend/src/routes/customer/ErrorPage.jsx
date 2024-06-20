import { useRouteError } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar2 from "../../components/NavBar2";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import { server } from "../../server";

export default function ErrorPage() {
  let navigate = useNavigate();
  let [navLoginStatus, setNavLoginStatus] = useState(false);
  let [showComponent, setShowComponent] = useState(false);
  let [customerRole, setCustomerRole] = useState(false);
  let error = useRouteError();

  useEffect(() => {
    async function checkLogin() {
      try {
        let data = await axios.get(`${server}api/getUserRole`, {
          withCredentials: true,
        });
        if (data.data.role === undefined) {
          setShowComponent(true);
        } else if (data.data.role === "customer") {
          setCustomerRole(true);
          setNavLoginStatus(true);
          setShowComponent(true);
        } else if (data.data.role === "retailer") {
          setCustomerRole(false);
          setNavLoginStatus(true);
          setShowComponent(true);
        }
      } catch (err) {
        console.log(err);
        toast.error("Some error occured");
        navigate("/");
      }
    }
    checkLogin();
  }, []);

  return showComponent ? (
    <div className="errorPage">
      <NavBar2
        login={navLoginStatus}
        customerRole={customerRole}
        setShowComponent={setShowComponent}
      />
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
  ) : (
    <CircularProgress />
  );
}
