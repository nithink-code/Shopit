import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import theme from "../theme";
import { ThemeProvider } from "@mui/material";

export default function AddSub({ add, value, stock, handleQuantityChange }) {
  return (
    <ThemeProvider theme={theme}>
      {add ? (
        <>
          {value === stock || stock === 0 ? (
            <Button disabled>
              <AddIcon />
            </Button>
          ) : (
            <Button onClick={() => handleQuantityChange(true)}>
              <AddIcon />
            </Button>
          )}
        </>
      ) : (
        <>
          {value === 1 ? (
            <Button disabled>
              <RemoveIcon />
            </Button>
          ) : (
            <Button onClick={() => handleQuantityChange(false)}>
              <RemoveIcon />
            </Button>
          )}
        </>
      )}
    </ThemeProvider>
  );
}
