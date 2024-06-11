import axios from "axios";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Forms from "../../components/Forms";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import { checkLogin } from "../../utils/retailers/EditItem";
import NavBar2 from "../../components/NavBar2";

export async function loader({ params }) {
  let itemData = await axios.get(`/api/items/${params.productId}`);
  let itemInfo = itemData.data;
  return { itemInfo };
}

export default function EditItem() {
  let { itemInfo } = useLoaderData();
  let navigate = useNavigate();
  let [showComponent, setShowComponent] = useState(false);
  let [loading, setLoading] = useState(false);
  let [navLogin, setNavLogin] = useState(false);
  let [roleIsCustomer, setRoleIsCustomer] = useState(false);
  let [imgFile, setImgFile] = useState(itemInfo.image);

  let [item, setItem] = useState({
    name: itemInfo.name,
    price: itemInfo.price,
    image: itemInfo.image,
    description: itemInfo.description,
  });

  let [errors, setErrors] = useState({
    name: { errMsg: "", valid: false },
    price: { errMsg: "", valid: false },
    image: { errMsg: "", valid: false },
    description: { errMsg: "", valid: false },
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
    checkLogin(
      axios,
      navigate,
      toast,
      setNavLogin,
      setShowComponent,
      itemInfo._id
    );
  }, []);

  return (
    <>
      {showComponent ? (
        <div className="createItem">
          {/* <Navbar
            style={{ marginBottom: "0rem" }}
            login={navLogin}
            customerRole={roleIsCustomer}
          /> */}
          <NavBar2 login={navLogin} customerRole={roleIsCustomer} />
          <Forms
            requestType={"put"}
            apiRoute={`items/${itemInfo._id}`}
            navigateRoute={`/retailer/products/${itemInfo._id}`}
            setFormData={setForm}
            item={item}
            buttonText={"Edit"}
            validationError={errors}
            validation={validation}
            errors={errors}
            heading={"Edit your product Info"}
            alertMsg={"Item Info Edited successfully"}
            image={imgFile}
            loading={loading}
            setLoading={setLoading}
          />
        </div>
      ) : (
        <>
          <CircularProgress />
        </>
      )}
    </>
  );
}
