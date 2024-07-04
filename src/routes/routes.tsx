import { createBrowserRouter } from "react-router-dom";
import App from "../../src/App.jsx";
import AddProducts from "../pages/addProducts/AddProducts";
import Products from "../pages/products/Products";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register.js";
import PrivateRoute from "./PrivateRoutes.js";
import Inventory from "../pages/inventory/Inventory.js";
import SingleInventoryDetails from "../pages/inventory/SingleInventoryDetails.js";
import UpdateProduct from "../pages/updateProduct/UpdateProduct.js";
import DuplicateProduct from "../pages/duplicateProduct/DuplicateProduct.js";
import SalesHistory from "../pages/salesHistory/SalesHistory.js";
import Checkout from "../pages/cart/Checkout.js";


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Products />
          </PrivateRoute>
        ),
      },
      {
        path: "/addproduct",
        element: (
          <PrivateRoute>
            <AddProducts />
          </PrivateRoute>
        ),
      },
      {
        path: "/inventory",
        element: (
          <PrivateRoute>
            <Inventory />
          </PrivateRoute>
        ),
      },
      {
        path: "/inventory/gadget/:id",
        element: (
          <PrivateRoute>
            <SingleInventoryDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/inventory/gadget/update/:id",
        element: (
          <PrivateRoute>
            <UpdateProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "/inventory/gadget/duplicate/:id",
        element: (
          <PrivateRoute>
            <DuplicateProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "/salesHistory",
        element: (
          <PrivateRoute>
            <SalesHistory />
          </PrivateRoute>
        ),
      },
      {
        path: "/checkout",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
