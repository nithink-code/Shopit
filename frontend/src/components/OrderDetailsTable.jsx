import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../styles/Order.css";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import theme from "../theme";
import { ThemeProvider } from "@emotion/react";

export default function OrderDetailsTable({ order, handleClose }) {
  function createRow(desc, value) {
    return { desc, value };
  }

  const rows = [
    createRow("Order Id :", order?._id),
    createRow("Ordered On :", order?.date),
    createRow("Product :", order?.productDetail?.name),
    createRow("Product Image :", order?.productDetail?.image),
    createRow("Quantity :", order?.quantity.toLocaleString("en-IN")),
    createRow("Price :", order?.price.toLocaleString("en-IN")),
    createRow(
      "Delivery charge :",
      order?.deliveryCharge.toLocaleString("en-IN")
    ),
  ];

  let total = order?.total.toLocaleString("en-IN");

  return order ? (
    <ThemeProvider theme={theme}>
      <TableContainer component={Paper} className="orderDetailTable">
        <Table aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell align="left" colSpan={2}>
                <IconButton aria-label="close" onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </TableCell>
              <TableCell align="left" colSpan={2}>
                <b>Order Details</b>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Fields</b>
              </TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right">
                <b>Details</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.desc}>
                <TableCell>{row.desc}</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                {row.desc === "Product Image :" ? (
                  <TableCell align="right">
                    <img
                      src={row.value}
                      alt={"image"}
                      style={{ height: "4.5rem" }}
                    />
                  </TableCell>
                ) : (
                  <TableCell align="right">
                    {row.desc === "Price :" ||
                    row.desc === "Delivery charge :" ? (
                      <>&#8377;</>
                    ) : null}
                    {row.value}
                  </TableCell>
                )}
              </TableRow>
            ))}
            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={2}>
                <b>Total Amount Payed :</b>
              </TableCell>
              <TableCell align="left">&#8377;{total}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  ) : null;
}
