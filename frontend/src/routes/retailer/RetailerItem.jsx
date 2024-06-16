import { useNavigate, Form, useLoaderData } from "react-router-dom";
import axios from "axios";
import ItemCrad from "../../components/ItemCard";
import { Button } from "@mui/material";
import Navbar from "../../components/Navbar";
import "../../styles/item.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import { checkLogin, deleteItem } from "../../utils/retailers/RetailerItem";
import ItemInfo from "../../components/ItemInfo";
import NavBar2 from "../../components/NavBar2";
import StatsDialog from "../../components/StatsDialog";

export async function loader({ params }) {
  let itemData = await axios.get(`/api/items/${params.productId}`);
  let itemInfo = itemData.data;
  return { itemInfo };
}

export default function RetailerItem() {
  let [showComponent, setShowComponent] = useState(false);
  const { itemInfo } = useLoaderData();
  let navigate = useNavigate();
  let [navLogin, setNavLogin] = useState(false);
  let [loading, setLoading] = useState(false);
  let [roleIsCustomer, setRoleIsCustomer] = useState(false);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    checkLogin(axios, navigate, toast, itemInfo, setNavLogin, setShowComponent);
  }, []);

  let deleteItemOperation = (id) => {
    setLoading(true);
    deleteItem(axios, navigate, toast, id, setLoading);
  };

  return (
    <>
      {showComponent ? (
        <>
          {itemInfo ? (
            <div className="itemInfo ">
              <NavBar2
                login={navLogin}
                customerRole={roleIsCustomer}
                setShowComponent={setShowComponent}
              />
              <div className="item">
                <ItemInfo
                  item={itemInfo}
                  retailer={true}
                  deleteItemOperation={deleteItemOperation}
                  loading={loading}
                  handleOpen={handleClickOpen}
                />
              </div>
              <StatsDialog
                open={open}
                handleClose={handleClose}
                item={itemInfo}
              />
            </div>
          ) : null}
        </>
      ) : (
        <CircularProgress />
      )}
    </>
  );
}
