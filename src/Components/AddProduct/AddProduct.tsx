import React, { useCallback, useState } from "react";
// import { useParams } from "react-router";
import styles from "./addProduct.module.css";
import usePrivateHttp from "../../hooks/usePrivateHttp";
import ImagePreview from "./ImagePreview";
const AddProduct: React.FC = () => {
    const privateHttp = usePrivateHttp();
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [price, setPrice] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [longDescription, setLongDescription] = useState("");
    const [tags, setTags] = useState("");
    const [image, setImage] = useState<any>("");

    // function to handle preview image:
    const handleImage = useCallback((imgInput: any) => {
        const image = imgInput.files[0];
        const reader = new FileReader();
        if (image) {
            reader.readAsDataURL(image);
            reader.onloadend = () => {
                setImage(reader.result);
            };
        } else {
            setImage("");
        }
    }, []);
    console.log(category);

    const handleAddProduct = useCallback(async () => {
        try {
            const response = await privateHttp.post("/product/add-product", {
                name,
                category,
                amount,
                price,
                shortDescription,
                longDescription,
                tags,
                image,
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }, [
        name,
        category,
        amount,
        price,
        shortDescription,
        longDescription,
        tags,
        image,
        privateHttp,
    ]);
    return (
        <div className={styles.addFormContainer}>
            <div className={styles.heading}>Add New Products</div>

            <div className={styles.addForm}>
                <form action="#">
                    <div className={styles.controls}>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                    </div>
                    <div className={styles.controls}>
                        <label htmlFor="category">Category</label>
                        <select
                            name="category"
                            id="category"
                            className="form-select"
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value);
                            }}
                        >
                            <option value="Noodle">Noodle</option>
                            <option value="Rice">Rice</option>
                            <option value="Rice Paper">Rice Paper</option>
                            <option value="Drink">Drink</option>
                        </select>
                    </div>
                    <div className={styles.controls}>
                        <label htmlFor="amount">Amount</label>
                        <input
                            type="number"
                            name="amount"
                            id="amount"
                            min={0}
                            value={amount}
                            onChange={(e) => {
                                setAmount(e.target.value);
                            }}
                        />
                    </div>
                    <div className={styles.controls}>
                        <label htmlFor="price">Price($)</label>
                        <input
                            type="number"
                            name="price"
                            id="price"
                            min={0}
                            value={price}
                            onChange={(e) => {
                                setPrice(e.target.value);
                            }}
                        />
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
                            value={shortDescription}
                            onChange={(e) => {
                                setShortDescription(e.target.value);
                            }}
                        ></textarea>
                    </div>

                    <div className={styles.controls}>
                        <label htmlFor="long-description">
                            long-description
                        </label>
                        <textarea
                            name="long-description"
                            id="long-description"
                            cols={30}
                            rows={3}
                            value={longDescription}
                            onChange={(e) => {
                                setLongDescription(e.target.value);
                            }}
                        ></textarea>
                    </div>

                    <div className={styles.controls}>
                        <label htmlFor="tags">Tags</label>
                        <input
                            type="text"
                            name="tags"
                            id="tags"
                            placeholder='separate each tag with ","'
                            value={tags}
                            onChange={(e) => {
                                setTags(e.target.value);
                            }}
                        ></input>
                    </div>

                    <div className={styles.controls}>
                        <label htmlFor="image">Images</label>
                        <input
                            type="file"
                            name="image"
                            id="image"
                            onChange={(e) => {
                                handleImage(e.target);
                            }}
                        />
                    </div>
                    {image ? <ImagePreview image={image} /> : <ImagePreview />}

                    <button
                        className={`${styles.sendBtn} btn btn-success btn-lg`}
                        onClick={(e) => {
                            e.preventDefault();
                            handleAddProduct();
                        }}
                    >
                        Add
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
