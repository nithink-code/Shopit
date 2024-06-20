import { toast } from "react-toastify";
import { server } from "../../server";

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

let checkLogin = async (
  axios,
  setNavLogin,
  setItems,
  setShowComponent,
  setRoleIsCustomer,
  roleiscustomer
) => {
  try {
    let status = await axios.post(
      `${server}api/isLoggedIn`,
      {
        route: window.location.pathname,
      },
      {
        withCredentials: true,
      }
    );
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
      );
    }
  } catch (err) {
    console.log(err);
    toast.error("Some Error Ocurred");
  }
};

let getHomePageItems = async (
  axios,
  setItems,
  setShowComponent,
  setNavLogin,
  navlogin,
  setRoleIsCustomer,
  roleiscustomer
) => {
  try {
    let Itemdata = await axios.get(`${server}api/items`, {
      withCredentials: true,
    });
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
    toast.error("Some Error Ocurred");
  }
};

let item = async (
  axios,
  navigate,
  toast,
  setItems,
  setNavLogin,
  setShowComponent,
  setRoleIsCustomer
) => {
  try {
    let data = await axios.get(`${server}api/getUserRole`, {
      withCredentials: true,
    });
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
      );
    } else if (data.data.role === "customer") {
      checkLogin(
        axios,
        setNavLogin,
        setItems,
        setShowComponent,
        setRoleIsCustomer,
        true
      );
    } else {
      checkLogin(
        axios,
        setNavLogin,
        setItems,
        setShowComponent,
        setRoleIsCustomer,
        true
      );
    }
  } catch (err) {
    console.log(err);
    toast.error("Some Error ocurred");
  }
};

export { item };
