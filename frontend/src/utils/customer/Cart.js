import { server } from "../../server";

let getCartDetails = async (
  axios,
  navigate,
  toast,
  setCartData,
  setNavLogin,
  setShowComponent
) => {
  try {
    let cardData = await axios.get(`${server}api/items/cart/cartdetails`, {
      withCredentials: true,
    });
    if (cardData.data === "notLogIn") {
      toast.warn("You must be Logged in");
      navigate("/login");
    } else {
      checkUserRole(
        axios,
        navigate,
        toast,
        cardData,
        setCartData,
        setNavLogin,
        setShowComponent
      );
    }
  } catch (err) {
    console.log(err);
    toast.error("some error occured");
    navigate("/");
  }
};

let checkUserRole = async (
  axios,
  navigate,
  toast,
  cardData,
  setCartData,
  setNavLogin,
  setShowComponent
) => {
  try {
    let userData = await axios.get(`${server}api/getUserRole`, {
      withCredentials: true,
    });
    if (userData.data.role === "customer") {
      setCartData(cardData.data);
      showComponents(setNavLogin, setShowComponent);
    } else {
      toast.warn("You need to log out of retailer role");
      navigate(`/retailer`);
    }
  } catch (err) {
    console.log(err);
    toast.error("some error occured");
    navigate("/");
  }
};

let showComponents = (setNavLogin, setShowComponent) => {
  setNavLogin(true);
  setShowComponent(true);
};

let CartInfo = async (
  axios,
  navigate,
  toast,
  setCartData,
  setNavLogin,
  setShowComponent
) => {
  try {
    let cardData = await axios.get(`${server}api/items/cart/cartdetails`, {
      withCredentials: true,
    });
    if (cardData.data === "notLogIn") {
      toast.warn("You must be Logged in");
      navigate("/login");
    } else {
      checkUserRole(
        axios,
        navigate,
        toast,
        cardData,
        setCartData,
        setNavLogin,
        setShowComponent
      );
    }
  } catch (err) {
    console.log(err);
    toast.error("some error occured");
    navigate("/");
  }
};

let deleteCartItem = async (
  id,
  axios,
  navigate,
  toast,
  setCartData,
  setNavLogin,
  setShowComponent,
  setLoading
) => {
  try {
    let data = await axios.delete(`${server}api/items/cart/${id}`, {
      withCredentials: true,
    });
    if (data.data === "notLogIn") {
      toast.warn("You need to login");
      navigate("/login");
    } else if (data.data === "cartItemDeleted") {
      CartInfo(
        axios,
        navigate,
        toast,
        setCartData,
        setNavLogin,
        setShowComponent
      );
      load(setLoading, false);
      toast.success("Product deleted successfully");
    }
  } catch (err) {
    console.log(err);
    toast.error("some error occured");
    navigate("/");
  }
};

let load = (setLoading, value) => {
  setLoading(value);
};

export { getCartDetails, checkUserRole, CartInfo, deleteCartItem };
