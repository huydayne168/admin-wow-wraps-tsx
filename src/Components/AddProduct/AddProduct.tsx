import React from "react";
import { useParams } from "react-router";
import styles from "./addProduct.module.css";
const AddProduct: React.FC = () => {
    return (
        <div className={styles.addFormContainer}>
            <div className={styles.heading}>Add New Products</div>

            <div className={styles.addForm}>
                <form action="#">
                    <div className={styles.controls}>
                        <label htmlFor="roomName">Name</label>
                        <input type="text" name="roomName" id="roomName" />
                    </div>
                    <div className={styles.controls}>
                        <label htmlFor="category">Category</label>
                        <select
                            name="category"
                            id="inputGroupSelect02"
                            className="form-select"
                        >
                            <option value="Noodle">Noodle</option>
                            <option value="Rice">Rice</option>
                            <option value="Rice Paper">Rice Paper</option>
                            <option value="Drink">Drink</option>
                        </select>
                    </div>
                    <div className={styles.controls}>
                        <label htmlFor="amount">Amount</label>
                        <input type="number" name="amount" id="amount" />
                    </div>
                    <div className={styles.controls}>
                        <label htmlFor="price">Price($)</label>
                        <input type="number" name="price" id="price" />
                    </div>
                    <div className={styles.controls}>
                        <label htmlFor="short-description">
                            Short Description
                        </label>
                        <textarea
                            name="short-description"
                            id="short-description"
                            cols={30}
                            rows={3}
                        ></textarea>
                    </div>
                    {/* <div className={styles.controls}>
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" id="title" />
                    </div> */}
                    <div className={styles.controls}>
                        <label htmlFor="description">Description</label>
                        <textarea
                            name="description"
                            id="description"
                            cols={30}
                            rows={3}
                        ></textarea>
                    </div>
                    {/* <div className={styles.controls}>
                        <label htmlFor="price">Price</label>
                        <input type="text" name="price" id="price" />
                    </div> */}
                    <div className={styles.controls}>
                        <label htmlFor="image">Images</label>
                        <textarea
                            name="image"
                            id="image"
                            cols={30}
                            rows={3}
                        ></textarea>
                    </div>

                    <button
                        className={`${styles.sendBtn} btn btn-success btn-lg`}
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
