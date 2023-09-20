import React, { useState, useEffect, useCallback } from "react";
import styles from "./products.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleLeft,
    faAngleRight,
    faArrowUp19,
    faArrowsUpDown,
} from "@fortawesome/free-solid-svg-icons";
import http from "../../utils/http";
import type { Product } from "../../models/product";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import { navigationActions } from "../../store/store";
import { productsAction } from "../../store/store";
// import DeletePopup from "../DeletePopup/DeletePopup";
const Products: React.FC = () => {
    // const [load, setLoad] = useState(false);
    // const [isPopup, setIsPopup] = useState(false);
    // const [deleteData, setDeleteData] = useState("");
    // const privateHttp
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [sortRate, setSortRate] = useState<string>("HIGH_RATE");
    const products = useAppSelector((state) => state.products);

    // function reloadPage(state) {
    //     setLoad((load) => !load);
    // }

    useEffect(() => {
        const getAllProducts = async () => {
            try {
                const res = await http.get(
                    process.env.REACT_APP_SERVER_DOMAIN +
                        "/api/product/get-all-products",
                    {
                        withCredentials: true,
                    }
                );

                dispatch(productsAction.getAllProducts(res.data));
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
            console.log("low rate here");
            setSortRate((pre) => "HIGH_RATE");
            dispatch(productsAction.sortByRate("HIGH_RATE"));
        }
    }, [dispatch, sortRate]);

    // function closeModal(state) {
    //     setIsPopup(state);
    // }

    // function deleteHandler(e, room) {
    //     e.preventDefault();
    //     setIsPopup(true);
    //     setDeleteData(room);
    // }

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
                            <th scope="col">
                                {sortRate === "HIGH_RATE"
                                    ? "High rate"
                                    : "Low rate"}{" "}
                                <FontAwesomeIcon
                                    icon={faArrowsUpDown}
                                    onClick={handleSortByRate}
                                />
                            </th>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Price</th>
                            <th scope="col">Category</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products[0] &&
                            products.map((product, index) => {
                                return (
                                    <tr key={product._id}>
                                        <th scope="row">{index + 1}</th>
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
                                                // onClick={(e) =>
                                                //     deleteHandler(e, product)
                                                // }
                                            >
                                                Delete
                                            </button>

                                            <button
                                                type="button"
                                                className="btn btn-outline-primary ms-1"
                                                style={{ fontSize: "12px" }}
                                                // onClick={(e) =>
                                                //     deleteHandler(e, product)
                                                // }
                                            >
                                                Edit
                                            </button>

                                            <button
                                                type="button"
                                                className="btn btn-outline-success ms-1"
                                                style={{ fontSize: "12px" }}
                                                // onClick={(e) =>
                                                //     deleteHandler(e, product)
                                                // }
                                            >
                                                Detail
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>

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
