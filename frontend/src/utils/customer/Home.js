let loading = (
  setShowComponent,
  setNavLogin,
  navlogin,
  setRoleIsCustomer,
  roleiscustomer
) => {
  setRoleIsCustomer(roleiscustomer);
  setNavLogin(navlogin);
  setShowComponent(true);
};

let notlogin = (setNotLogin, navnotlogin) => {
  setNotLogin(navnotlogin);
};

let checkLogin = async (
  axios,
  setNavLogin,
  setItems,
  setShowComponent,
  setRoleIsCustomer,
  roleiscustomer,
  setNotLogin,
  navnotlogin
) => {
  try {
    let status = await axios.post("/api/isLoggedIn");
    let res = status.data;
    if (res === "LoggedIn") {
      getHomePageItems(
        axios,
        setItems,
        setShowComponent,
        setNavLogin,
        true,
        setRoleIsCustomer,
        roleiscustomer
        // setNotLogin,
        // navnotlogin
      );
    } else {
      getHomePageItems(
        axios,
        setItems,
        setShowComponent,
        setNavLogin,
        false,
        setRoleIsCustomer,
        roleiscustomer
        // setNotLogin,
        // navnotlogin
      );
    }
  } catch (err) {
    console.log(err);
  }
};

let getHomePageItems = async (
  axios,
  setItems,
  setShowComponent,
  setNavLogin,
  navlogin,
  setRoleIsCustomer,
  roleiscustomer,
  setNotLogin,
  navnotlogin
) => {
  try {
    // notlogin(setNotLogin, navnotlogin);
    let Itemdata = await axios.get("/api/items");
    let dataitems = Itemdata.data;
    setItems(dataitems);
    loading(
      setShowComponent,
      setNavLogin,
      navlogin,
      setRoleIsCustomer,
      roleiscustomer
    );
  } catch (err) {
    console.log(err);
  }
};

let item = async (
  axios,
  navigate,
  toast,
  setItems,
  // setNotLogin,
  setNavLogin,
  setShowComponent,
  setRoleIsCustomer
) => {
  try {
    let data = await axios.get("/api/getUserRole");
    if (data.data.role === "retailer") {
      toast.warn("You need to log out of retailer role");
      navigate(`/retailer`);
    } else if (data.data.role === undefined) {
      checkLogin(
        axios,
        setNavLogin,
        setItems,
        setShowComponent,
        setRoleIsCustomer,
        false
        // setNotLogin,
        // true
      );
    } else {
      checkLogin(
        axios,
        setNavLogin,
        setItems,
        setShowComponent,
        setRoleIsCustomer,
        true
        // setNotLogin,
        // false
      );
    }
  } catch (err) {
    console.log(err);
  }
};

export { item };
