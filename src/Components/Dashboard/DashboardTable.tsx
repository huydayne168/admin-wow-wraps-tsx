import React from "react";
import styles from "./dashboardTable.module.css";
import type { ColumnsType } from "antd/es/table";
import { Table, Tag } from "antd";

import { Checkout } from "../../models/checkout";
import { Product } from "../../models/product";
const DashboardTable: React.FC<{ checkouts: Checkout[] }> = ({ checkouts }) => {
    type Products = [{ product: Product; quantity: number }];
    // columns data
    const columns: ColumnsType<Checkout> = [
        {
            title: "Time",
            dataIndex: "date",
            key: "date",
            width: "28%",
        },
        {
            title: "User",
            dataIndex: "user",
            key: "user",
            width: "15%",
            render: (user) => {
                return <div>{user.userName}</div>;
            },
        },
        {
            title: "Products",
            dataIndex: "products",
            key: "products",
            width: "25%",

            render: (products: Products) => {
                return (
                    <span
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "4px",
                        }}
                    >
                        {products.map((product) => {
                            return (
                                <div
                                    key={product.product._id}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "4px",
                                    }}
                                >
                                    <img
                                        src={product.product.image}
                                        alt={product.product._id}
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                            objectFit: "cover",
                                        }}
                                    />
                                    <div>
                                        {product.product.name} x{" "}
                                        {product.quantity}
                                    </div>
                                </div>
                            );
                        })}
                    </span>
                );
            },
        },

        {
            title: "Phone Number",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
            width: "15%",
        },

        {
            title: "Total",
            dataIndex: "total",
            key: "total",
            width: "10%",
            render: (total) => {
                return <span>${total}</span>;
            },
        },

        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            width: "20%",
            render: (status) => {
                return (
                    <Tag
                        color={`${
                            (status === "WAITING FOR PAYING" && "processing") ||
                            (status === "PAID" && "success") ||
                            (status === "CANCELED" && "error")
                        }`}
                    >
                        {status}
                    </Tag>
                );
            },
        },
    ];

    return (
        <div className={`${styles.dashboardTableWrapper}`}>
            <h2>Latest Checkouts</h2>
            <div className={`${styles.dashboardTable}`}>
                <Table
                    columns={columns}
                    dataSource={checkouts}
                    pagination={false}
                />
            </div>
        </div>
    );
};

export default DashboardTable;
