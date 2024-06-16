import "../styles/ItemInfo.css";
import Paper from "@mui/material/Paper";

export default function Stock({ stock }) {
  return (
    <Paper className="stock" elevation={8}>
      <b>In Stock : {stock}</b>
    </Paper>
  );
}
