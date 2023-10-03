import React, { useState, useEffect, useCallback } from "react";
import styles from "./vouchers.module.css";

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
import { Voucher } from "../../models/voucher";
// import DeletePopup from "../DeletePopup/DeletePopup";
const Vouchers: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const privateHttp = usePrivateHttp();
    // isLoading state:
    const isLoading = useAppSelector((state) => state.loading);

    // search params:
    const [search, setSearch] = useSearchParams();

    // flash sale:
    const [vouchers, setVouchers] = useState<Voucher[]>([]);

    // set page pagination:
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalVouchers, setTotalVouchers] = useState(0);

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
        const getAllVouchers = async () => {
            dispatch(loadingActions.setLoading(true));
            try {
                const res = await privateHttp.get(
                    process.env.REACT_APP_SERVER_DOMAIN +
                        "/api/voucher/get-vouchers",
                    {
                        params: search || null,
                    }
                );
                console.log(res.data);
                setVouchers(res.data.vouchers);
                setTotalVouchers(res.data.totalVouchers);
                dispatch(loadingActions.setLoading(false));
            } catch (error) {
                console.log(error);
            }
        };
        getAllVouchers();
    }, [search]);

    // delete flash sale handler:
    const deleteHandler = useCallback(
        async (voucher: Voucher) => {
            dispatch(loadingActions.setLoading(true));
            try {
                const res = await privateHttp.delete(
                    "/api/voucher/delete-voucher",
                    {
                        params: {
                            voucherId: voucher._id,
                        },
                    }
                );
                setVouchers((pre) => {
                    return pre.filter(
                        (_voucher) => _voucher._id !== voucher._id
                    );
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
    type DataIndex = keyof Voucher;
    // type Checkouts = [{ product: Checkout; quantity: number }];
    const getColumnSearchProps = (
        dataIndex: DataIndex
    ): ColumnType<Voucher> => ({
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

    const columns: ColumnsType<Voucher> = [
        {
            title: "Code",
            dataIndex: "code",
            key: "code",
            width: "20%",
            ...getColumnSearchProps("code"),
        },
        {
            title: "Discount",
            dataIndex: "discountPercent",
            key: "discountPercent",
            width: "10%",
            render: (discountPercent) => {
                return <span>{discountPercent}%</span>;
            },
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
            width: "10%",
            render: (quantity) => {
                return <span>{quantity}</span>;
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
                                search.delete("sortQuantity");
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
                                search.set("sortQuantity", "true");
                                setSearch(search, {
                                    replace: true,
                                });
                            }}
                        >
                            Most
                        </div>

                        <div
                            className={styles["dropdown-item"]}
                            onClick={() => {
                                search.set("sortQuantity", "false");
                                setSearch(search, {
                                    replace: true,
                                });
                            }}
                        >
                            Least
                        </div>
                    </div>
                );
            },
            filterIcon: () => {
                return <CaretDownOutlined />;
            },
        },

        {
            title: "End",
            dataIndex: "end",
            key: "end",
            width: "20%",
            render: (end) => {
                return <span>{end}</span>;
            },
        },

        {
            title: "Actions",
            width: "30%",
            render: (_, record) => {
                return (
                    <div style={{ display: "flex", gap: "4px" }}>
                        <Button icon={<InfoCircleOutlined />} />

                        <Button type="primary" icon={<EditOutlined />} />

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
                <h2>Vouchers List</h2>
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
                    dataSource={vouchers}
                    pagination={false}
                    loading={isLoading}
                />

                <div className={styles["pagination"]}>
                    <Pagination
                        current={currentPage}
                        onChange={onChangePagination}
                        total={totalVouchers}
                        pageSize={5}
                    />
                </div>
            </div>
        </div>
    );
};

export default Vouchers;
