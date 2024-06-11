let checkLogin = async (
  axios,
  navigate,
  toast,
  setProducts,
  setNavLogin,
  setShowComponent
) => {
  try {
    let loginStatus = await axios.post("/api/retailer/isLoggedIn", {
      route: window.location.pathname,
    });
    if (loginStatus.data === "notLogIn") {
      toast.warn("You need to login");
      navigate("/login");
    } else {
      checkUserRole(
        axios,
        navigate,
        toast,
        setProducts,
        setNavLogin,
        setShowComponent
      );
    }
  } catch (err) {
    console.log(err);
    toast.warn("some error occured");
    navigate("/");
  }
};

let checkUserRole = async (
  axios,
  navigate,
  toast,
  setProducts,
  setNavLogin,
  setShowComponent
) => {
  try {
    let userData = await axios.get("/api/getUserRole");
    if (userData.data.role === "retailer") {
      getRetailersProducts(axios, setProducts, setNavLogin, setShowComponent);
    } else {
      toast.error("Access denied");
      navigate("/");
    }
  } catch (err) {
    console.log(err);
    toast.warn("some error occured");
    navigate("/");
  }
};

let getRetailersProducts = async (
  axios,
  setProducts,
  setNavLogin,
  setShowComponent
) => {
  try {
    let products = await axios.get("/api/retailer/products");
    setProducts(products.data);
    displayElements(setNavLogin, setShowComponent);
  } catch (err) {
    console.log(err);
    toast.warn("some error occured");
    navigate("/");
  }
};

let displayElements = (setNavLogin, setShowComponent) => {
  setNavLogin(true);
  setShowComponent(true);
};

export { checkLogin };
