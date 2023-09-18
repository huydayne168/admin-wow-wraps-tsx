import React from "react";
import styles from "./dashboard.module.css";

import DashboardHeader from "./DashboardHeader";
import DashboardTable from "./DashboardTable";
import { useAppSelector } from "../../hooks/useStore";

function DashBoard() {
    const currentUser = useAppSelector((state) => state.authentication);
    console.log(currentUser);

    return (
        <div className={styles.dashboard}>
            <DashboardHeader />
            <DashboardTable />
        </div>
    );
}

export default DashBoard;
