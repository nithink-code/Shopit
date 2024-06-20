import { Form } from "react-router-dom";
import "../styles/Form.css";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { validateForm } from "../validations/FormValidation";
import TextInput from "./TextInput";
import { toast } from "react-toastify";
import LoadButtton from "./LoadButton.jsx";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme.js";
import { server } from "../server.js";

export default function Forms({
  alertMsg,
  heading,
  validation,
  errors,
  buttonText,
  setFormData,
  item,
  requestType,
  apiRoute,
  navigateRoute,
  image,
  loading,
  setLoading,
}) {
  const navigate = useNavigate();

  let preventFormDefaultFunction = async (event) => {
    event.preventDefault();
    let { newErrors, err } = validateForm(item, errors);
    validation(newErrors);
    const data = new FormData();
    data.append("name", item.name);
    data.append("price", item.price);
    data.append("description", item.description);
    data.append("image", item.image);
    data.append("stock", item.stock);
    if (!err) {
      setLoading(true);
      await axios[requestType](
        `${server}api/${apiRoute}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
        {
          withCredentials: true,
        }
      )
        .then((apiData) => {
          let data = apiData.data;
          if (data === "Retailer not found") {
            toast.error("Some error occured please try again");
            navigate(window.location.pathname);
          } else if (data === "notOwner") {
            toast.warn("You are not the owner of this product");
            navigate(navigateRoute);
          } else {
            toast.success(alertMsg);
            navigate(navigateRoute);
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          toast.error(err.response.data);
        });
    }
  };

  return (
    <div className="form">
      <h2>{heading}</h2>
      <Form onSubmit={preventFormDefaultFunction}>
        <TextInput
          labelTagText="Product Name : "
          labelText="Enter product name"
          nameText="name"
          item={item.name}
          errors={errors.name}
          setFormData2={setFormData}
          typeValue="text"
        />

        <TextInput
          labelTagText="Price"
          labelText="Enter price"
          nameText="price"
          item={item.price}
          errors={errors.price}
          setFormData2={setFormData}
          typeValue="number"
        />

        <TextInput
          labelTagText="Description : "
          labelText="Enter product description"
          nameText="description"
          item={item.description}
          errors={errors.description}
          setFormData2={setFormData}
          typeValue="text"
        />

        {image !== "" ? (
          <div className="imgPreview" style={{ display: "flex" }}>
            <label
              htmlFor="img"
              style={{ marginRight: "1rem", marginLeft: "1rem" }}
            >
              <b>Image Preview</b>
            </label>
            <img
              src={image}
              alt={"preview image"}
              style={{ height: "6rem", width: "6rem" }}
              accept={"image/png , image/jpg , image/jpeg"}
            />
          </div>
        ) : null}

        <TextInput
          labelTagText="Image : "
          labelText="Enter product image "
          nameText="image"
          item={item.image}
          errors={errors.image}
          setFormData2={setFormData}
          typeValue="file"
        />

        <TextInput
          labelTagText="Quantity: "
          labelText="Enter product quantity available"
          nameText="stock"
          item={item.stock}
          errors={errors.stock}
          setFormData2={setFormData}
          typeValue="number"
        />

        <ThemeProvider theme={theme}>
          {loading ? (
            <LoadButtton />
          ) : (
            <Button variant="contained" type="submit">
              {buttonText}
            </Button>
          )}
        </ThemeProvider>
      </Form>
    </div>
  );
}
