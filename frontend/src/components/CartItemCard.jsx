import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme.js";

export default function CartItemCard({ title, img }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Card
          style={{
            width: "250px",
            height: "fit-content",
            marginBottom: "1rem",
          }}
          elevation={4}
        >
          <CardHeader title={title} />
          <CardMedia
            component="img"
            height="fit-content"
            image={img}
            alt="Product image"
            style={{
              height: "200px",
              width: "100%",
              transform: "scale(0.7)",
              border: "0",
            }}
          />
        </Card>
      </ThemeProvider>
    </>
  );
}
