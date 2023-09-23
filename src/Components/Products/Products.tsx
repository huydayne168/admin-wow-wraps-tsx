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
    const isLoading = useAppSelector((state) => state.loading);
    const [idSearch, setIdSearch] = useState(false);
    const [nameSearch, setNameSearch] = useState(false);
    const [priceSortDropdown, setPriceSortDropdown] = useState(false);
    const [sortRate, setSortRate] = useState<string>("HIGH_RATE");
    const [sortPrice, setSortPrice] = useState<string>("Price");
    const products = useAppSelector((state) => state.products);
    const [search] = useSearchParams();
    const privateHttp = usePrivateHttp();

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
                dispatch(loadingActions.setLoading(false));
                dispatch(productsAction.setProducts(res.data));
                dispatch(productsAction.sortByRate(sortRate));
            } catch (error) {
                console.log(error);
            }
        };
        getAllProducts();
    }, []);

    const handleSortByRate = useCallback(() => {
        if (sortRate === "HIGH_RATE") {
            setSortRate((pre) => "LOW_RATE");
            dispatch(productsAction.sortByRate("LOW_RATE"));
        } else if (sortRate === "LOW_RATE") {
            setSortRate((pre) => "HIGH_RATE");
            dispatch(productsAction.sortByRate("HIGH_RATE"));
        }
    }, [dispatch, sortRate]);

    // function closeModal(state) {
    //     setIsPopup(state);
    // }

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
            {/* {isPopup && (
                <DeletePopup
                    data={deleteData}
                    closeModal={closeModal}
                    type={"Room"}
                    reload={reloadPage}
                />
            )} */}
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
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col" style={{ width: "10%" }}>
                                <div className={styles["header-title"]}>
                                    {sortRate === "HIGH_RATE"
                                        ? "High rate"
                                        : "Low rate"}{" "}
                                    <FontAwesomeIcon
                                        icon={faArrowsUpDown}
                                        onClick={handleSortByRate}
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
                                    {sortPrice}
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
                                                        dispatch(
                                                            productsAction.sortByRate(
                                                                sortRate
                                                            )
                                                        );
                                                        setSortPrice("Price");
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
                                                        dispatch(
                                                            productsAction.sortByPrice(
                                                                "HIGH_PRICE"
                                                            )
                                                        );
                                                        setSortPrice(
                                                            "High Price"
                                                        );
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
                                                        dispatch(
                                                            productsAction.sortByPrice(
                                                                "LOW_PRICE"
                                                            )
                                                        );
                                                        setSortPrice(
                                                            "Low Price"
                                                        );
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
                                <div className={styles["header-title"]}>
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
                                          <td>${product.price}</td>
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
                {isLoading && (
                    <div className={styles["loading"]}>
                        <BeatLoader />
                    </div>
                )}

                <div className="tableDirection">
                    <span>1 - 8 of 8</span>
                    <FontAwesomeIcon icon={faAngleLeft} />
                    <FontAwesomeIcon icon={faAngleRight} />
                </div>
            </div>
        </div>
    );
};

export default Products;
