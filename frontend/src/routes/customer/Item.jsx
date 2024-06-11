import { useNavigate, Form, useLoaderData } from "react-router-dom";
import axios from "axios";
import ItemCrad from "../../components/ItemCard";
import { Button } from "@mui/material";
import Navbar from "../../components/Navbar";
import "../../styles/item.css";
import "../../styles/Home.css";
import "../../styles/Form.css";
import "../../styles/Navbar.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import { checkLogin, addToCart } from "../../utils/customer/Item";
import ItemInfo from "../../components/ItemInfo";
import NavBar2 from "../../components/NavBar2";

export async function loader({ params }) {
  let itemData = await axios.get(`/api/items/${params.id}`);
  let itemInfo = itemData.data;
  return { itemInfo };
}

export default function Item() {
  let [showComponent, setShowComponent] = useState(false);
  let [addedCart, setAddedCart] = useState(false);
  let [cartBtn, setCartBtn] = useState(false);
  const { itemInfo } = useLoaderData();
  let navigate = useNavigate();
  let [navLogin, setNavLogin] = useState(false);
  let [roleIsCustomer, setRoleIsCustomer] = useState(true);
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    if (itemInfo === null || itemInfo === "itemNotFound") {
      toast.warn("Product does not exist");
      navigate("/");
    } else {
      checkLogin(
        axios,
        navigate,
        toast,
        setAddedCart,
        setCartBtn,
        setNavLogin,
        setShowComponent,
        itemInfo._id
      );
    }
  }, []);

  let addToCartOperation = () => {
    setLoading(true);
    addToCart(axios, toast, itemInfo._id, setAddedCart, setLoading);
  };

  return (
    <>
      {showComponent ? (
        <>
          {itemInfo ? (
            <>
              {/* <Navbar
                style={{ marginBottom: "0rem" }}
                login={navLogin}
                customerRole={roleIsCustomer}
              /> */}
              <NavBar2
                login={navLogin}
                // setLogin={setNavLogin}
                customerRole={roleIsCustomer}
              />
              <ItemInfo
                item={itemInfo}
                cartBtn={cartBtn}
                addedCart={addedCart}
                addToCartOperation={addToCartOperation}
                loading={loading}
              />
            </>
          ) : null}
        </>
      ) : (
        <CircularProgress />
      )}
    </>
  );
}
