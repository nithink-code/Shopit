import { useNavigate, Form, useLoaderData } from "react-router-dom";
import axios from "axios";
import "../../styles/item.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import { checkLogin, deleteItem } from "../../utils/retailers/RetailerItem";
import ItemInfo from "../../components/ItemInfo";
import NavBar2 from "../../components/NavBar2";
import StatsDialog from "../../components/StatsDialog";
import Footer from "../../components/Footer";
import { server } from "../../server";

export async function loader({ params }) {
  let itemData = await axios.get(`${server}api/items/${params.productId}`, {
    withCredentials: true,
  });
  let itemInfo = itemData.data;
  return { itemInfo };
}

export default function RetailerItem() {
  let [showComponent, setShowComponent] = useState(false);
  const { itemInfo } = useLoaderData();
  let [item, setItem] = useState(itemInfo);
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
    checkLogin(
      axios,
      navigate,
      toast,
      itemInfo,
      setNavLogin,
      setShowComponent,
      setItem
    );
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
                  item={item}
                  retailer={true}
                  deleteItemOperation={deleteItemOperation}
                  loading={loading}
                  handleOpen={handleClickOpen}
                />
              </div>
              <StatsDialog open={open} handleClose={handleClose} item={item} />
            </div>
          ) : null}
        </>
      ) : (
        <CircularProgress />
      )}
    </>
  );
}
