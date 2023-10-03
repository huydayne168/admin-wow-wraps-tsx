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
import ErrorPage from "./Components/error/ErrorPage";
import UserInfo from "./Components/users/UserInfo";
import AddFlashSale from "./Components/AddFlashSale/AddFlashSale";
import FlashSales from "./Components/FlashSales/FlashSales";
import AddVoucher from "./Components/AddVoucher/AddVoucher";
import Vouchers from "./Components/Vouchers/Vouchers";
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
            path: "/admin/",
            element: <Root />,
            children: [
                {
                    path: "*",
                    element: <ErrorPage />,
                },
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
                    path: "user-info/:userId",
                    element: <UserInfo />,
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
                    path: "tagsCategories/:tagsCategories",
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
                {
                    path: "flash-sales",
                    element: <FlashSales />,
                },

                {
                    path: "add-flashSale",
                    element: <AddFlashSale />,
                },

                {
                    path: "vouchers",
                    element: <Vouchers />,
                },

                {
                    path: "add-voucher",
                    element: <AddVoucher />,
                },
            ],
        },
    ]);
    return <RouterProvider router={router} />;
}

export default App;
