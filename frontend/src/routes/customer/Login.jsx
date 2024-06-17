import LoginForm from "../../components/LoginForm";
import { useState, useEffect } from "react";
import { validateForm } from "../../validations/LoginValidation";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import {
  checkLogin,
  preventFormDefaultFunction,
} from "../../utils/customer/Login";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme.js";
import NavBar2 from "../../components/NavBar2.jsx";
import "../../styles/Login.css";

export default function Login() {
  let navigate = useNavigate();
  let [showComponent, setShowComponent] = useState(false);
  let [apiRoute, setApiRoute] = useState("items/login");
  let [loginData, setLoginData] = useState({ username: "", password: "" });
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState({
    username: {
      valid: false,
      errMsg: "",
    },
    password: {
      valid: false,
      errMsg: "",
    },
  });

  useEffect(() => {
    checkLogin(axios, navigate, toast, setShowComponent);
  }, []);

  let setForm = (event) => {
    setError((prevErr) => {
      return { ...prevErr, [event.target.name]: { errMsg: "", valid: false } };
    });
    setLoginData((prevData) => {
      return { ...prevData, [event.target.name]: event.target.value };
    });
  };

  let preventFormDefaultOperation = (event, route) => {
    preventFormDefaultFunction(
      event,
      route,
      axios,
      toast,
      navigate,
      validateForm,
      validation,
      setShowComponent,
      loginData,
      error,
      setLoading
    );
  };

  let validation = (newError) => {
    setError((prevErr) => {
      return { ...prevErr, newError };
    });
  };

  return (
    <div className={"auth"} style={{}}>
      <ThemeProvider theme={theme}>
        <NavBar2 login={false} setShowComponent={setShowComponent} />
        <h1 style={{ width: "100%", wordWrap: "break-word" }}>
          Login as{" "}
          {apiRoute === "items/login" ? (
            <span>Customer</span>
          ) : (
            <span>Retailer</span>
          )}
        </h1>
        {showComponent ? (
          <>
            {apiRoute === "items/login" ? (
              <>
                <Button
                  variant="contained"
                  onClick={() => {
                    setApiRoute("items/login");
                  }}
                  style={{ backgroundColor: "#1976d2", color: "white" }}
                  disabled
                >
                  <b>Customer</b>
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    setApiRoute("retailer/login");
                  }}
                  style={{ backgroundColor: "#BDBDBD", color: "black" }}
                >
                  Retailer
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  onClick={() => {
                    setApiRoute("items/login");
                  }}
                  style={{ backgroundColor: "#BDBDBD", color: "black" }}
                >
                  Customer
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    setApiRoute("retailer/login");
                  }}
                  style={{ backgroundColor: "#1976d2", color: "white" }}
                  disabled
                >
                  <b>Retailer</b>
                </Button>
              </>
            )}
            <LoginForm
              preventFormDefaultFunction={preventFormDefaultOperation}
              login={loginData}
              ValidateErrors={error}
              setFormData={setForm}
              route={apiRoute}
              loading={loading}
            />
          </>
        ) : (
          <CircularProgress />
        )}
      </ThemeProvider>
    </div>
  );
}
