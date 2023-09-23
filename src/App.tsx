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
import ProductDetail from "./Components/ProductDetail/ProductDetail";
import EditProduct from "./Components/EditProduct/EditProduct";
import TagsAndCategories from "./Components/TagsAndCategories/TagsAndCategories";
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
                    path: ":tagsCategories",
                    element: <TagsAndCategories />,
                },
                {
                    path: "add-product",
                    element: <AddProduct />,
                },
                {
                    path: "product-detail/:productId",
                    element: <ProductDetail />,
                },

                {
                    path: "edit-product/:productId",
                    element: <EditProduct />,
                },
            ],
        },
    ]);
    return <RouterProvider router={router} />;
}

export default App;
