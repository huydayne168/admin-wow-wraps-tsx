import React, { useState } from "react";
import styles from "./tags-and-categories.module.css";
import { useNavigate, useParams } from "react-router-dom";
import Categories from "./Categories";
import Tags from "./Tags";
const TagsAndCategories: React.FC<{}> = () => {
    const navigate = useNavigate();
    const params = useParams();
    const type = params.tagsCategories;

    return (
        <div className={styles["tags-and-categories"]}>
            <h2>Tags and Categories</h2>

            <ul className={styles["nav-bar"]}>
                <li
                    className={`${
                        type === "categories" ? styles["nav-active"] : ""
                    }`}
                    onClick={() => {
                        navigate("/admin/categories");
                    }}
                >
                    Category
                </li>
                <li
                    className={`${type === "tags" ? styles["nav-active"] : ""}`}
                    onClick={() => {
                        navigate("/admin/tags");
                    }}
                >
                    Tag
                </li>
            </ul>

            {type === "categories" ? <Categories /> : <Tags />}
        </div>
    );
};

export default TagsAndCategories;
