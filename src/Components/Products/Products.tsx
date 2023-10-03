import React, { useState, useEffect, useCallback } from "react";
import styles from "./products.module.css";

import http from "../../utils/http";
import type { Product } from "../../models/product";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import { navigationActions } from "../../store/store";
import { productsAction } from "../../store/store";
import { loadingActions } from "../../store/store";
import { BeatLoader } from "react-spinners";
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
import { AutoComplete, Popconfirm } from "antd";
// import DeletePopup from "../DeletePopup/DeletePopup";
const Products: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const privateHttp = usePrivateHttp();
    // isLoading state:
    const isLoading = useAppSelector((state) => state.loading);

    // get products from store:
    const products = useAppSelector((state) => state.products);
    // categories list:
    const [categoriesList, setCategoriesList] = useState<string[]>([]);

    // search params:
    const [search, setSearch] = useSearchParams();

    // set page pagination:
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalProducts, setTotalProducts] = useState(0);

    // set delete popup:

    // deleteFailState:
    const [deleteFailState, setDeleteFailState] = useState(false);

    // fetch all categories:
    useEffect(() => {
        const fetchCategories = async () => {
            const res = await privateHttp.get("/api/category/get-categories");
            console.log(res);
            setCategoriesList(res.data);
        };

        fetchCategories();
    }, []);

    // category drop down options:
    const categoriesDropdownOptions = [
        { value: "All" },
        ...categoriesList.map((category) => ({
            value: category,
        })),
    ];
    console.log(categoriesDropdownOptions);

    // change page with ant pagination
    const onChangePagination: PaginationProps["onChange"] = useCallback(
        (page: number) => {
            setCurrentPage(page);
        },
        []
    );
    console.log(currentPage);

    // by default set search params category=All and page = 1
    useEffect(() => {
        search.set("category", "All");
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
                const res = await http.get(
                    process.env.REACT_APP_SERVER_DOMAIN +
                        "/api/product/get-products",
                    {
                        params: search || null,
                    }
                );
                console.log(res.data);

                if (res.data.isLastPage) {
                    dispatch(loadingActions.setLoading(false));
                    dispatch(productsAction.setProducts(res.data.products));
                } else {
                    dispatch(loadingActions.setLoading(false));
                    dispatch(productsAction.setProducts(res.data.products));
                }
                setTotalProducts(res.data.totalProducts);
            } catch (error) {
                console.log(error);
            }
        };
        getAllProducts();
    }, [search]);

    // delete product:
    const deleteHandler = useCallback(
        async (product: Product) => {
            dispatch(loadingActions.setLoading(true));
            try {
                const res = await privateHttp.delete(
                    "/api/product/delete-product",
                    {
                        params: {
                            _id: product._id,
                        },
                    }
                );

                dispatch(productsAction.deleteProduct(product._id));
                dispatch(loadingActions.setLoading(false));
            } catch (error) {
                console.log(error);
                setDeleteFailState(true);
                dispatch(loadingActions.setLoading(false));
            }
        },
        [dispatch, privateHttp]
    );

    // ant column:
    type DataIndex = keyof Product;
    type Products = [{ product: Product; quantity: number }];
    const getColumnSearchProps = (
        dataIndex: DataIndex
    ): ColumnType<Product> => ({
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

    const columns: ColumnsType<Product> = [
        {
            title: "Rate",
            dataIndex: "rate",
            key: "rate",
            width: "5%",
            render: (rate) => {
                return <span>{rate} stars</span>;
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
                                search.delete("sortRate");
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
                                search.set("sortRate", "true");
                                setSearch(search, {
                                    replace: true,
                                });
                            }}
                        >
                            High Rate
                        </div>

                        <div
                            className={styles["dropdown-item"]}
                            onClick={() => {
                                search.set("sortRate", "false");
                                setSearch(search, {
                                    replace: true,
                                });
                            }}
                        >
                            Low Rate
                        </div>
                    </div>
                );
            },
            filterIcon: () => {
                return <CaretDownOutlined />;
            },
        },
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
            render: (name, record) => {
                return (
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                        }}
                    >
                        <img
                            src={record.image}
                            alt={record._id}
                            style={{
                                width: "50px",
                                height: "50px",
                                objectFit: "cover",
                            }}
                        />
                        <div>{name}</div>
                    </div>
                );
            },
        },
        {
            title: "Description",
            dataIndex: "shortDescription",
            key: "shortDescription",
            width: "20%",

            render: (shortDescription) => {
                return (
                    <div className={styles["product-description"]}>
                        {shortDescription}
                    </div>
                );
            },
        },

        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            width: "5%",
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
                                search.delete("sortHighPrice");
                                search.delete("sortLowPrice");
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
                                search.set("sortHighPrice", "true");
                                search.delete("sortRate");
                                setSearch(search, {
                                    replace: true,
                                });
                            }}
                        >
                            High Price
                        </div>

                        <div
                            className={styles["dropdown-item"]}
                            onClick={() => {
                                search.set("sortLowPrice", "true");
                                search.delete("sortRate");
                                setSearch(search, {
                                    replace: true,
                                });
                            }}
                        >
                            Low Price
                        </div>
                    </div>
                );
            },
            filterIcon: () => {
                return <CaretDownOutlined />;
            },
            render: (price) => {
                return <span>${price}</span>;
            },
        },

        {
            title: "Category",
            dataIndex: "category",
            key: "category",
            width: "10%",
            render: (category) => {
                return <span>{category.name}</span>;
            },
            filterDropdown: ({}) => {
                return (
                    <AutoComplete
                        style={{
                            // position: "absolute",
                            // top: "-80px",
                            width: "100%",
                        }}
                        placeholder={"search category here"}
                        options={categoriesDropdownOptions}
                        filterOption={(inputValue, option) =>
                            option!.value
                                .toUpperCase()
                                .indexOf(inputValue.toUpperCase()) !== -1
                        }
                        onSelect={(value, option) => {
                            console.log(option);
                            if (value === "") {
                                search.delete("category");
                            } else {
                                search.set("category", value);
                            }
                            setSearch(search, {
                                replace: true,
                            });
                        }}
                    />
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
                            onClick={(e) =>
                                navigate(
                                    "/admin/product-detail" + `/${record._id}`,
                                    {
                                        state: {
                                            product: record,
                                        },
                                    }
                                )
                            }
                            icon={<InfoCircleOutlined />}
                        />

                        <Button
                            onClick={(e) =>
                                navigate(
                                    "/admin/edit-product" + `/${record._id}`,
                                    {
                                        state: {
                                            product: record,
                                        },
                                    }
                                )
                            }
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
                <h2>Products List</h2>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        navigate("/admin/add-product");
                        dispatch(
                            navigationActions.setNavigationState("add-product")
                        );
                    }}
                >
                    Add New
                </button>
            </div>
            <div className="tableContent">
                {deleteFailState && (
                    <Alert
                        message="Can not delete"
                        description="This product can not be deleted because it is now in an user's cart!!!"
                        type="error"
                        closable
                        onClose={() => {
                            setDeleteFailState(false);
                        }}
                    />
                )}

                <Table
                    columns={columns}
                    dataSource={products}
                    pagination={false}
                    loading={isLoading}
                />

                <div className={styles["pagination"]}>
                    <Pagination
                        current={currentPage}
                        onChange={onChangePagination}
                        total={totalProducts}
                        pageSize={5}
                    />
                </div>
            </div>
        </div>
    );
};

export default Products;
