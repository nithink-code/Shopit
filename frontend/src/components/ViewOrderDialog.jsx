import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import OrderDetailsTable from "./OrderDetailsTable";

export default function ViewOrderDialog({ order, open, handleClose }) {
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <OrderDetailsTable order={order} handleClose={handleClose} />
      </Backdrop>
    </div>
  );
}
