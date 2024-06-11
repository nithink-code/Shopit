let checkLogin = async (
  axios,
  navigate,
  toast,
  itemInfo,
  setNavLogin,
  setShowComponent
) => {
  try {
    let status = await axios.post("/api/isLoggedIn", {
      route: window.location.pathname,
    });
    if (status.data === "notLogIn") {
      toast.warn("You must be Logged in");
      navigate("/login");
    } else {
      let userData = await axios.get("/api/getUserRole");
      if (userData.data.role === "retailer") {
        if (itemInfo === null || itemInfo === "itemNotFound") {
          toast.warn("Product does not exist");
          navigate("/retailer");
        } else {
          checkOwnership(
            axios,
            navigate,
            toast,
            itemInfo,
            setNavLogin,
            setShowComponent
          );
        }
      } else {
        toast.warn("Access denied");
        navigate("/");
      }
    }
  } catch (err) {
    console.log(err);
    toast.warn("some error occured");
    navigate("/");
  }
};

let checkOwnership = async (
  axios,
  navigate,
  toast,
  itemInfo,
  setNavLogin,
  setShowComponent
) => {
  try {
    let owner = await axios.post(`/api/retailer/items/${itemInfo._id}/isOwner`);
    if (owner.data === "notOwner") {
      toast.warn("You are not the owner");
      navigate("/retailer");
    } else {
      displayElements(setNavLogin, setShowComponent);
    }
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

let deleteItem = async (axios, navigate, toast, id, setLoading) => {
  try {
    load(setLoading, true);
    let status = await axios.post("/api/isLoggedIn", {
      route: window.location.pathname,
    });
    let res = status.data;
    if (res === "notLogIn") {
      toast.warn("You must be Logged in");
      navigate("/login");
    } else if (res == "LoggedIn") {
      deleteOperation(axios, navigate, toast, id);
    }
  } catch (err) {
    console.log(err);
    toast.warn("some error occured");
    navigate("/");
  }
};

let deleteOperation = async (axios, navigate, toast, id) => {
  try {
    let dataInfo = await axios.delete(`/api/items/${id}`);
    if (dataInfo.data === "notOwner") {
      toast.warn("You are not the owner of this product");
      navigate(`/retailer`);
    } else {
      toast.success("Product successfully deleted");
      navigate("/retailer");
    }
  } catch (err) {
    console.log(err);
    toast.warn("some error occured");
    navigate("/");
  }
};

let load = (setLoading, value) => {
  setLoading(value);
};

export { checkLogin, deleteItem };
