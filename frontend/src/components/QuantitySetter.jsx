import { TextField } from "@mui/material";
import "../styles/OrderDialog.css";
import AddSub from "./AddSub";

export default function QuantitySetter({ value, stock, handleQuantityChange }) {
  return (
    <div className="quantitySetter ">
      <AddSub
        add={false}
        value={value}
        handleQuantityChange={handleQuantityChange}
      />
      <TextField
        hiddenLabel
        id="filled-hidden-label-small"
        variant="filled"
        size="small"
        disabled
        type="number"
        value={value}
        style={{ marginTop: "2rem", width: "20%" }}
      />
      <AddSub
        add={true}
        value={value}
        stock={stock}
        handleQuantityChange={handleQuantityChange}
      />
    </div>
  );
}
