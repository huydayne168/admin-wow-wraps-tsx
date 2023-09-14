import React, { useState, useEffect } from "react";
import styles from "./transaction.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import http from "../../utils/http";
function Transactions() {
    // const [transactions, setTransactions] = useState([]);
    // useEffect(() => {
    //     http.get("/get-transaction/transactionsPage")
    //         .then((res) => {
    //             setTransactions(res.data);
    //         })
    //         .catch((err) => console.log(err));
    // }, []);

    return (
        <div className="tableWrapper">
            <div className={styles.heading}>
                <h2>Checkouts List</h2>
                <button>Add New</button>
            </div>
            <div className="tableContent">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">
                                <input type="checkbox" name="check" />
                            </th>
                            <th scope="col">ID</th>
                            <th scope="col">User</th>
                            <th scope="col">Ordered Products</th>
                            <th scope="col">Date</th>
                            <th scope="col">Total Price</th>
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

export default Transactions;
