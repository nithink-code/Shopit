import { toast } from "react-toastify";
import { server } from "../../server";

let checkAddCartBtn = async (
  axios,
  setAddedCart,
  setCartBtn,
  setNavLogin,
  setShowComponent,
  itemId
) => {
  try {
    await axios
      .get(`${server}/api/items/cart/${itemId}/isAdded`, {
        withCredentials: true,
      })
      .then((data) => {
        if (data.data === "presentInCart") {
          displayElements(
            setAddedCart,
            setCartBtn,
            setNavLogin,
            setShowComponent,
            true
          );
        } else if (data.data === "notPresentInCart") {
          displayElements(
            setAddedCart,
            setCartBtn,
            setNavLogin,
            setShowComponent,
            false
          );
        }
      });
  } catch (err) {
    console.log(err);
    toast.error("Some Error Ocurred");
  }
};

let displayElements = (
  setAddedCart,
  setCartBtn,
  setNavLogin,
  setShowComponent,
  addedcart
) => {
  itemAddedToCartCheckBtn(setAddedCart, addedcart);
  setCartBtn(true);
  setNavLogin(true);
  setShowComponent(true);
};

let itemAddedToCartCheckBtn = (setAddedCart, addedcart) => {
  setAddedCart(addedcart);
};

let checkLogin = async (
  axios,
  navigate,
  toast,
  setAddedCart,
  setCartBtn,
  setNavLogin,
  setShowComponent,
  itemId
) => {
  try {
    let status = await axios.post(
      `${server}/api/isLoggedIn`,
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
      await axios
        .get(`${server}/api/getUserRole`, {
          withCredentials: true,
        })
        .then((userData) => {
          if (userData.data.role === "retailer") {
            toast.warn("You need to log out of retailer role");
            navigate(`/retailer/`);
          } else {
            checkAddCartBtn(
              axios,
              setAddedCart,
              setCartBtn,
              setNavLogin,
              setShowComponent,
              itemId
            );
          }
        });
    }
  } catch (err) {
    console.log(err);
    toast.error("Some Error Ocurred");
  }
};

let addToCart = async (axios, toast, itemId, setAddedCart, setLoading) => {
  await axios
    .get(`${server}/api/items/cart/${itemId}/addcart`, {
      withCredentials: true,
    })
    .then((data) => {
      if (data.data === "presentInCart") {
        toast.warn("Product already present in cart");
        itemAddedToCartCheckBtn(setAddedCart, true);
        load(setLoading, false);
      } else if (data.data === "addedToCart") {
        toast.success("Product added to cart");
        itemAddedToCartCheckBtn(setAddedCart, true);
        load(setLoading, false);
      }
    })
    .catch((err) => {
      console.log(err);
      toast.error("Some Error Ocurred");
    });
};

let load = (setLoading, value) => {
  setLoading(value);
};
export { checkLogin, addToCart };
