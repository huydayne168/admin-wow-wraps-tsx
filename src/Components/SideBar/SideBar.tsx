import React, { useCallback, useEffect, useState } from "react";
import styles from "./sideBar.module.css";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTableColumns,
    faUser,
    faMoneyBill,
    faBowlFood,
    faArrowRightFromBracket,
    faTag,
} from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import http from "../../utils/http";
import { authActions } from "../../store/store";
import { navigationActions } from "../../store/store";
import type { User } from "../../models/user";
function SideBar() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const currentUserData = useAppSelector((state) => state.authentication);
    const navigationState = useAppSelector((state) => state.navigation);
    const [currentUser, setCurrentUser] = useState<User>();
    useEffect(() => {
        const getCurrentUser = async () => {
            const res = await http.get("/get-user", {
                params: {
                    _id: currentUserData._id,
                },
            });
            setCurrentUser(res.data);
        };
        getCurrentUser();
    }, []);
    const logoutHandler = useCallback(async () => {
        const res = await http.get("/logout", {
            withCredentials: true,
        });
        dispatch(authActions.logout());
        navigate("/");
    }, []);

    return (
        <div className={`${styles.sideBar} `}>
            <div className={`${styles.header} fs-3 text-center`}>
                {currentUser?.userName ? currentUser.userName : "Admin"}
            </div>

            <nav>
                <div className={styles.navCategory}>
                    <div className={styles.navTitles}>Main</div>
                    <Link
                        to={"dash-board"}
                        className={`${
                            navigationState === "dash-board"
                                ? styles["active"]
                                : ""
                        }`}
                        onClick={() => {
                            dispatch(
                                navigationActions.setNavigationState(
                                    "dash-board"
                                )
                            );
                        }}
                    >
                        <FontAwesomeIcon icon={faTableColumns} />
                        Dashboard
                    </Link>
                </div>

                <div className={styles.navCategory}>
                    <div className={styles.navTitles}>List</div>
                    <Link
                        to={"users"}
                        className={`${
                            navigationState === "users" ? styles["active"] : ""
                        }`}
                        onClick={() => {
                            dispatch(
                                navigationActions.setNavigationState("users")
                            );
                        }}
                    >
                        <FontAwesomeIcon icon={faUser} />
                        Users
                    </Link>

                    <Link
                        to={"products"}
                        className={`${
                            navigationState === "products"
                                ? styles["active"]
                                : ""
                        }`}
                        onClick={() => {
                            dispatch(
                                navigationActions.setNavigationState("products")
                            );
                        }}
                    >
                        <FontAwesomeIcon icon={faBowlFood} />
                        Products
                    </Link>

                    <Link
                        to={"transactions"}
                        className={`${
                            navigationState === "transactions"
                                ? styles["active"]
                                : ""
                        }`}
                        onClick={() => {
                            dispatch(
                                navigationActions.setNavigationState(
                                    "transactions"
                                )
                            );
                        }}
                    >
                        <FontAwesomeIcon icon={faMoneyBill} />
                        Checkouts
                    </Link>

                    <Link
                        to={"categories"}
                        className={`${
                            navigationState === "tags-categories"
                                ? styles["active"]
                                : ""
                        }`}
                        onClick={() => {
                            dispatch(
                                navigationActions.setNavigationState(
                                    "tags-categories"
                                )
                            );
                        }}
                    >
                        <FontAwesomeIcon icon={faTag} />
                        Tags & Categories
                    </Link>
                </div>

                <div className={styles.navCategory}>
                    <div className={styles.navTitles}>New</div>
                    <Link
                        to={"add-product"}
                        className={`${
                            navigationState === "add-product"
                                ? styles["active"]
                                : ""
                        }`}
                        onClick={() => {
                            dispatch(
                                navigationActions.setNavigationState(
                                    "add-product"
                                )
                            );
                        }}
                    >
                        <FontAwesomeIcon icon={faBowlFood} />
                        New Products
                    </Link>
                </div>

                <div className={styles.navCategory}>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            logoutHandler();
                        }}
                    >
                        <FontAwesomeIcon icon={faArrowRightFromBracket} />
                        Log out
                    </button>
                </div>
            </nav>
        </div>
    );
}

export default SideBar;
