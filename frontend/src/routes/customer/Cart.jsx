import Navbar from "../../components/Navbar";
import CartItemCard from "../../components/CartItemCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "../../styles/Home.css";
import CircularProgress from "@mui/material/CircularProgress";
import { getCartDetails, deleteCartItem } from "../../utils/customer/Cart.js";
import LoadButtton from "../../components/LoadButton";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme.js";
import NavBar2 from "../../components/NavBar2.jsx";

export default function Cart() {
  let navigate = useNavigate();
  let [showComponent, setShowComponent] = useState(false);
  let [cartData, setCartData] = useState([]);
  let [navLogin, setNavLogin] = useState(false);
  let [roleIsCustomer, setRoleIsCustomer] = useState(true);
  let [loading, setLoading] = useState(false);
  const [loadingItemId, setLoadingItemId] = useState(null);

  useEffect(() => {
    getCartDetails(
      axios,
      navigate,
      toast,
      setCartData,
      setNavLogin,
      setShowComponent
    );
  }, []);

  let deleteCartItemOperation = (id) => {
    setLoadingItemId(id);
    setLoading(true);
    deleteCartItem(
      id,
      axios,
      navigate,
      toast,
      setCartData,
      setNavLogin,
      setShowComponent,
      setLoading
    );
  };

  return (
    <>
      {showComponent ? (
        <>
          <ThemeProvider theme={theme}>
            <NavBar2
              login={navLogin}
              customerRole={roleIsCustomer}
              setShowComponent={setShowComponent}
            />
            <h1>Your Cart</h1>
            <div className="itemsList">
              {cartData.map((cartItem) => {
                return (
                  <div className="items cartItems" key={cartItem._id}>
                    <div className="cartItemCard">
                      <a
                        href={`/item/${cartItem._id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <CartItemCard
                          title={cartItem.name}
                          img={cartItem.image}
                          key={cartItem._id}
                          itemId={cartItem._id}
                          loading={loading}
                          deleteCartItemOperation={deleteCartItemOperation}
                        />
                      </a>
                    </div>
                    <div className="cartDeleteBtn" key={cartItem._id}>
                      {loading && loadingItemId === cartItem._id ? (
                        <LoadButtton key={cartItem._id} />
                      ) : (
                        <Button
                          variant="text"
                          size="medium"
                          style={{ marginTop: "10px" }}
                          startIcon={<DeleteIcon />}
                          onClick={() => deleteCartItemOperation(cartItem._id)}
                          key={cartItem._id}
                        >
                          Remove from cart
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </ThemeProvider>
        </>
      ) : (
        <CircularProgress />
      )}
    </>
  );
}
