import React, { useState } from "react";
// import http from "../../utils/http";
// import { useNavigate } from "react-router";

function DeletePopup() {
    return <div>deleted</div>;
    // { data, closeModal, type, reload }
    //     const navigate = useNavigate();
    //     const [message, setMessage] = useState(`Are you sure to delete this room?`);
    //     console.log(data);
    //     function closeHandler() {
    //         closeModal(false);
    //     }
    //     function reloadPage() {
    //         reload(true);
    //     }
    //     let url = "/delete-";

    //     function deleteHandler() {
    //         if (type === "Room") {
    //             http.post(url + "room", {
    //                 _id: data._id,
    //             })
    //                 .then((res) => {
    //                     setMessage(res.data.message);
    //                     reloadPage();
    //                 })
    //                 .catch((err) => console.log(err));
    //         } else if (type === "Hotel") {
    //             console.log(data._id);
    //             http.post(url + "hotel", {
    //                 _id: data._id,
    //             })
    //                 .then((res) => {
    //                     setMessage(res.data.message);
    //                     reloadPage();
    //                 })
    //                 .catch((err) => console.log(err));
    //         }
    //     }

    //     return (
    //         <div
    //             className="modal"
    //             tabIndex={-1}
    //             style={{ display: "block", backgroundColor: "#0000008a" }}
    //         >
    //             <div className="modal-dialog">
    //                 <div className="modal-content">
    //                     <div className="modal-header">
    //                         <h5 className="modal-title">Delete {type}</h5>
    //                         <button
    //                             type="button"
    //                             className="btn-close"
    //                             data-bs-dismiss="modal"
    //                             aria-label="Close"
    //                             onClick={closeHandler}
    //                         ></button>
    //                     </div>
    //                     <div className="modal-body">
    //                         <p>{message}</p>
    //                     </div>
    //                     <div className="modal-footer">
    //                         <button
    //                             type="button"
    //                             className="btn btn-secondary"
    //                             data-bs-dismiss="modal"
    //                             onClick={closeHandler}
    //                         >
    //                             Close
    //                         </button>
    //                         <button
    //                             type="button"
    //                             className="btn btn-danger "
    //                             onClick={deleteHandler}
    //                         >
    //                             Delete
    //                         </button>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     );
}

export default DeletePopup;
