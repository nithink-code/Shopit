import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar2 from "./components/NavBar2";

function App() {
  let showAlert = () => {
    toast.success("Logged in successfully ");
  };

  return (
    <>
      <NavBar2 />
    </>
  );
}

export default App;
