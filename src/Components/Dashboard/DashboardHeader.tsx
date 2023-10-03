import React, { useState, useEffect, useMemo } from "react";
import styles from "./dashboardHeader.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faCoins,
    faBalanceScale,
    faBowlFood,
} from "@fortawesome/free-solid-svg-icons";
import { User } from "../../models/user";
import usePrivateHttp from "../../hooks/usePrivateHttp";
import http from "../../utils/http";
import { Product } from "../../models/product";
import { Checkout } from "../../models/checkout";
import { useAppDispatch } from "../../hooks/useStore";
import { useNavigate } from "react-router-dom";
import { navigationActions } from "../../store/store";
const DashboardHeader: React.FC<{}> = ({}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const privateHttp = usePrivateHttp();
    const [users, setUsers] = useState<User[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [checkouts, setCheckouts] = useState<Checkout[]>([]);
    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await privateHttp.get("/user/get-users", {
                    params: {
                        sortRole: "user",
                    },
                });

                setUsers((prev) => res.data.users);
            } catch (error) {
                console.log(error);
            }
        };

        getUsers();
    }, []);

    useEffect(() => {
        const getAllProducts = async () => {
            try {
                const res = await http.get(
                    process.env.REACT_APP_SERVER_DOMAIN +
                        "/api/product/get-products",
                    {
                        params: {
                            category: "All",
                        },
                    }
                );
                setProducts(res.data.products);
            } catch (error) {
                console.log(error);
            }
        };
        getAllProducts();
    }, []);

    // get all checkouts
    useEffect(() => {
        const getCheckouts = async () => {
            try {
                const res = await privateHttp.get(
                    "/api/checkout/get-checkouts",
                    {
                        params: {
                            sortDate: "true",
                        },
                    }
                );
                console.log(res);
                setCheckouts(res.data.checkouts);
            } catch (error) {
                console.log(error);
            }
        };

        getCheckouts();
    }, []);

    const earning = useMemo(() => {
        return checkouts
            .filter((checkout) => checkout.status.toLowerCase() === "paid")
            .reduce((init, checkout) => init + Number(checkout.total), 0);
    }, [checkouts]);

    return (
        <div className={styles.headerCards}>
            <div
                className={`${styles.headerCard} card`}
                onClick={() => {
                    dispatch(navigationActions.setNavigationState("users"));
                    navigate("/admin/users");
                }}
            >
                <div className="card-body">
                    <h5 className="card-title">Users</h5>
                    <p className="card-text fs-2">{users.length}</p>
                    <FontAwesomeIcon
                        style={{
                            backgroundColor: "#ffcccc",
                            color: "#de2046",
                        }}
                        icon={faUser}
                    />
                </div>
            </div>

            <div
                className={`${styles.headerCard} card`}
                onClick={() => {
                    dispatch(navigationActions.setNavigationState("products"));
                    navigate("/admin/products");
                }}
            >
                <div className="card-body">
                    <h5 className="card-title">Products</h5>
                    <p className="card-text fs-2">{products.length}</p>
                    <FontAwesomeIcon
                        style={{
                            backgroundColor: "#f8edd2",
                            color: "#dcaa2c",
                        }}
                        icon={faBowlFood}
                    />
                </div>
            </div>

            <div
                className={`${styles.headerCard} card`}
                onClick={() => {
                    dispatch(
                        navigationActions.setNavigationState("transactions")
                    );
                    navigate("/admin/transactions");
                }}
            >
                <div className="card-body">
                    <h5 className="card-title">Earning</h5>
                    <p className="card-text fs-2">${earning.toFixed(2)}</p>
                    <FontAwesomeIcon
                        style={{
                            backgroundColor: "#cce6cc",
                            color: "#329932",
                        }}
                        icon={faCoins}
                    />
                </div>
            </div>
        </div>
    );
};

export default DashboardHeader;
