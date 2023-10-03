import React, { useState, useEffect } from "react";
import styles from "./dashboard.module.css";

import DashboardHeader from "./DashboardHeader";
import DashboardTable from "./DashboardTable";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import { Checkout } from "../../models/checkout";
import usePrivateHttp from "../../hooks/usePrivateHttp";
import http from "../../utils/http";
function DashBoard() {
    const privateHttp = usePrivateHttp();
    const currentUser = useAppSelector((state) => state.authentication);
    const products = useAppSelector((state) => state.products);
    const dispatch = useAppDispatch();
    const [checkouts, setCheckouts] = useState<Checkout[]>([]);

    // get latest checkouts
    useEffect(() => {
        const getCheckouts = async () => {
            try {
                const res = await privateHttp.get(
                    "/api/checkout/get-checkouts",
                    {
                        params: {
                            page: 1,
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
    return (
        <div className={styles.dashboard}>
            <DashboardHeader />
            <DashboardTable checkouts={checkouts} />
        </div>
    );
}

export default DashBoard;
