import "../styles/Form.css";
import { Form } from "react-router-dom";
import Button from "@mui/material/Button";
import TextInput from "./TextInput.jsx";
import "../styles/Form.css";
import LoadButtton from "./LoadButton.jsx";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme.js";

export default function LoginForm({
  preventFormDefaultFunction,
  login,
  ValidateErrors,
  setFormData,
  route,
  loading,
}) {
  return (
    <div className="form">
      <h2>Login</h2>
      <Form
        onSubmit={(event) => {
          preventFormDefaultFunction(event, route);
        }}
      >
        <TextInput
          labelTagText=" username : "
          labelText="Enter your name "
          nameText="username"
          item={login.username}
          errors={ValidateErrors.username}
          setFormData2={setFormData}
          typeValue="text"
        />

        <TextInput
          labelTagText="Password:"
          labelText="Enter your password"
          nameText="password"
          item={login.password}
          errors={ValidateErrors.password}
          setFormData2={setFormData}
          typeValue="password"
        />
        <ThemeProvider theme={theme}>
          {loading ? (
            <LoadButtton />
          ) : (
            <Button variant="contained" type="submit">
              Login
            </Button>
          )}
        </ThemeProvider>
      </Form>
      <Grid item style={{ marginTop: "1rem" }}>
        <Link href="/signUp" variant="body2">
          {"Don't have an account? Sign Up"}
        </Link>
      </Grid>
    </div>
  );
}
