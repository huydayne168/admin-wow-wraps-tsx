import React, { useState } from "react";
import styles from "./TagsAndCategoriesForm.module.css";

const TagsAndCategoriesForm: React.FC<{
    type: string;
    listItems?: any;
    deleteFn: Function;
    addFn: Function;
    searchFn: Function;
}> = ({ type, listItems, deleteFn, addFn, searchFn }) => {
    const [inputValue, setInputValue] = useState("");
    const [addErr, setAddErr] = useState(false);

    return (
        <div className={styles["tags-and-categories-form"]}>
            {addErr ? (
                <p style={{ color: "red" }}>This {type} is already exist</p>
            ) : null}
            <div className="form-floating mb-3 ">
                <input
                    type="search"
                    className="form-control"
                    id="search"
                    name="search"
                    placeholder="Search or Add New"
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.target.value);
                        searchFn(e.target.value);
                        setAddErr((pre) => false);
                    }}
                />
                <label htmlFor="search">Search or Add New {type}</label>
            </div>

            <button
                className={`${styles.sendBtn} btn btn-success btn-lg mb-3`}
                onClick={(e) => {
                    e.preventDefault();
                    if (
                        listItems.length === 0 ||
                        !listItems.some(
                            (item: any) =>
                                item.toLowerCase() === inputValue.toLowerCase()
                        )
                    ) {
                        addFn(inputValue);
                    } else {
                        setAddErr((pre) => true);
                    }
                }}
            >
                Add
            </button>

            <table className="table table-hover">
                <thead className="table-light">
                    <tr>
                        <th scope="col" style={{ width: "80%" }}>
                            {type}
                        </th>
                        <th scope="col" className="text-center">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {listItems.map((item: any) => {
                        return (
                            <tr key={item}>
                                <th scope="row">{item}</th>
                                <td className="text-center">
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger ms-1"
                                        style={{ fontSize: "12px" }}
                                        onClick={() => {
                                            deleteFn(item);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default TagsAndCategoriesForm;
