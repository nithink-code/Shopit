import { useState, useEffect } from "react";
import Forms from "../../components/Forms";
import "../../styles/Form.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import { checkLogin } from "../../utils/retailers/CreateItem";
import NavBar2 from "../../components/NavBar2";

export default function CreateItem() {
  let navigate = useNavigate();
  let [showComponent, setShowComponent] = useState(false);
  let [navLogin, setNavLogin] = useState(false);
  let [roleIsCustomer, setRoleIsCustomer] = useState(false);
  let [imgFile, setImgFile] = useState("");
  let [loading, setLoading] = useState(false);

  let [item, setItem] = useState({
    name: "",
    price: "",
    image: undefined,
    description: "",
    stock: 1,
  });

  let [errors, setErrors] = useState({
    name: { errMsg: "", valid: false },
    price: { errMsg: "", valid: false },
    image: { errMsg: "", valid: false },
    description: { errMsg: "", valid: false },
    stock: { errMsg: "", valid: false },
  });

  let setForm = (event) => {
    setErrors((prevErr) => {
      return { ...prevErr, [event.target.name]: { errMsg: "", valid: false } };
    });

    if (event.target.type === "file") {
      setItem((prevData) => {
        return { ...prevData, [event.target.name]: event.target.files[0] };
      });
      previewFile(event.target.files[0]);
    } else {
      setItem((prevData) => {
        return { ...prevData, [event.target.name]: event.target.value };
      });
    }
  };

  let previewFile = (file) => {
    try {
      if (file === undefined) {
        setImgFile("");
      } else {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setImgFile(reader.result);
        };
      }
    } catch (err) {}
  };

  let validation = (newError) => {
    setErrors((prevErr) => {
      return { ...prevErr, newError };
    });
  };

  useEffect(() => {
    checkLogin(axios, navigate, toast, setNavLogin, setShowComponent);
  }, []);

  return (
    <>
      {showComponent ? (
        <div className="createItem">
          <NavBar2
            login={navLogin}
            customerRole={roleIsCustomer}
            setShowComponent={setShowComponent}
          />
          <div
            className="createItem-form"
            style={{ transform: "translateY(-2rem)" }}
          >
            <Forms
              requestType={"post"}
              apiRoute={"items"}
              navigateRoute={"/retailer"}
              setFormData={setForm}
              item={item}
              buttonText={"Create"}
              validationError={errors}
              validation={validation}
              errors={errors}
              heading="Create and upload your product"
              alertMsg={"Item successfully hosted/created"}
              image={imgFile}
              loading={loading}
              setLoading={setLoading}
            />
          </div>
        </div>
      ) : (
        <CircularProgress />
      )}
    </>
  );
}
