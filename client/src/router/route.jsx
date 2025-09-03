import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Category from "../components/Category";
import Contact from "../components/Contact";
import Login from "../components/Login";
import Register from "../components/Register";
import AdminRoute from "./AdminRoute";
import AdminLogin from "../components/admin/AdminLogin";
import AdminDashboard from "../pages/dashboard/AdminDashboard";
import CustomerById from "../pages/dashboard/CustomerById";
import AdminPage from "../pages/dashboard/AdminPage";
import ErrorPage from "../components/ErrorPage";
import AdminAll from "../pages/dashboard/AdminAll";
import AdminTypes from "../pages/dashboard/AdminTypes";
import Products from "../pages/dashboard/Products";
import ProductID from "../pages/dashboard/ProductID";
import Lessors from "../pages/dashboard/Lessors";
import LessorID from "../pages/dashboard/LessorID";
import Rentals from "../pages/dashboard/Rentals";
import RentalID from "../pages/dashboard/RentalID";
import AddTypes from "../components/admin/AddTypes";
import LessorsLogin from "../pages/lessor/LessorsLogin";
import Dashboard from "../pages/lessor/Dashboard";
import LessorsRoute from "./LessorsRoute";
import DashboardAll from "../components/lessors/DashboardAll";
import ProductsL from "../components/lessors/Products";
import ProductLID from "../components/lessors/ProductID";
import RentalsL from "../components/lessors/Rentals";
import RentalIDL from "../components/lessors/RentalID";
import ReturnsL from "../components/lessors/Returns";
import ReturnIDL from "../components/lessors/ReturnID";
import ReceivesL from "../components/lessors/Receives";
import ReceivesIDL from "../components/lessors/ReceivesID";
import AddProduct from "../components/lessors/AddProduct";
import EditProduct from "../components/lessors/EditProduct";
import Payments from "../components/lessors/Payments";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />, // เพิ่ม errorElement
    children: [
      { path: "", element: <Home /> },
      { path: "/category", element: <Category /> },
      { path: "/contact", element: <Contact /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLogin />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/dashboard",
    element: (
      <AdminRoute>
        <AdminPage />
      </AdminRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <AdminAll /> },
      { path: "customers", element: <AdminDashboard /> },
      { path: "customer/:id", element: <CustomerById /> },
      { path: "products", element: <Products /> },
      { path: "products/:id", element: <ProductID /> },
      { path: "product-types", element: <AdminTypes /> },
      { path: "addproduct-types", element: <AddTypes /> },
      { path: "lessors", element: <Lessors /> },
      { path: "lessor/:id", element: <LessorID /> },
      { path: "rentals", element: <Rentals /> },
      { path: "rental/:id", element: <RentalID /> },
      { path: "returns", element: <div className="">returns</div> },
      { path: "return/:id", element: <div className="">returns/id</div> },
      { path: "receives", element: <div className="">receives</div> },
      { path: "receive/:id", element: <div className="">receives/id</div> },
      { path: "notifications", element: <div className="">notifications</div> },
      {
        path: "notification/:id",
        element: <div className="">notifications/id</div>,
      },
    ],
  },
  {
    path: "/lessors",
    element: <LessorsLogin />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboardl",
    element: (
      <LessorsRoute>
        <Dashboard />
      </LessorsRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: (
          <LessorsRoute>
            <DashboardAll/>
          </LessorsRoute>
        ),
      },
      {
        path: "products",
        element: (
          <LessorsRoute>
            <ProductsL/>
          </LessorsRoute>
        ),
      },
      {
        path: "product/:id",
        element: (
          <LessorsRoute>
            <ProductLID/>
          </LessorsRoute>
        ),
      },
      {
        path: "products/add-product",
        element: (
          <LessorsRoute>
           <AddProduct/>
          </LessorsRoute>
        ),
      },
      {
        path: "product/edit/:id",
        element: (
          <LessorsRoute>
           <EditProduct/>
          </LessorsRoute>
        ),
      },
      {
        path: "datetime",
        element: (
          <LessorsRoute>
            <div className="">ปฎิทินการจอง</div>
          </LessorsRoute>
        ),
      },
      {
        path: "rentals",
        element: (
          <LessorsRoute>
          <RentalsL/>
          </LessorsRoute>
        ),
      },
      {
        path: "rental/:id",
        element: (
          <LessorsRoute>
            <RentalIDL />
          </LessorsRoute>
        ),
      },
      {
        path: "returns",
        element: (
          <LessorsRoute>
            <ReturnsL/>
          </LessorsRoute>
        ),
      },
      {
        path: "return/:id",
        element: (
          <LessorsRoute>
            <ReturnIDL/>
          </LessorsRoute>
        ),
      },
      {
        path: "receives",
        element: (
          <LessorsRoute>
            <ReceivesL/>
          </LessorsRoute>
        ),
      },
      {
        path: "receives/:id",
        element: (
          <LessorsRoute>
            <ReceivesIDL/>
          </LessorsRoute>
        ),
      },
      {
        path: "payments",
        element: (
          <LessorsRoute>
           <Payments></Payments>
          </LessorsRoute>
        ),
      },
      {
        path: "contact-admin",
        element: (
          <LessorsRoute>
           <div className="">Contact Admin</div>
          </LessorsRoute>
        ),
      },
    ],
  },
]);

export default router;
