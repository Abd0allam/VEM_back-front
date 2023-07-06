import { RouterProvider, createBrowserRouter } from "react-router-dom";

import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Layout from "./componants/Layout";
import ErrorPage from "./componants/ErrorPage";
import About from "./componants/About";
import Contact from "./componants/Contact";
import Home from "./componants/Home";
import SignIn from "./componants/SignIn";
import SignUp from "./componants/SignUp";
import CheckMail from "./componants/CheckMail";
import ForgetPassword from "./componants/ForgetPassword";
import Activation from "./componants/ActivationUser";
import ConfirmResetPassword from "./componants/ConfirmResetPassword";
import ShoppingCartProvider from "./context/shopingCartContext";
import Profile from "./componants/Profile";
import ProfileEdit from "./componants/ProfileEdit";
import AddShop from "./componants/AddShop";
import ShopDisplayOwner from "./componants/ShopDisplayOwner";
import ShopDisplayUser from "./componants/ShopDisplayUser";
import AddProduct from "./componants/AddProduct";
import DisplayProduct from "./componants/DisplayProduct";
import UpdateProduct from "./componants/UpdateProduct";
import Shops from "./componants/Shops";
import ShopDisplayOwnerTemp2 from "./componants/ShopDisplayOwnerTemp2";
import ShopDisplayUserTemp2 from "./componants/ShopDisplayUserTemp2";

// if(!localStorage.getItem('access')){window.location.replace("/Signin");}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/shops", element: <Shops /> },
      { path: "/About", element: <About /> },
      { path: "/Contact", element: <Contact /> },
      { path: "/profile", element: <Profile/> },
      { path: "/profile/edit", element: <ProfileEdit/> },
      { path: "/shop/add", element: <AddShop/> },
      { path: "/shop/myshop", element: <ShopDisplayOwner/> },
      { path: "/shop/myshoptemp2", element: <ShopDisplayOwnerTemp2/> },
      { path: "/shop/displayshop/:id/", element: <ShopDisplayUser/> },
      { path: "/shop/displayshoptemp2/:id/", element: <ShopDisplayUserTemp2/> },
      { path: "/shop/addproduct", element: <AddProduct/> },
      { path: "/shop/updateproduct/:id/", element: <UpdateProduct/> },
      { path: "/shop/products/displayproduct/:id/", element: <DisplayProduct/> },



    ],
  },
  { path: "/Signin", element: <SignIn /> },
  { path: "/Signup", element: <SignUp /> },
  { path: "/checkmail", element: <CheckMail /> },
  { path: "/forgetpassword", element: <ForgetPassword /> },
  { path: "/activate/:uid/:token", element: <Activation /> },
  { path: "/password/reset/confirm/:uid/:token", element: <ConfirmResetPassword /> },

]);

const App = () => {
  return (
    <ShoppingCartProvider>
      <RouterProvider router={router} />
    </ShoppingCartProvider>
  );
};

export default App;
