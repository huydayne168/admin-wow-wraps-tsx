import React from "react";
import styles from "./sideBar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTableColumns,
    faUser,
    faMoneyBill,
    faBowlFood,
    faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
function SideBar() {
    const navigate = useNavigate();

    // function logoutHandler(e) {
    //     e.preventDefault();
    //     navigate("");
    //     localStorage.removeItem("admin");
    // }

    return (
        <div className={`${styles.sideBar} `}>
            <div className={`${styles.header} fs-3 text-center`}>
                Admin Page
            </div>

            <nav>
                <div className={styles.navCategory}>
                    <div className={styles.navTitles}>Main</div>
                    <Link to={"dash-board"}>
                        <FontAwesomeIcon icon={faTableColumns} />
                        Dashboard
                    </Link>
                </div>

                <div className={styles.navCategory}>
                    <div className={styles.navTitles}>List</div>
                    <Link to={"users"}>
                        <FontAwesomeIcon icon={faUser} />
                        Users
                    </Link>

                    <Link to={"products"}>
                        <FontAwesomeIcon icon={faBowlFood} />
                        Products
                    </Link>

                    <Link to={"transactions"}>
                        <FontAwesomeIcon icon={faMoneyBill} />
                        Checkouts
                    </Link>
                </div>

                <div className={styles.navCategory}>
                    <div className={styles.navTitles}>New</div>
                    <Link to={"add-product/add-hotel"}>
                        <FontAwesomeIcon icon={faBowlFood} />
                        New Products
                    </Link>
                </div>

                <div className={styles.navCategory}>
                    <button>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} />
                        Log out
                    </button>
                </div>
            </nav>
        </div>
    );
}

export default SideBar;
