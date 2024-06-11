import axios from "axios";
import { useState, useEffect } from "react";
import "../../styles/Home.css";
import ItemCrad from "../../components/ItemCard";
import Navbar from "../../components/Navbar";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { item } from "../../utils/customer/Home";
import "../../styles/Home.css";
import "../../styles/item.css";
import "../../styles/Form.css";
import "../../styles/Navbar.css";
import NavBar2 from "../../components/NavBar2";

export default function Home() {
  let navigate = useNavigate();
  let [items, setItems] = useState([]);
  let [showComponent, setShowComponent] = useState(false);
  let cardDetails = { name: true };
  let [navLogin, setNavLogin] = useState(false);
  let [roleIsCustomer, setRoleIsCustomer] = useState(false);
  // let [notLogIn, setNotLogin] = useState(false);

  let navLogOutConfig = () => {
    setShowComponent(false);
    setNavLogin(false);
    setShowComponent(true);
  };

  useEffect(() => {
    item(
      axios,
      navigate,
      toast,
      setItems,
      // setNotLogin,
      setNavLogin,
      setShowComponent,
      setRoleIsCustomer
    );
  }, []);

  return (
    <>
      {showComponent ? (
        <div className="homepage">
          {/* <Navbar
            style={{ marginBottom: "2rem" }}
            login={navLogin}
            customerRole={roleIsCustomer}
            roleNotLogin={notLogIn}
            homePageLogOut={navLogOutConfig}
          /> */}
          <NavBar2
            login={navLogin}
            // setLogin={setNavLogin}
            customerRole={roleIsCustomer}
            homePageLogOut={navLogOutConfig}
            setShowComponent={setShowComponent}
          />
          <div className="itemsList">
            {items.map((singleItem) => (
              <a href={`/item/${singleItem._id}`} key={singleItem._id}>
                <div className="items">
                  <ItemCrad item={singleItem} cardDetails={cardDetails} />
                </div>
              </a>
            ))}
          </div>
        </div>
      ) : (
        <CircularProgress />
      )}
    </>
  );
}
