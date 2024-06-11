let checkLogin = async (
  axios,
  navigate,
  toast,
  setNavLogin,
  setShowComponent,
  itemId
) => {
  try {
    let status = await axios.post("/api/isLoggedIn", {
      route: window.location.pathname,
    });
    let res = status.data;
    if (res === "notLogIn") {
      toast.warn("You must be Logged in");
      navigate("/login");
    } else {
      checkUserRole(
        axios,
        navigate,
        toast,
        setNavLogin,
        setShowComponent,
        itemId
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
  setNavLogin,
  setShowComponent,
  itemId
) => {
  try {
    let userData = await axios.get("/api/getUserRole");
    if (userData.data.role !== "retailer") {
      toast.error("Access denied");
      navigate("/");
    } else {
      checkOwnership(
        axios,
        navigate,
        toast,
        setNavLogin,
        setShowComponent,
        itemId
      );
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
  setNavLogin,
  setShowComponent,
  itemId
) => {
  try {
    let owner = await axios.post(`/api/retailer/items/${itemId}/isOwner`);
    if (owner.data === null || owner.data === "itemNotFound") {
      toast.warn("No such product exists");
      navigate("/retailer");
    } else if (owner.data === "notOwner") {
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

export { checkLogin };
