import React from "react";
import styles from "./users.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Users: React.FC<{}> = () => {
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
                <h2>Users List</h2>
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
                            <th scope="col">Username</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col">Status</th>
                            {/* <th scope="col">Action</th> */}
                        </tr>
                    </thead>
                    <tbody></tbody>
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

export default Users;
