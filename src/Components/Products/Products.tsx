import React, { useState, useEffect, useCallback } from "react";
import styles from "./products.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleLeft,
    faAngleRight,
    faArrowsUpDown,
    faSearch,
    faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import http from "../../utils/http";
import type { Product } from "../../models/product";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import { navigationActions } from "../../store/store";
import { productsAction } from "../../store/store";
import { loadingActions } from "../../store/store";
import SearchInput from "./SearchInput";
import { BeatLoader } from "react-spinners";
import usePrivateHttp from "../../hooks/usePrivateHttp";
// import DeletePopup from "../DeletePopup/DeletePopup";
const Products: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const privateHttp = usePrivateHttp();
    // isLoading state:
    const isLoading = useAppSelector((state) => state.loading);
    // set search id input show/hide:
    const [idSearch, setIdSearch] = useState(false);
    // set search name input show/hide:
    const [nameSearch, setNameSearch] = useState(false);
    // set sort price dropdown show/hide:
    const [priceSortDropdown, setPriceSortDropdown] = useState(false);
    // get products from store:
    const products = useAppSelector((state) => state.products);
    // search params:
    const [search, setSearch] = useSearchParams();
    // set page pagination:
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isLastPage, setIsLastPage] = useState<boolean>(false);
    const [sortRate, setSortRate] = useState(false);
    const [sortLowPrice, setSortLowPrice] = useState(false);
    const [sortHighPrice, setSortHighPrice] = useState(false);

    useEffect(() => {
        if (sortHighPrice) {
            search.set("sortHighPrice", sortHighPrice.toString());
            search.delete("sortLowPrice");
        } else if (sortLowPrice) {
            search.set("sortLowPrice", sortLowPrice.toString());
            search.delete("sortHighPrice");
            search.delete("sortRate");
        } else {
            search.delete("sortLowPrice");
            search.delete("sortHighPrice");
        }

        setSearch(search, {
            replace: true,
        });
    }, [sortHighPrice, sortLowPrice]);

    useEffect(() => {
        search.set("sortRate", sortRate.toString());

        search.delete("sortLowPrice");
        search.delete("sortHighPrice");
        setSearch(search, {
            replace: true,
        });
    }, [sortRate]);

    // by default set search params category=All and page = 1
    useEffect(() => {
        search.set("category", "All");
        search.set("page", currentPage.toString());
        setSearch(search, {
            replace: true,
        });
    }, [currentPage]);

    // get all products from database:
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
                if (res.data.isLastPage) {
                    dispatch(loadingActions.setLoading(false));
                    dispatch(productsAction.setProducts(res.data.products));
                    setIsLastPage(true);
                } else {
                    dispatch(loadingActions.setLoading(false));
                    dispatch(productsAction.setProducts(res.data));
                }
            } catch (error) {
                console.log(error);
            }
        };
        getAllProducts();
    }, [search]);

    // delete product:
    const deleteHandler = useCallback(
        async (product: Product) => {
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
            } catch (error) {
                console.log(error);
            }
        },
        [dispatch, privateHttp]
    );

    return (
        <div className="tableWrapper">
            <div className={styles.heading}>
                <h2>
                    Products List
                    {isLoading && (
                        <div className={styles["loading"]}>
                            <BeatLoader />
                        </div>
                    )}
                </h2>
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
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col" style={{ width: "10%" }}>
                                <div className={styles["header-title"]}>
                                    {sortRate ? "High Rate" : "Low Rate"}
                                    <FontAwesomeIcon
                                        icon={faArrowsUpDown}
                                        onClick={() => {
                                            setSortRate((pre) => !pre);
                                        }}
                                        className={styles["sort-icon"]}
                                    />
                                </div>
                            </th>
                            <th scope="col" style={{ width: "20%" }}>
                                <div className={styles["header-title"]}>
                                    ID
                                    <FontAwesomeIcon
                                        icon={faSearch}
                                        className={styles["sort-icon"]}
                                        onClick={() => {
                                            setIdSearch((pre) => !pre);
                                        }}
                                    />
                                    {idSearch ? (
                                        <SearchInput
                                            searchType={"_id"}
                                            obj={products}
                                        />
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </th>
                            <th scope="col" style={{ width: "15%" }}>
                                <div className={styles["header-title"]}>
                                    Name
                                    <FontAwesomeIcon
                                        icon={faSearch}
                                        className={styles["sort-icon"]}
                                        onClick={() => {
                                            setNameSearch((pre) => !pre);
                                        }}
                                    />
                                    {nameSearch ? (
                                        <SearchInput
                                            searchType={"name"}
                                            obj={products}
                                        />
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </th>
                            <th scope="col">
                                <div className={styles["header-title"]}>
                                    Description
                                </div>
                            </th>
                            <th scope="col" style={{ width: "10%" }}>
                                <div className={styles["header-title"]}>
                                    {(sortHighPrice && "Hight Price") ||
                                        (sortLowPrice && "Low Price") ||
                                        "Price"}
                                    <FontAwesomeIcon
                                        icon={faSortDown}
                                        className={styles["sort-icon"]}
                                        onClick={() => {
                                            setPriceSortDropdown((pre) => !pre);
                                        }}
                                    />
                                    {priceSortDropdown ? (
                                        <ul
                                            className={`${styles["dropdown"]} dropdown-menu`}
                                        >
                                            <li>
                                                <a
                                                    className="dropdown-item"
                                                    href="#"
                                                    onClick={() => {
                                                        setSortHighPrice(false);
                                                        setSortLowPrice(false);
                                                    }}
                                                >
                                                    Default
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    className="dropdown-item"
                                                    href="#"
                                                    onClick={() => {
                                                        setSortHighPrice(true);
                                                        setSortLowPrice(false);
                                                        search.delete(
                                                            "sortRate"
                                                        );
                                                        setSearch(search, {
                                                            replace: true,
                                                        });
                                                    }}
                                                >
                                                    Hight Price
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    className="dropdown-item"
                                                    href="#"
                                                    onClick={() => {
                                                        setSortLowPrice(true);
                                                        setSortHighPrice(false);
                                                        search.delete(
                                                            "sortRate"
                                                        );
                                                        setSearch(search, {
                                                            replace: true,
                                                        });
                                                    }}
                                                >
                                                    Low Price
                                                </a>
                                            </li>
                                        </ul>
                                    ) : null}
                                </div>
                            </th>
                            <th scope="col">
                                <div className={styles["header-title"]}>
                                    Category
                                </div>
                            </th>
                            <th scope="col" style={{ width: "18%" }}>
                                <div
                                    className={`${styles["header-title"]}`}
                                    style={{ justifyContent: "center" }}
                                >
                                    Action
                                </div>
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {products[0] && !isLoading
                            ? products.map((product: any, index: number) => {
                                  return (
                                      <tr key={product._id}>
                                          <th scope="row">
                                              {product.rate} stars
                                          </th>
                                          <td>{product._id}</td>
                                          <td>{product.name}</td>
                                          <td>{product.shortDescription}</td>
                                          <td className="text-center">
                                              ${product.price}
                                          </td>
                                          <td>{product.category}</td>
                                          <td>
                                              <button
                                                  type="button"
                                                  className="btn btn-outline-danger ms-1"
                                                  style={{ fontSize: "12px" }}
                                                  onClick={(e) => {
                                                      deleteHandler(product);
                                                  }}
                                              >
                                                  Delete
                                              </button>

                                              <button
                                                  type="button"
                                                  className="btn btn-outline-primary ms-1"
                                                  style={{ fontSize: "12px" }}
                                                  onClick={(e) =>
                                                      navigate(
                                                          "/admin/edit-product" +
                                                              `/${product._id}`,
                                                          {
                                                              state: {
                                                                  product,
                                                              },
                                                          }
                                                      )
                                                  }
                                              >
                                                  Edit
                                              </button>

                                              <button
                                                  type="button"
                                                  className="btn btn-outline-success ms-1"
                                                  style={{ fontSize: "12px" }}
                                                  onClick={(e) =>
                                                      navigate(
                                                          "/admin/product-detail" +
                                                              `/${product._id}`,
                                                          {
                                                              state: {
                                                                  product,
                                                              },
                                                          }
                                                      )
                                                  }
                                              >
                                                  Detail
                                              </button>
                                          </td>
                                      </tr>
                                  );
                              })
                            : null}
                    </tbody>
                </table>

                <div className="tableDirection">
                    <FontAwesomeIcon
                        icon={faAngleLeft}
                        onClick={() => {
                            setCurrentPage((pre) => pre - 1);
                        }}
                    />
                    <span>{search.get("page")}</span>
                    <FontAwesomeIcon
                        icon={faAngleRight}
                        onClick={() => {
                            setCurrentPage((pre) => pre + 1);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Products;
