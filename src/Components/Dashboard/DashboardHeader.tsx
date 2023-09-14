import React from "react";
import styles from "./dashboardHeader.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faCoins,
    faBalanceScale,
    faBowlFood,
} from "@fortawesome/free-solid-svg-icons";
function DashboardHeader() {
    return (
        <div className={styles.headerCards}>
            <div className={`${styles.headerCard} card`}>
                <div className="card-body">
                    <h5 className="card-title">Users</h5>
                    <p className="card-text fs-2">100</p>
                    <FontAwesomeIcon
                        style={{
                            backgroundColor: "#ffcccc",
                            color: "#de2046",
                        }}
                        icon={faUser}
                    />
                </div>
            </div>

            <div className={`${styles.headerCard} card`}>
                <div className="card-body">
                    <h5 className="card-title">Products</h5>
                    <p className="card-text fs-2">100</p>
                    <FontAwesomeIcon
                        style={{
                            backgroundColor: "#f8edd2",
                            color: "#dcaa2c",
                        }}
                        icon={faBowlFood}
                    />
                </div>
            </div>

            <div className={`${styles.headerCard} card`}>
                <div className="card-body">
                    <h5 className="card-title">Earning</h5>
                    <p className="card-text fs-2">100</p>
                    <FontAwesomeIcon
                        style={{
                            backgroundColor: "#cce6cc",
                            color: "#329932",
                        }}
                        icon={faCoins}
                    />
                </div>
            </div>

            <div className={`${styles.headerCard} card`}>
                <div className="card-body">
                    <h5 className="card-title">Balance</h5>
                    <p className="card-text fs-2">100</p>
                    <FontAwesomeIcon
                        style={{
                            backgroundColor: "#e6cce6",
                            color: "#8d198d",
                        }}
                        icon={faBalanceScale}
                    />
                </div>
            </div>
        </div>
    );
}

export default DashboardHeader;
