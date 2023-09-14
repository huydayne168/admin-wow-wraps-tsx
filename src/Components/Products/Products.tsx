import React, { useState, useEffect } from "react";
import styles from "./products.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import http from "../../utils/http";
// import DeletePopup from "../DeletePopup/DeletePopup";
const Products: React.FC = () => {
    // const [load, setLoad] = useState(false);
    // const [isPopup, setIsPopup] = useState(false);
    // const [deleteData, setDeleteData] = useState("");
    // const [rooms, setRooms] = useState([]);

    // function reloadPage(state) {
    //     setLoad((load) => !load);
    // }

    // useEffect(() => {
    //     http.get("/get-room")
    //         .then((res) => {
    //             setRooms(res.data);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, [load]);

    // function closeModal(state) {
    //     setIsPopup(state);
    // }

    // function deleteHandler(e, room) {
    //     e.preventDefault();
    //     setIsPopup(true);
    //     setDeleteData(room);
    // }

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
                <h2>Products List</h2>
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
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Price</th>
                            <th scope="col">Available</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {rooms[0] &&
                            rooms.map((room) => {
                                return (
                                    <tr key={room._id}>
                                        <th scope="row">
                                            <input
                                                type="checkbox"
                                                name="check"
                                            />
                                        </th>
                                        <td>{room._id}</td>
                                        <td>{room.title}</td>
                                        <td>{room.desc}</td>
                                        <td>${room.price}</td>
                                        <td>{room.maxPeople}</td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-outline-danger"
                                                style={{ fontSize: "12px" }}
                                                onClick={(e) =>
                                                    deleteHandler(e, room)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </td>
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
};

export default Products;
