import { useNavigate, useLoaderData } from "react-router-dom";
import axios from "axios";
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
import OrderDialog from "../../components/OrderDialog";
import Footer from "../../components/Footer";

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

  //Dialog
  const [open, setOpen] = useState(false);
  const [deliveryCharge, setDeliveryCharge] = useState(
    Math.floor(Math.random() * 50) + 100
  );

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (itemInfo === null || itemInfo === "itemNotFound") {
      toast.warn("Product does not exist");
      navigate("/");
    } else if (itemInfo.stock === 0) {
      toast.warn("Product is Out Of Stock");
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
              <NavBar2
                login={navLogin}
                customerRole={roleIsCustomer}
                setShowComponent={setShowComponent}
              />
              <ItemInfo
                item={itemInfo}
                cartBtn={cartBtn}
                addedCart={addedCart}
                addToCartOperation={addToCartOperation}
                loading={loading}
                handleDialogClickOpen={handleClickOpen}
              />
              <OrderDialog
                open={open}
                handleClose={handleClose}
                item={itemInfo}
                deliveryCharge={deliveryCharge}
                setOpen={setOpen}
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
