import { Form } from "react-router-dom";
import Button from "@mui/material/Button";
import TextInput from "./TextInput.jsx";
import "../styles/Form.css";
import LoadButtton from "./LoadButton.jsx";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme.js";

export default function SignUpForm({
  preventFormDefaultFunction,
  signUp,
  ValidateErrors,
  setFormData,
  route,
  loading,
}) {
  return (
    <>
      <div className="form">
        <h2>SignUp</h2>
        <Form
          onSubmit={(event) => {
            preventFormDefaultFunction(event, route);
          }}
          style={{ marginBottom: "7rem" }}
        >
          <TextInput
            labelTagText=" username : "
            labelText="Create your username "
            nameText="username"
            item={signUp.username}
            errors={ValidateErrors.username}
            setFormData2={setFormData}
            typeValue="text"
          />

          <TextInput
            labelTagText="email :"
            labelText="Enter your email"
            nameText="email"
            item={signUp.email}
            errors={ValidateErrors.email}
            setFormData2={setFormData}
            typeValue="text"
          />

          <TextInput
            labelTagText="Password"
            labelText="Enter a password"
            nameText="password"
            item={signUp.password}
            errors={ValidateErrors.password}
            setFormData2={setFormData}
            typeValue="password"
          />
          <ThemeProvider theme={theme}>
            {loading ? (
              <LoadButtton />
            ) : (
              <Button variant="contained" type="submit">
                SignUp
              </Button>
            )}
          </ThemeProvider>
        </Form>
      </div>
    </>
  );
}
