import React, { useState, useCallback, useEffect } from "react";
import styles from "./product-form.module.css";
import { tagsActions } from "../../store/store";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import ImagePreview from "../AddProduct/ImagePreview";
import { Product } from "../../models/product";
import usePrivateHttp from "../../hooks/usePrivateHttp";
import { BeatLoader } from "react-spinners";
import { type } from "os";
import { Tag } from "../../models/tag";
import { Category } from "../../models/category";
import { Alert } from "antd";
const ProductForm: React.FC<{
    errMess?: boolean;
    product?: Product;
    handleProductFn: Function;
}> = ({ errMess, product, handleProductFn }) => {
    const privateHttp = usePrivateHttp();
    const dispatch = useAppDispatch();

    const tagsSlice = useAppSelector((state) => state.tagsSlice);
    const isLoading = useAppSelector((state) => state.loading);

    // component state:
    const [tagsList, setTagsList] = useState<Tag[]>([]);
    const [categoriesList, setCategoriesList] = useState<Category[]>([]);
    const [name, setName] = useState(product?.name || "");
    const [category, setCategory] = useState<Category>(
        product?.category || {
            _id: "",
            name: "",
        }
    );
    console.log(category);

    const [amount, setAmount] = useState(product?.amount || "");
    const [price, setPrice] = useState(product?.price || "");
    const [shortDescription, setShortDescription] = useState(
        product?.shortDescription || ""
    );
    const [longDescription, setLongDescription] = useState(
        product?.longDescription || ""
    );
    const [tagsValue, setTagsValue] = useState("");

    const [image, setImage] = useState<any>(product?.image || "");
    const [choseTags, setChoseTags] = useState<Tag[]>(product?.tags || []);

    // fetch all categories:
    useEffect(() => {
        const fetchCategories = async () => {
            const res = await privateHttp.get("/api/category/get-categories");
            setCategoriesList(res.data);
        };

        fetchCategories();
    }, []);

    // fetch all tags:
    useEffect(() => {
        const fetchTags = async () => {
            const res = await privateHttp.get("/api/tag/get-tags");

            dispatch(tagsActions.fetchAllTags(res.data));
            setTagsList(res.data);
        };

        fetchTags();
    }, [privateHttp, dispatch]);

    // handle filter tags:
    useEffect(() => {
        if (tagsValue === "") {
            setTagsList(tagsSlice.allTags);
        } else {
            const filteredTags = tagsList.filter((tag: any) =>
                tag.name.toLowerCase().includes(tagsValue.toLowerCase())
            );
            setTagsList(filteredTags);
        }
    }, [tagsValue]);

    // function to set chose tags:
    const handleChooseTag = useCallback(
        (tag: any) => {
            if (!choseTags.some((choseTag) => choseTag._id === tag._id)) {
                setChoseTags((pre: Tag[]) => {
                    return [...pre, tag];
                });
            }
        },
        [dispatch, tagsSlice.choseTags]
    );

    // function to delete chose tag:
    const handleDeleteChoseTag = useCallback((tag: Tag) => {
        if (tag) {
            setChoseTags((prev: Tag[]) => {
                return prev.filter((_tag) => _tag._id !== tag._id);
            });
        }
    }, []);

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

    return (
        <div className={styles.productFormContainer}>
            <div className={styles.heading}>
                {product ? "Edit Product" : "Add New Products"}
                {isLoading ? <BeatLoader /> : ""}
            </div>
            {errMess && (
                <Alert
                    type="error"
                    message="Please fill all inputs!!!"
                    style={{ color: "red" }}
                />
            )}
            <div className={styles["product-form"]}>
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
                            onChange={(e) => {
                                setCategory(
                                    categoriesList.filter(
                                        (c) => c._id === e.target.value
                                    )[0]
                                );
                            }}
                            defaultValue={category._id}
                        >
                            {category._id ? (
                                <option value={category._id}>
                                    {category.name}
                                </option>
                            ) : (
                                <option value={""} hidden>
                                    --Choose food category--
                                </option>
                            )}
                            {categoriesList[0] &&
                                categoriesList.map((_category) => {
                                    console.log(
                                        JSON.stringify(category) ===
                                            JSON.stringify(_category),
                                        _category.name
                                    );

                                    return (
                                        <option
                                            hidden={
                                                category._id === _category._id
                                            }
                                            key={_category.name}
                                            value={_category._id}
                                        >
                                            {_category.name}
                                        </option>
                                    );
                                })}
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
                            Long Description
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
                            placeholder="Choose food tags"
                            value={tagsValue}
                            onChange={(e) => {
                                setTagsValue(e.target.value);
                            }}
                        ></input>
                    </div>
                    <div
                        className={`${styles["choose-tags-action"]} ${styles["controls"]}`}
                    >
                        <ul className={styles["chose-tags-list"]}>
                            {choseTags &&
                                choseTags.map((tag: any) => {
                                    return (
                                        <li
                                            key={tag._id}
                                            className={styles["tag"]}
                                        >
                                            {tag.name}
                                            <div
                                                key={tag.name + "deleteIcon"}
                                                onClick={(e) => {
                                                    handleDeleteChoseTag(tag);
                                                }}
                                                className={
                                                    styles["tag-delete-icon"]
                                                }
                                            >
                                                <FontAwesomeIcon
                                                    icon={faClose}
                                                />
                                            </div>
                                        </li>
                                    );
                                })}
                        </ul>
                        <ul className={styles["tags-list"]}>
                            {tagsList &&
                                tagsList.map((tag: any) => {
                                    return (
                                        <li
                                            key={tag._id}
                                            className={styles["tag"]}
                                            onClick={(e) => {
                                                handleChooseTag(tag);
                                            }}
                                        >
                                            {tag.name}
                                        </li>
                                    );
                                })}
                        </ul>
                    </div>

                    <div
                        className={`${styles.controls} ${styles["image-control"]}`}
                    >
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
                            handleProductFn({
                                _id: product?._id,
                                name,
                                category: category,
                                amount,
                                price,
                                shortDescription,
                                longDescription,
                                tags: choseTags,
                                image,
                            });
                        }}
                    >
                        {product ? "Edit" : "Add"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;
