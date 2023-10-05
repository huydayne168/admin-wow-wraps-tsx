import React, { useState, useEffect, useCallback } from "react";
import styles from "./transaction.module.css";
import usePrivateHttp from "../../hooks/usePrivateHttp";
import { useSearchParams } from "react-router-dom";
import type { PaginationProps } from "antd";
import Pagination from "antd/es/pagination";
import type { ColumnType, ColumnsType } from "antd/es/table";
import { Input, Table, Button, Dropdown, Tag, Popconfirm } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import {
    SearchOutlined,
    CaretDownOutlined,
    DeleteOutlined,
    InfoCircleOutlined,
} from "@ant-design/icons";
import { checkoutsAction, loadingActions } from "../../store/store";
import { Checkout } from "../../models/checkout";
import { Product } from "../../models/product";
import type { MenuProps } from "antd/es/menu";
import TransactionDetail from "./TransactionDetail";
function Transactions() {
    const checkouts = useAppSelector((state) => state.checkouts);
    const dispatch = useAppDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCheckouts, setTotalCheckouts] = useState(0);
    const [selectCheckout, setSelectCheckout] = useState<Checkout | null>(null);
    const [openDetailPopup, setOpenDetailPopup] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
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
                setTotalCheckouts(res.data.totalCheckouts);
            } catch (error) {
                console.log(error);
            }
        };

        getCheckouts();
    }, [search, isDeleting]);

    // update checkout status handler:
    const updateHandler = useCallback(
        async (checkoutId: any, status: string) => {
            dispatch(loadingActions.setLoading(true));
            try {
                const res = await privateHttp.post(
                    "/api/checkout/update-checkout",
                    {
                        checkoutId,
                        status,
                    }
                );
                console.log(res);
                dispatch(loadingActions.setLoading(false));
            } catch (error) {
                console.log(error);
            }
        },
        []
    );

    // delete checkout handler:
    const deleteHandler = useCallback(async (checkoutId: string) => {
        console.log(checkoutId);

        dispatch(loadingActions.setLoading(true));
        try {
            const res = await privateHttp.delete(
                "/api/checkout/delete-checkout",
                {
                    params: { checkoutId },
                }
            );
            console.log(res);
            dispatch(checkoutsAction.deleteCheckout(checkoutId));
            dispatch(loadingActions.setLoading(false));
            setIsDeleting((pre) => !pre);
        } catch (error) {
            console.log(error);
        }
    }, []);

    // update drop down items:
    const items: MenuProps["items"] = [
        {
            key: "canceled-item",
            label: (
                <Button
                    style={{ width: "100%" }}
                    danger
                    onClick={() => {
                        updateHandler(selectCheckout?._id, "CANCELED");
                        dispatch(
                            checkoutsAction.updateStatus({
                                checkout: selectCheckout,
                                status: "CANCELED",
                            })
                        );
                    }}
                >
                    Canceled
                </Button>
            ),
        },
        {
            key: "paid-item",
            label: (
                <Button
                    style={{
                        borderColor: "#4baa6a",
                        color: "#4baa6a",
                        width: "100%",
                    }}
                    onClick={() => {
                        updateHandler(selectCheckout?._id, "PAID");
                        dispatch(
                            checkoutsAction.updateStatus({
                                checkout: selectCheckout,
                                status: "PAID",
                            })
                        );
                    }}
                >
                    Paid
                </Button>
            ),
        },

        {
            key: "waiting-item",
            label: (
                <Button
                    style={{
                        width: "100%",
                    }}
                    onClick={() => {
                        updateHandler(
                            selectCheckout?._id,
                            "WAITING FOR PAYING"
                        );
                        dispatch(
                            checkoutsAction.updateStatus({
                                checkout: selectCheckout,
                                status: "WAITING FOR PAYING",
                            })
                        );
                    }}
                >
                    Waiting
                </Button>
            ),
        },
    ];

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

    // columns data
    const columns: ColumnsType<Checkout> = [
        {
            title: "Time",
            dataIndex: "date",
            key: "date",
            width: "28%",
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
                        <div
                            className={styles["dropdown-item"]}
                            onClick={() => {
                                search.delete("sortDate");
                                setSearch(search, { replace: true });
                            }}
                        >
                            Default
                        </div>

                        <div
                            className={styles["dropdown-item"]}
                            onClick={() => {
                                search.set("sortDate", "true");
                                search.delete("sortTotal");
                                setSearch(search, { replace: true });
                            }}
                        >
                            Latest
                        </div>

                        <div
                            className={styles["dropdown-item"]}
                            onClick={() => {
                                search.set("sortDate", "false");
                                search.delete("sortTotal");
                                setSearch(search, { replace: true });
                            }}
                        >
                            Earliest
                        </div>
                    </div>
                );
            },
            filterIcon: () => {
                return <CaretDownOutlined />;
            },
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

            ...getColumnSearchProps("phoneNumber"),
        },

        {
            title: "Total",
            dataIndex: "total",
            key: "total",
            width: "10%",
            render: (total) => {
                return <span>${total}</span>;
            },
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
                        <div
                            className={styles["dropdown-item"]}
                            onClick={() => {
                                search.delete("sortTotal");
                                setSearch(search, { replace: true });
                            }}
                        >
                            Default
                        </div>

                        <div
                            className={styles["dropdown-item"]}
                            onClick={() => {
                                search.set("sortTotal", "true");
                                search.delete("sortDate");
                                setSearch(search, { replace: true });
                            }}
                        >
                            Highest
                        </div>

                        <div
                            className={styles["dropdown-item"]}
                            onClick={() => {
                                search.set("sortTotal", "false");
                                search.delete("sortDate");
                                setSearch(search, { replace: true });
                            }}
                        >
                            Lowest
                        </div>
                    </div>
                );
            },
            filterIcon: () => {
                return <CaretDownOutlined />;
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
                            }}
                            onClick={() => {
                                search.delete("sortStatus");
                                setSearch(search, {
                                    replace: true,
                                });
                            }}
                        >
                            All
                        </Button>
                        <Button
                            style={{
                                width: "100%",
                                borderColor: "#4baa6a",
                                color: "#4baa6a ",
                            }}
                            type="primary"
                            ghost
                            onClick={() => {
                                search.set("sortStatus", "PAID");
                                setSearch(search, {
                                    replace: true,
                                });
                            }}
                        >
                            PAID
                        </Button>

                        <Button
                            style={{
                                width: "100%",
                            }}
                            type="primary"
                            ghost
                            onClick={() => {
                                search.set("sortStatus", "waiting for paying");
                                setSearch(search, {
                                    replace: true,
                                });
                            }}
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
                            onClick={() => {
                                search.set("sortStatus", "canceled");
                                setSearch(search, {
                                    replace: true,
                                });
                            }}
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
            dataIndex: "actions",
            key: "actions",
            render: (_, record) => {
                return (
                    <div style={{ display: "flex", gap: "4px" }}>
                        <Dropdown
                            menu={{ items }}
                            onOpenChange={() => setSelectCheckout(record)}
                            trigger={["click"]}
                        >
                            <Button type="primary">Update</Button>
                        </Dropdown>
                        <Button
                            icon={<InfoCircleOutlined />}
                            onClick={() => {
                                setSelectCheckout(record);
                                setOpenDetailPopup(true);
                            }}
                        />
                        <Popconfirm
                            title="Delete"
                            description="Are you sure to delete this product?"
                            onConfirm={() => {
                                deleteHandler(record._id);
                            }}
                            okButtonProps={{ loading: isLoading }}
                        >
                            <Button
                                type="primary"
                                danger
                                icon={<DeleteOutlined />}
                            />
                        </Popconfirm>
                    </div>
                );
            },
        },
    ];

    const closePopup = useCallback(() => {
        setOpenDetailPopup(false);
    }, []);
    return (
        <div className="tableWrapper">
            <div className={styles.heading}>
                <h2>Checkouts List</h2>
            </div>
            <div className="tableContent">
                <Table
                    columns={columns}
                    dataSource={checkouts}
                    pagination={false}
                    loading={isLoading}
                />
                <TransactionDetail
                    open={openDetailPopup}
                    checkout={[selectCheckout]}
                    closePopup={closePopup}
                />

                <div className={styles["pagination"]}>
                    <Pagination
                        current={currentPage}
                        onChange={onChangePagination}
                        total={totalCheckouts}
                        pageSize={5}
                        style={{ margin: "auto" }}
                    />
                </div>
            </div>
        </div>
    );
}

export default Transactions;
