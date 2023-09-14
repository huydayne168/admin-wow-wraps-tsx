import React from "react";
import SideBar from "../SideBar/SideBar";
import { Outlet } from "react-router";
import styles from "./root.module.css";

function Root() {
    return (
        <div className={styles["root-page"]}>
            <SideBar />
            <div className={styles.mainContent}>
                <Outlet />
            </div>
        </div>
    );
}

export default Root;
