import { server } from "../../server";

let checkLogin = async (
  axios,
  navigate,
  toast,
  setProducts,
  setNavLogin,
  setShowComponent
) => {
  try {
    getRetailersProducts(
      axios,
      setProducts,
      setNavLogin,
      setShowComponent,
      toast,
      navigate
    );
  } catch (err) {
    console.log(err);
    toast.error("some error occured");
    navigate("/");
  }
};

let getRetailersProducts = async (
  axios,
  setProducts,
  setNavLogin,
  setShowComponent,
  toast,
  navigate
) => {
  try {
    let products = await axios.get(`${server}api/retailer/products`);
    if (products.data === "notLogin") {
      toast.warn("You need to login");
      navigate("/login");
    } else if (products.data === "RoleIsCustomer") {
      toast.error("Access denied for customers");
      navigate("/");
    } else {
      setProducts(products.data);
      displayElements(setNavLogin, setShowComponent);
    }
  } catch (err) {
    console.log(err);
    toast.error("some error occured");
    navigate("/");
  }
};

let displayElements = (setNavLogin, setShowComponent) => {
  setNavLogin(true);
  setShowComponent(true);
};

export { checkLogin };
