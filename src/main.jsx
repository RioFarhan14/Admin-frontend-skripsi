import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import LoginPage from "./Components/Pages/LoginPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./Components/Pages/404";
import DashbordPage from "./Components/Pages/Dashboard";
import FieldPage from "./Components/Pages/FieldAdmin";
import MembershipPage from "./Components/Pages/Membership";
import ReportPage from "./Components/Pages/Report";
import AccountPage from "./Components/Pages/Account";
import CreateField from "./Components/Pages/FieldAdmin/CreateField";
import CreateBooking from "./Components/Pages/FieldAdmin/CreateBooking";
import CreateProductMembership from "./Components/Pages/Membership/CreateProduct";
import CreateMember from "./Components/Pages/Membership/CreateMembership";
import CreateAccount from "./Components/Pages/Account/CreateAccount";
import UpdateField from "./Components/Pages/FieldAdmin/UpdateField";
import UpdateAccount from "./Components/Pages/Account/UpdateAccount";
import NotificationPage from "./Components/Pages/notification";
import CreateNotification from "./Components/Pages/notification/createNotification";
import ThanksPage from "./Components/Pages/thanks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: <DashbordPage />,
  },
  {
    path: "/management-field",
    element: <FieldPage />,
  },
  {
    path: "/management-field/create-field",
    element: <CreateField />,
  },
  {
    path: "/management-field/update-field/:id",
    element: <UpdateField />,
  },
  {
    path: "/management-field/create-booking",
    element: <CreateBooking />,
  },
  {
    path: "/membership",
    element: <MembershipPage />,
  },
  {
    path: "/membership/create-product",
    element: <CreateProductMembership />,
  },
  {
    path: "/membership/create-membership",
    element: <CreateMember />,
  },
  {
    path: "/report",
    element: <ReportPage />,
  },
  {
    path: "/management-account",
    element: <AccountPage />,
  },
  {
    path: "/management-account/create-account",
    element: <CreateAccount />,
  },
  {
    path: "/management-account/update-account/:id",
    element: <UpdateAccount />,
  },
  {
    path: "/notification",
    element: <NotificationPage />,
  },
  {
    path: "/notification/create-notification",
    element: <CreateNotification />,
  },

  {
    path: "/thanks",
    element: <ThanksPage />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
