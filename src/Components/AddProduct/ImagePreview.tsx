import React from "react";
import styles from "./ImagePreview.module.css";
const ImagePreview: React.FC<{ image?: string }> = ({ image }) => {
    return (
        <div className={styles["image-preview-comp"]}>
            {image ? (
                <img
                    src={image}
                    alt="product image"
                    className={styles["preview-image"]}
                />
            ) : (
                <p className={styles["text"]}>Image Preview</p>
            )}
        </div>
    );
};

export default ImagePreview;
