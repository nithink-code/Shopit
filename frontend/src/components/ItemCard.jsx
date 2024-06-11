import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme.js";

export default function ItemCrad({ item }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Card style={{ width: "250px", height: "fit-content" }} elevation={4}>
          <CardActionArea>
            <CardMedia
              component="img"
              image={item.image}
              alt="item image"
              style={{
                height: "200px",
                width: "100%",
                transform: "scale(0.7)",
              }}
            />
            <CardContent
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "end",
              }}
            >
              <Typography gutterBottom variant="h5" component="div">
                {item.name}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </ThemeProvider>
    </>
  );
}
