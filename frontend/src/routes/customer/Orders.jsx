import { useEffect, useState } from "react";
import NavBar2 from "../../components/NavBar2";
import { useNavigate } from "react-router-dom";
import { orderDetails } from "../../utils/customer/Order";
import { CircularProgress } from "@mui/material";
import OrderImageBtns from "../../components/OrderImageBtns";
import "../../styles/Order.css";
import ViewOrderDialog from "../../components/ViewOrderDialog";

export default function Orders() {
  let navigate = useNavigate();

  let [orders, setOrders] = useState([]);
  let [showComponent, setShowComponent] = useState(false);
  let [navLogin, setNavLogin] = useState(false);
  let [dialogOrder, setDialogOrder] = useState(null);
  let [open, setOpen] = useState(false);

  useEffect(() => {
    orderDetails(navigate, setShowComponent, setNavLogin, setOrders);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = (order) => {
    setDialogOrder(order);
    setOpen(true);
  };

  return (
    <>
      {showComponent ? (
        <>
          <NavBar2
            login={navLogin}
            customerRole={true}
            setShowComponent={setShowComponent}
          />
          <h1 style={{ marginTop: "1rem" }}>Your Orders</h1>
          <div className="orderBtns">
            {orders.map((order) => {
              return (
                <div className="orderImageBtn" key={order._id}>
                  <OrderImageBtns
                    order={order}
                    style={{ margin: "2rem" }}
                    openOrderDialog={handleOpen}
                  />
                </div>
              );
            })}
          </div>
          <ViewOrderDialog
            open={open}
            order={dialogOrder}
            handleClose={handleClose}
          />
        </>
      ) : (
        <CircularProgress />
      )}
    </>
  );
}
