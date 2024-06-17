import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme.js";
import "../styles/OrderDialog.css";
import Stock from "./Stock.jsx";
import "../styles/ItemInfo.css";
import { DialogContentText } from "@mui/material";
import { useState, useEffect } from "react";
import QuantitySetter from "./QuantitySetter.jsx";
import { handleQuantChange, orderProduct } from "../utils/customer/Order.js";
import { useNavigate } from "react-router-dom";
import LoadButtton from "./LoadButton.jsx";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function OrderDialog({ open, handleClose, item, setOpen }) {
  let navigate = useNavigate();

  let [loading, setLoading] = useState(false);

  const [deliveryCharge, setDeliveryCharge] = useState(
    Math.floor(Math.random() * 50) + 100
  );

  let [orderDetail, setOrderDetail] = useState({
    quantity: 1,
    price: 1 * item.price,
    deliveryCharge: deliveryCharge,
    total: item.price + deliveryCharge,
  });

  let handleQuantityChange = (add) => {
    handleQuantChange(setOrderDetail, add, item);
  };

  let orderFunction = () => {
    setLoading(true);
    orderProduct(navigate, orderDetail, item._id, setOpen);
    setLoading(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <Dialog fullWidth={true} maxWidth={"md"} open={open}>
          <DialogTitle style={{ textAlign: "center" }}>{item.name}</DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent
            style={{
              wordWrap: "break-word",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <Typography component={"div"} className="imageContent">
              <img
                src={item.image}
                alt={item.name}
                // style={{ width: "220px", height: "126px" }}
              />
              <Stock stock={item.stock} />
              <div className="quantitySetter">
                <QuantitySetter
                  value={orderDetail.quantity}
                  stock={item.stock}
                  handleQuantityChange={handleQuantityChange}
                />
              </div>
            </Typography>
            <Typography component={"div"} className="textContent">
              <DialogContentText
                style={{ fontSize: "larger", fontWeight: "bolder" }}
              >
                Quantity : {orderDetail.quantity}
              </DialogContentText>
              <DialogContentText
                style={{ fontSize: "larger", fontWeight: "bolder" }}
              >
                Price : &#8377;{orderDetail.price}
              </DialogContentText>
              <DialogContentText
                style={{ fontSize: "larger", fontWeight: "bolder" }}
              >
                Delivery Charge : &#8377;{orderDetail.deliveryCharge}
              </DialogContentText>
              <DialogContentText
                style={{ fontSize: "larger", fontWeight: "bolder" }}
              >
                Total Price : &#8377;{orderDetail.total.toLocaleString("en-IN")}
              </DialogContentText>
            </Typography>
          </DialogContent>
          <DialogActions>
            {loading ? (
              <LoadButtton processing={true} />
            ) : (
              <Button onClick={orderFunction}>Pay</Button>
            )}
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </ThemeProvider>
  );
}
