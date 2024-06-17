import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import theme from "../theme";
import { ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import BarChartIcon from "@mui/icons-material/BarChart";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function StatsDialog({ open, handleClose, item }) {
  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <Dialog fullWidth={true} maxWidth={"md"} open={open}>
          <DialogTitle
            sx={{ m: 0, p: 2, textAlign: "center" }}
            id="customized-dialog-title"
            style={{ textAlign: "center" }}
          >
            <b style={{ textAlign: "center" }}>
              Statistics <BarChartIcon />
            </b>
          </DialogTitle>
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
            dividers
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
            }}
          >
            <Typography
              component={"div"}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <Typography component={"div"} gutterBottom>
                No. Of Purchases :
              </Typography>
              <Typography component={"div"} gutterBottom>
                {item?.purchases?.toLocaleString("en-IN")}
              </Typography>
            </Typography>

            <Typography
              component={"div"}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <Typography component={"div"} gutterBottom>
                Your Profit :
              </Typography>
              <Typography component={"div"} gutterBottom>
                &#8377;{item?.profit?.toLocaleString("en-IN")}
              </Typography>
            </Typography>
            <Typography component={"div"} gutterBottom>
              <Alert severity="info">
                Note : Please note that delivery charges are not included, as
                they are managed by Shopit
              </Alert>
            </Typography>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    </ThemeProvider>
  );
}
