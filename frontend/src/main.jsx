import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/customer/Home.jsx";
import Item, { loader as itemLoader } from "./routes/customer/Item.jsx";
import CreateItem from "./routes/retailer/CreateItem.jsx";
import EditItem from "./routes/retailer/EditItem.jsx";
import { loader as editLoader } from "./routes/retailer/EditItem.jsx";
import ErrorPage from "./routes/customer/ErrorPage.jsx";
import SignUp from "./routes/customer/SignUp.jsx";
import Login from "./routes/customer/Login.jsx";
import Cart from "./routes/customer/Cart.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/Login.css";
import RetailerHome from "./routes/retailer/RetailerHome.jsx";
import RetailerItem, {
  loader as retailerItemLoader,
} from "./routes/retailer/RetailerItem.jsx";
import Orders from "./routes/customer/Orders.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/item/:id",
    element: <Item />,
    loader: itemLoader,
    errorElement: <ErrorPage />,
  },
  // {
  //   path: "/error",
  //   element: <ErrorPage />,
  // },
  {
    path: "/signUp",
    element: <SignUp />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/item/cart",
    element: <Cart />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/retailer",
    element: <RetailerHome />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/retailer/products/:productId",
    element: <RetailerItem />,
    loader: retailerItemLoader,
    errorElement: <ErrorPage />,
  },
  {
    path: "/retailer/products/new",
    element: <CreateItem />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/retailer/products/:productId/edit",
    element: <EditItem />,
    loader: editLoader,
    errorElement: <ErrorPage />,
  },
  {
    path: "/item/orders",
    element: <Orders />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <ToastContainer
      position="top-right"
      autoClose={1500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      bodyClassName="toastBody"
      style={{ marginTop: "5rem" }}
    />
    <RouterProvider router={router} />
    {/* <App /> */}
  </>
);
