import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../server";

//Order Dialog

let handleQuantChange = (setOrderDetail, add, item) => {
  setOrderDetail((prevData) => {
    const newQuantity = add ? prevData.quantity + 1 : prevData.quantity - 1;
    const newPrice = newQuantity * item.price;
    const newTotal = newPrice + prevData.deliveryCharge;
    return {
      ...prevData,
      quantity: newQuantity,
      price: newPrice,
      total: newTotal,
    };
  });
};

let orderProduct = async (navigate, orderDetail, id, setOpen) => {
  try {
    let res = await axios.post(`${server}/api/order/item/${id}`, orderDetail, {
      withCredentials: true,
    });
    if (res.data === "notLogin") {
      toast.warn("You need to Login");
      navigate("/login");
    } else if (res.data === "RoleIsRetailer") {
      toast.error("Access denied for Retailers");
      navigate("/retailer");
    } else if (res.data === "itemNotFound") {
      toast.error("No such Item exists");
      navigate("/");
    } else if (res.data === "ProductOutOfStock") {
      toast.error("Product Out Of Stock");
      navigate("/");
    } else if (res.data === "ordered") {
      toast.success("Order Placed . Thank you for Ordering");
      navigate("/item/orders");
    }
  } catch (err) {
    console.log(err);
    toast.error("Some error occured");
    navigate("/");
  }
};

//View Order Details
let orderDetails = async (
  navigate,
  setShowComponent,
  setNavLogin,
  setOrders
) => {
  try {
    let res = await axios.get(`${server}/api/order/item`, {
      withCredentials: true,
    });
    if (res.data === "notLogin") {
      toast.warn("You must login");
      navigate("/login");
    } else if (res.data === "RoleIsRetailer") {
      toast.error("Access Denied");
      navigate("/retailer");
    } else {
      setOrders(res.data);
      loginStatus(setNavLogin, true);
      displayComponents(setShowComponent, true);
    }
  } catch (err) {
    console.log(err);
    toast.error("Some error occured");
    navigate("/");
  }
};

let displayComponents = (setShowComponent, value) => {
  setShowComponent(value);
};

//to check login status
let loginStatus = (setLogin, value) => {
  setLogin(value);
};

export { handleQuantChange, orderProduct, orderDetails };
