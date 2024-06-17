import SignUpForm from "../../components/SignUpForm";
import { useState, useEffect } from "react";
import { validateForm } from "../../validations/SignUpValidation";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import {
  checkLogin,
  preventFormDefaultFunction,
} from "../../utils/customer/SignUp";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme.js";
import NavBar2 from "../../components/NavBar2.jsx";
import "../../styles/Login.css";
import Footer from "../../components/Footer";

export default function SignUp() {
  let navigate = useNavigate();
  let [showComponent, setShowComponent] = useState(false);
  let [apiRoute, setApiRoute] = useState("items/signUp");
  let [loading, setLoading] = useState(false);
  let [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password: "",
  });
  let [error, setError] = useState({
    username: {
      valid: false,
      errMsg: "",
    },
    email: {
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
    setSignUpData((prevData) => {
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
      signUpData,
      error,
      setLoading
    );
  };

  let validation = (newError) => {
    setError((prevErr) => {
      return { ...prevErr, newError };
    });
  };

  return showComponent ? (
    <div className="auth">
      <ThemeProvider theme={theme}>
        <NavBar2 login={false} setShowComponent={setShowComponent} />
        <h1>
          SignUp as{" "}
          {apiRoute === "items/signUp" ? (
            <span>Customer</span>
          ) : (
            <span>Retailer</span>
          )}
        </h1>
        <>
          {apiRoute === "items/signUp" ? (
            <>
              <Button
                variant="contained"
                onClick={() => {
                  setApiRoute("items/signUp");
                }}
                style={{ backgroundColor: "#1976d2", color: "white" }}
                disabled
              >
                <b>Customer</b>
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  setApiRoute("retailer/signUp");
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
                  setApiRoute("items/signUp");
                }}
                style={{ backgroundColor: "#BDBDBD", color: "black" }}
              >
                Customer
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  setApiRoute("retailer/signUp");
                }}
                style={{ backgroundColor: "#1976d2", color: "white" }}
                disabled
              >
                <b>Retailer</b>
              </Button>
            </>
          )}
          <SignUpForm
            preventFormDefaultFunction={preventFormDefaultOperation}
            signUp={signUpData}
            ValidateErrors={error}
            setFormData={setForm}
            route={apiRoute}
            loading={loading}
          />
        </>
      </ThemeProvider>
    </div>
  ) : (
    <CircularProgress />
  );
}
