import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import "../styles/ItemInfo.css";
import { Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Form } from "react-router-dom";
import LoadButtton from "./LoadButton";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme.js";

export default function ItemInfo({
  item,
  cartBtn,
  addedCart,
  addToCartOperation,
  retailer,
  deleteItemOperation,
  loading,
}) {
  return (
    <Paper
      elevation={8}
      style={{ borderRadius: "2rem", marginTop: "2rem" }}
      className="paper"
    >
      <div className="itemImage">
        <img src={item.image} alt={item.name} />
      </div>
      <div className="itemContent">
        <div className="itemData">
          <Typography
            gutterBottom
            variant="h3"
            component="div"
            style={{ wordWrap: "break-word" }}
          >
            {item.name}
          </Typography>
          <Typography
            gutterBottom
            variant="body1"
            style={{ wordWrap: "break-word" }}
            component="div"
          >
            <p style={{ width: "100%" }}>{item.description}</p>
          </Typography>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            style={{ wordWrap: "break-word" }}
          >
            Price : &#8377;{item.price?.toLocaleString("en-IN")}
          </Typography>
        </div>
        <ThemeProvider theme={theme}>
          <div className="itemButtons">
            <>
              {cartBtn ? (
                <>
                  {loading ? (
                    <LoadButtton />
                  ) : (
                    <>
                      {addedCart ? (
                        <Button variant="contained" disabled>
                          <b>Available in your cart</b>
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          color="success"
                          onClick={addToCartOperation}
                        >
                          <b>Add To Cart</b>
                        </Button>
                      )}
                    </>
                  )}
                </>
              ) : null}
            </>
            {!retailer ? (
              <Button
                variant="contained"
                color="success"
                style={{ marginLeft: "2rem" }}
              >
                Buy Now
              </Button>
            ) : (
              <>
                <Form
                  method="GET"
                  action={`/retailer/products/${item._id}/edit`}
                >
                  <Button
                    variant="text"
                    type="submit"
                    style={{ marginLeft: "2rem" }}
                  >
                    Edit
                  </Button>
                </Form>
                {loading ? (
                  <LoadButtton />
                ) : (
                  <Button
                    variant="text"
                    size="medium"
                    startIcon={<DeleteIcon />}
                    onClick={() => {
                      deleteItemOperation(item._id);
                    }}
                    style={{ marginLeft: "2rem" }}
                  >
                    Delete
                  </Button>
                )}
              </>
            )}
          </div>
        </ThemeProvider>
      </div>
    </Paper>
  );
}
