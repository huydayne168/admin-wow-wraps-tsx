import React, { useEffect, useState } from "react";
import styles from "./dashboardTable.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import http from "../../utils/http";
function DashboardTable() {
    // const [transactions, setTransactions] = useState([]);
    // useEffect(() => {
    //     http.get("/get-transaction/dashboard")
    //         .then((res) => {
    //             setTransactions(res.data);
    //         })
    //         .catch((err) => console.log(err));
    // }, []);
    return (
        <div className={`${styles.dashboardTableWrapper}`}>
            <h2>Latest Checkouts</h2>
            <div className={`${styles.dashboardTable}`}>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">
                                <input type="checkbox" name="check" />
                            </th>
                            <th scope="col">ID</th>
                            <th scope="col">User</th>
                            <th scope="col">Products</th>
                            <th scope="col">Date</th>
                            <th scope="col">Price</th>
                            <th scope="col">Payment Method</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {transactions[0] &&
                            transactions.map((tran) => {
                                return (
                                    <tr key={tran._id}>
                                        <th scope="row">
                                            <input
                                                type="checkbox"
                                                name="check"
                                            />
                                        </th>
                                        <td>{tran._id}</td>
                                        <td>{tran.userName}</td>
                                        <td>{tran.hotel}</td>
                                        <td>{tran.room.join(", ")}</td>
                                        <td>
                                            {tran.dateStart} - {tran.dateEnd}
                                        </td>
                                        <td>${tran.price}</td>
                                        <td>{tran.payment}</td>
                                        <td>{tran.status}</td>
                                    </tr>
                                );
                            })} */}
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
}

export default DashboardTable;
