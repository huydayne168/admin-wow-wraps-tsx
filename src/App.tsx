import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Components/Login/Login";
import Root from "./Components/Root/Root";
import DashBoard from "./Components/Dashboard/DashBoard";
import Products from "./Components/Products/Products";
import Transactions from "./Components/Transactions/Transactions";
import AddProduct from "./Components/AddProduct/AddProduct";
import Users from "./Components/users/Users";
import SignUp from "./Components/SignUp/SignUp";
function App() {
    const router = createBrowserRouter([
        {
            path: "",
            element: <Login />,
        },
        {
            path: "sign-up",
            element: <SignUp />,
        },
        {
            path: "admin",
            element: <Root />,
            children: [
                {
                    path: "dash-board",
                    element: <DashBoard />,
                    index: true,
                },
                {
                    path: "users",
                    element: <Users />,
                },
                {
                    path: "products",
                    element: <Products />,
                },
                {
                    path: "transactions",
                    element: <Transactions />,
                },
                {
                    path: "add-product/:addType",
                    element: <AddProduct />,
                },
            ],
        },
    ]);
    return <RouterProvider router={router} />;
}

export default App;
