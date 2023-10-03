import React, { useState, useEffect, useCallback } from "react";
import styles from "./flashSale.module.css";

import http from "../../utils/http";
import type { Product } from "../../models/product";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import { navigationActions } from "../../store/store";
import { loadingActions } from "../../store/store";
import usePrivateHttp from "../../hooks/usePrivateHttp";
// ant design:
import type { ColumnType, ColumnsType } from "antd/es/table";
import {
    SearchOutlined,
    CaretDownOutlined,
    EditOutlined,
    InfoCircleOutlined,
    DeleteOutlined,
} from "@ant-design/icons";
import { Input, Table, Button, Dropdown, Tag, Alert } from "antd";
import type { PaginationProps } from "antd";
import Pagination from "antd/es/pagination";
import { Popconfirm } from "antd";
import { FlashSale } from "../../models/flashsale";
// import DeletePopup from "../DeletePopup/DeletePopup";
const FlashSales: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const privateHttp = usePrivateHttp();
    // isLoading state:
    const isLoading = useAppSelector((state) => state.loading);

    // search params:
    const [search, setSearch] = useSearchParams();

    // flash sale:
    const [flashSales, setFlashSales] = useState<FlashSale[]>([]);

    // set page pagination:
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalFlashSale, setTotalFlashSale] = useState(0);

    // change page with ant pagination
    const onChangePagination: PaginationProps["onChange"] = useCallback(
        (page: number) => {
            setCurrentPage(page);
        },
        []
    );
    console.log(currentPage);

    // by default set search params page = 1
    useEffect(() => {
        search.set("page", currentPage.toString());
        setSearch(search, {
            replace: true,
        });
    }, [currentPage]);

    // get products from database:
    useEffect(() => {
        const getAllProducts = async () => {
            dispatch(loadingActions.setLoading(true));
            try {
                const res = await privateHttp.get(
                    process.env.REACT_APP_SERVER_DOMAIN + "/api/fs/get-fss",
                    {
                        params: search || null,
                    }
                );
                console.log(res.data);
                setFlashSales(res.data.flashSales);
                setTotalFlashSale(res.data.totalFlashSales);
                dispatch(loadingActions.setLoading(false));
            } catch (error) {
                console.log(error);
            }
        };
        getAllProducts();
    }, [search]);

    // delete flash sale handler:
    const deleteHandler = useCallback(
        async (flashSale: FlashSale) => {
            dispatch(loadingActions.setLoading(true));
            try {
                const res = await privateHttp.delete("/api/fs/delete-fs", {
                    params: {
                        flashSaleId: flashSale._id,
                    },
                });
                setFlashSales((pre) => {
                    return pre.filter((fs) => fs._id !== flashSale._id);
                });
                dispatch(loadingActions.setLoading(false));
            } catch (error) {
                console.log(error);
                dispatch(loadingActions.setLoading(false));
            }
        },
        [dispatch, privateHttp]
    );

    // ant column:
    type DataIndex = keyof FlashSale;
    // type Checkouts = [{ product: Checkout; quantity: number }];
    const getColumnSearchProps = (
        dataIndex: DataIndex
    ): ColumnType<FlashSale> => ({
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

    const columns: ColumnsType<FlashSale> = [
        {
            title: "Id",
            dataIndex: "_id",
            key: "_id",
            width: "15%",
            ...getColumnSearchProps("_id"),
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            width: "20%",
            ...getColumnSearchProps("name"),
        },
        {
            title: "Discount Percent",
            dataIndex: "discountPercent",
            key: "discountPercent",
            width: "5%",
            render: (discountPercent) => {
                return <span>{discountPercent}%</span>;
            },
        },

        {
            title: "Start",
            dataIndex: "start",
            key: "start",
            width: "10%",
            render: (start) => {
                return <span>{start}</span>;
            },
        },

        {
            title: "End",
            dataIndex: "end",
            key: "end",
            width: "10%",
            render: (end) => {
                return <span>{end}</span>;
            },
        },

        {
            title: "Status",
            dataIndex: "isActive",
            key: "isActive",
            width: "10%",
            render: (isActive) => {
                return (
                    <span>
                        {isActive ? (
                            <Tag color="success">Active</Tag>
                        ) : (
                            <Tag>Not Available</Tag>
                        )}
                    </span>
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
                        <div
                            className={styles["dropdown-item"]}
                            onClick={() => {
                                search.delete("sortActive");
                                setSearch(search, {
                                    replace: true,
                                });
                            }}
                        >
                            Default
                        </div>
                        <div
                            className={styles["dropdown-item"]}
                            onClick={() => {
                                search.set("sortActive", "true");
                                setSearch(search, {
                                    replace: true,
                                });
                            }}
                        >
                            Active
                        </div>

                        <div
                            className={styles["dropdown-item"]}
                            onClick={() => {
                                search.set("sortActive", "false");
                                setSearch(search, {
                                    replace: true,
                                });
                            }}
                        >
                            Not Available
                        </div>
                    </div>
                );
            },
            filterIcon: () => {
                return <CaretDownOutlined />;
            },
        },

        {
            title: "Actions",
            width: "10%",
            render: (_, record) => {
                return (
                    <div style={{ display: "flex", gap: "4px" }}>
                        <Button
                            // onClick={(e) =>
                            //     navigate(
                            //         "/admin/product-detail" + `/${record._id}`,
                            //         {
                            //             state: {
                            //                 product: record,
                            //             },
                            //         }
                            //     )
                            // }
                            icon={<InfoCircleOutlined />}
                        />

                        <Button
                            // onClick={(e) =>
                            //     navigate(
                            //         "/admin/edit-product" + `/${record._id}`,
                            //         {
                            //             state: {
                            //                 product: record,
                            //             },
                            //         }
                            //     )
                            // }
                            type="primary"
                            icon={<EditOutlined />}
                        />

                        <Popconfirm
                            title="Delete"
                            description="Are you sure to delete this product?"
                            onConfirm={() => {
                                deleteHandler(record);
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

    // Return tsx:
    return (
        <div className="tableWrapper">
            <div className={styles.heading}>
                <h2>Flash Sales List</h2>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        navigate("/admin/add-flashSale");
                        dispatch(
                            navigationActions.setNavigationState("add-product")
                        );
                    }}
                >
                    Add New
                </button>
            </div>
            <div className="tableContent">
                <Table
                    columns={columns}
                    dataSource={flashSales}
                    pagination={false}
                    loading={isLoading}
                />

                <div className={styles["pagination"]}>
                    <Pagination
                        current={currentPage}
                        onChange={onChangePagination}
                        total={totalFlashSale}
                        pageSize={5}
                    />
                </div>
            </div>
        </div>
    );
};

export default FlashSales;
