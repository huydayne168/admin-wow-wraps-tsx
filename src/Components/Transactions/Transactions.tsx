import React, { useState, useEffect, useCallback } from "react";
import styles from "./transaction.module.css";
import usePrivateHttp from "../../hooks/usePrivateHttp";
import { useSearchParams } from "react-router-dom";
import type { PaginationProps } from "antd";
import Pagination from "antd/es/pagination";
import type { ColumnType, ColumnsType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import { Input, Table, Button, Dropdown, Tag } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import { SearchOutlined, CaretDownOutlined } from "@ant-design/icons";
import { checkoutsAction, loadingActions } from "../../store/store";
import { Checkout } from "../../models/checkout";
import { Product } from "../../models/product";
import type { MenuProps } from "antd/es/menu";
function Transactions() {
    const checkouts = useAppSelector((state) => state.checkouts);
    const dispatch = useAppDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const isLoading = useAppSelector((state) => state.loading);
    const [search, setSearch] = useSearchParams();
    const privateHttp = usePrivateHttp();
    // by default set search params category=All and page = 1
    useEffect(() => {
        search.set("page", currentPage.toString());
        setSearch(search, {
            replace: true,
        });
    }, [currentPage]);

    // update drop down items:
    const items: MenuProps["items"] = [
        {
            key: "cancel",
            label: <Button danger>Cancel</Button>,
        },
        {
            key: "Done",
            label: (
                <Button style={{ borderColor: "#4baa6a", color: "#4baa6a" }}>
                    Done
                </Button>
            ),
        },
    ];

    // change page with ant pagination
    const onChangePagination: PaginationProps["onChange"] = useCallback(
        (page: number) => {
            setCurrentPage(page);
        },
        []
    );
    console.log(currentPage);

    // get all checkouts here:
    useEffect(() => {
        const getCheckouts = async () => {
            dispatch(loadingActions.setLoading(true));
            try {
                const res = await privateHttp.get(
                    "/api/checkout/get-checkouts",
                    {
                        params: search || null,
                    }
                );
                console.log(res);
                dispatch(loadingActions.setLoading(false));

                dispatch(checkoutsAction.setCheckouts(res.data.checkouts));
            } catch (error) {
                console.log(error);
            }
        };

        getCheckouts();
    }, [search]);

    // Column type:
    type DataIndex = keyof Checkout;
    type Products = [{ product: Product; quantity: number }];
    const getColumnSearchProps = (
        dataIndex: DataIndex
    ): ColumnType<Checkout> => ({
        filterDropdown: ({}) => (
            <div onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    placeholder={`Search ${dataIndex}`}
                    onChange={(e) => {
                        if (e.target.value === "") {
                            search.delete(`${dataIndex}Query`);
                        } else {
                            search.set(`${dataIndex}Query`, e.target.value);
                        }
                        setSearch(search, {
                            replace: true,
                        });
                    }}
                    style={{ display: "block" }}
                />
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined
                style={{ color: filtered ? "#1677ff" : undefined }}
            />
        ),
    });

    const columns: ColumnsType<Checkout> = [
        {
            title: "Id",
            dataIndex: "_id",
            key: "_id",
            width: "15%",
            ...getColumnSearchProps("_id"),
        },
        {
            title: "User",
            dataIndex: "user",
            key: "user",
            width: "15%",
            ...getColumnSearchProps("user"),
            render: (user) => {
                return <div>{user.userName}</div>;
            },
        },
        {
            title: "Products",
            dataIndex: "products",
            key: "products",
            width: "25%",

            ...getColumnSearchProps("products"),
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
            ...getColumnSearchProps("phoneNumber"),
        },

        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            width: "20%",
            filterDropdown: ({}) => {
                return (
                    <div
                        style={{
                            padding: "4px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "4px",
                        }}
                        onKeyDown={(e) => e.stopPropagation()}
                    >
                        <Button
                            style={{
                                width: "100%",
                                borderColor: "#4baa6a",
                                color: "#4baa6a ",
                            }}
                            type="primary"
                            ghost
                        >
                            Done
                        </Button>

                        <Button
                            style={{
                                width: "100%",
                            }}
                            type="primary"
                            ghost
                        >
                            Waiting...
                        </Button>

                        <Button
                            style={{
                                width: "100%",
                            }}
                            type="primary"
                            danger
                            ghost
                        >
                            Cancel
                        </Button>
                    </div>
                );
            },
            filterIcon: () => {
                return <CaretDownOutlined />;
            },
        },

        {
            title: "Actions",
            width: "20%",
            render: (_, record) => {
                return (
                    <div style={{ display: "flex", gap: "4px" }}>
                        <Button>Detail</Button>
                        <Dropdown menu={{ items }}>
                            <Button type="primary" ghost>
                                Update
                            </Button>
                        </Dropdown>
                        <Button type="primary" danger>
                            Delete
                        </Button>
                    </div>
                );
            },
        },
    ];
    return (
        <div className="tableWrapper">
            <div className={styles.heading}>
                <h2>Checkouts List</h2>
                <button>Add New</button>
            </div>
            <div className="tableContent">
                <Table
                    columns={columns}
                    dataSource={checkouts}
                    pagination={false}
                    loading={isLoading}
                />

                <div className={styles["pagination"]}>
                    <Pagination
                        current={currentPage}
                        onChange={onChangePagination}
                        total={totalProducts}
                        pageSize={5}
                        style={{ margin: "auto" }}
                    />
                </div>
            </div>
        </div>
    );
}

export default Transactions;
