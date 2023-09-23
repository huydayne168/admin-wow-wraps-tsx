import React from "react";
import styles from "./product-detail.module.css";
import { Product } from "../../models/product";
import { useLocation, useNavigate } from "react-router-dom";
const ProductDetail: React.FC<{}> = () => {
    const location = useLocation();
    const product: Product = location.state.product;
    const navigate = useNavigate();
    return (
        <div className={styles["product-detail"]}>
            <div className={styles["left"]}>
                <img src={product.image} alt={product.name} />
                <ul className={styles["reviews"]}>
                    Reviews:
                    {product.reviews?.length > 0 ? (
                        product.reviews.map((review) => {
                            return (
                                <li>
                                    <div>{review.rate}</div>
                                    <div>{review.reviewContent}</div>
                                </li>
                            );
                        })
                    ) : (
                        <li>No review</li>
                    )}
                </ul>
            </div>

            <div className={styles["right"]}>
                <div className={styles["detail"]}>
                    <h3>
                        ID: <span>{product._id}</span>
                    </h3>
                </div>

                <div className={styles["detail"]}>
                    <h3>
                        NAME: <span>{product.name}</span>
                    </h3>
                </div>

                <div className={styles["detail"]}>
                    <h3>
                        AMOUNT: <span>{product.amount} gram</span>
                    </h3>
                </div>

                <div className={styles["detail"]}>
                    <h3>
                        RATE: <span>{product.rate} stars</span>
                    </h3>
                </div>

                <div className={styles["detail"]}>
                    <h3>
                        SHORT DESCRIPTION:{" "}
                        <span className={styles["desc"]}>
                            {product.shortDescription}
                        </span>
                    </h3>
                </div>

                <div className={styles["detail"]}>
                    <h3>
                        LONG DESCRIPTION:{" "}
                        <span className={styles["desc"]}>
                            {product.longDescription}
                        </span>
                    </h3>
                </div>

                <div className={styles["detail"]}>
                    <h3>
                        CATEGORY: <span>{product.category}</span>
                    </h3>
                </div>

                <div className={styles["detail"]}>
                    <h3>
                        TAGS: <span>{product.tags.join(", ")}</span>
                    </h3>
                </div>

                <button
                    type="button"
                    className="btn btn-outline-primary ms-1 fs-3 mt-3 px-5"
                    style={{ fontSize: "12px" }}
                    onClick={(e) => {
                        e.preventDefault();
                        navigate("/admin/edit-product" + `/${product._id}`, {
                            state: {
                                product,
                            },
                        });
                    }}
                >
                    Edit
                </button>
            </div>
        </div>
    );
};

export default ProductDetail;
