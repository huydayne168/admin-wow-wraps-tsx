import React, { useEffect, useState } from "react";
import styles from "./product-detail.module.css";
import { Product } from "../../models/product";
import { useLocation, useNavigate } from "react-router-dom";
import { List, Avatar } from "antd";
import { Review } from "../../models/review";
import http from "../../utils/http";
const ProductDetail: React.FC<{}> = () => {
    const location = useLocation();
    const product: Product = location.state.product;
    console.log(product.reviews);
    const navigate = useNavigate();
    const [productReviews, setProductReviews] = useState<Review[]>();
    // get all products reviews :
    useEffect(() => {
        const getProductReviews = async function () {
            try {
                const res = await http.get(
                    process.env.REACT_APP_SERVER_DOMAIN +
                        "/api/product/get-reviews",
                    {
                        params: {
                            productId: product._id,
                        },
                    }
                );
                setProductReviews(res.data);
                console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        getProductReviews();
    }, []);

    console.log(product.reviews);

    return (
        <div className={styles["product-detail"]}>
            <div className={styles["left"]}>
                <img src={product.image} alt={product.name} />
                <ul className={styles["reviews"]}>
                    Reviews:
                    {productReviews && productReviews.length > 0 ? (
                        <List
                            className={styles["reviews-list"]}
                            itemLayout="horizontal"
                            dataSource={productReviews}
                            renderItem={(item, index) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar
                                                style={{
                                                    backgroundColor: "#fb8f2c",
                                                    verticalAlign: "middle",
                                                }}
                                            >
                                                {
                                                    item.user.userName.toUpperCase()[0]
                                                }
                                            </Avatar>
                                        }
                                        title={item.user.userName}
                                        description={
                                            <>
                                                <strong>
                                                    {item.ratePoint} stars
                                                </strong>
                                                -<span> {item.comment}</span>
                                            </>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
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
                        CATEGORY: <span>{product.category.name}</span>
                    </h3>
                </div>

                <div className={styles["detail"]}>
                    <h3>
                        TAGS:{" "}
                        <span>
                            {product.tags.map((tag) => tag.name).join(", ")}
                        </span>
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
