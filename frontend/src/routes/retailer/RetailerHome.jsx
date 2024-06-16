import { useLoaderData, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import ItemCrad from "../../components/ItemCard";
import CircularProgress from "@mui/material/CircularProgress";
import "../../styles/Home.css";
import { checkLogin } from "../../utils/retailers/RetailerHome";
import NavBar2 from "../../components/NavBar2";

export default function RetailerHome() {
  let navigate = useNavigate();
  let [navLogin, setNavLogin] = useState(false);
  let [roleIsCustomer, setRoleIsCustomer] = useState(false);
  let [products, setProducts] = useState([]);
  let [showComponent, setShowComponent] = useState(false);
  let cardDetails = { name: true };

  useEffect(() => {
    checkLogin(
      axios,
      navigate,
      toast,
      setProducts,
      setNavLogin,
      setShowComponent
    );
  }, []);

  return (
    <>
      {showComponent ? (
        <>
          <NavBar2
            login={navLogin}
            customerRole={roleIsCustomer}
            setShowComponent={setShowComponent}
          />
          <h1>Retailer HomePage</h1>
          <div className="itemsList">
            {products.map((product) => {
              return (
                <a href={`/retailer/products/${product._id}`} key={product._id}>
                  <div className="items">
                    <ItemCrad item={product} cardDetails={cardDetails} />
                  </div>
                </a>
              );
            })}
          </div>
        </>
      ) : (
        <CircularProgress />
      )}
    </>
  );
}
