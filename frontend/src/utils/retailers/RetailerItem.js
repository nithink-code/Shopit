import { server } from "../../server";

let checkLogin = async (
  axios,
  navigate,
  toast,
  itemInfo,
  setNavLogin,
  setShowComponent
) => {
  try {
    let status = await axios.get(`${server}api/retailer/roleAndLogin`);
    if (status.data === "notLogin") {
      toast.warn("You must be Logged in");
      navigate("/login");
    } else if (status.data === "RoleIsCustomer") {
      toast.error("Access denied");
      navigate("/");
    } else {
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
    }
  } catch (err) {
    console.log(err);
    toast.error("some error occured");
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
    let owner = await axios.post(
      `${server}api/retailer/items/${itemInfo._id}/isOwner`
    );
    if (owner.data === "notOwner") {
      toast.warn("You are not the owner");
      navigate("/retailer");
    } else {
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

let deleteItem = async (axios, navigate, toast, id, setLoading) => {
  try {
    load(setLoading, true);
    deleteOperation(axios, navigate, toast, id);
  } catch (err) {
    console.log(err);
    toast.error("some error occured");
    navigate("/");
  }
};

let deleteOperation = async (axios, navigate, toast, id) => {
  try {
    let dataInfo = await axios.delete(`${server}api/items/${id}`);
    if (dataInfo.data === "notLogin") {
      toast.warn("You must be Logged in");
      navigate("/login");
    } else if (dataInfo.data === "notOwner") {
      toast.warn("You are not the owner of this product");
      navigate(`/retailer`);
    } else {
      toast.success("Product successfully deleted");
      navigate("/retailer");
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

export { checkLogin, deleteItem };
