import { server } from "../../server";

let checkLogin = async (
  axios,
  navigate,
  toast,
  setNavLogin,
  setShowComponent
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
    if (status.data === "notLogIn") {
      toast.warn("You must be Logged in");
      navigate("/login");
    } else {
      let userData = await axios.get(`${server}api/getUserRole`, {
        withCredentials: true,
      });
      if (userData.data.role !== "retailer") {
        toast.error("Access denied");
        navigate("/");
      } else {
        displayElements(setNavLogin, setShowComponent);
      }
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
