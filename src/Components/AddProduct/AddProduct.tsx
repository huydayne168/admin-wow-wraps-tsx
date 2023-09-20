import React, { useCallback, useEffect, useState } from "react";
// import { useParams } from "react-router";
import styles from "./addProduct.module.css";
import usePrivateHttp from "../../hooks/usePrivateHttp";
import ImagePreview from "./ImagePreview";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import { tagsActions } from "../../store/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
const AddProduct: React.FC = () => {
    const privateHttp = usePrivateHttp();

    const dispatch = useAppDispatch();
    const tagsSlice = useAppSelector((state) => state.tagsSlice);

    // component state:
    const [tagsList, setTagsList] = useState<any>([]);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [price, setPrice] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [longDescription, setLongDescription] = useState("");
    const [tagsValue, setTagsValue] = useState("");
    const [image, setImage] = useState<any>("");

    // const allTags = useMemo(() => {

    // })

    // fetch all tags:
    useEffect(() => {
        const fetchTags = async () => {
            const res = await privateHttp.get("/api/tag/get-tags");
            dispatch(tagsActions.fetchAllTags(res.data));
            console.log(tagsSlice);
        };
        fetchTags();
    }, [privateHttp, dispatch]);

    // handle filter tags:
    useEffect(() => {
        if (tagsValue === "") {
            setTagsList(tagsSlice.allTags);
        } else {
            const filteredTags = tagsList.filter((tag: any) =>
                tag.tagName.includes(tagsValue)
            );
            setTagsList(filteredTags);
        }
    }, [tagsValue]);

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

    // function to set chose tags:
    const handleChooseTag = useCallback(
        (target: any) => {
            const tag = target.innerText;
            if (!tagsSlice.choseTags.some((choseTag) => choseTag === tag)) {
                dispatch(tagsActions.chooseThisTag(tag));
            }
        },
        [dispatch, tagsSlice.choseTags]
    );
    console.log(tagsSlice.choseTags);

    // function to delete chose tag:
    const handleDeleteChoseTag = useCallback(
        (target: any) => {
            const tag = target.parentElement.innerText;
            console.log(target.parentElement);
            if (tag) {
                dispatch(tagsActions.deleteThisChoseTag(tag));
            }
        },
        [dispatch]
    );

    // post product data to server to add a new product:
    const handleAddProduct = useCallback(async () => {
        try {
            const response = await privateHttp.post(
                "/api/product/add-product",
                {
                    name,
                    category,
                    amount,
                    price,
                    shortDescription,
                    longDescription,
                    tags: tagsSlice.choseTags,
                    image,
                }
            );
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
        tagsValue,
        image,
        privateHttp,
    ]);

    // return tsx:
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
                            <option>Choose food category</option>
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
                            placeholder='separate each tag with ","'
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
                            {tagsSlice.choseTags &&
                                tagsSlice.choseTags.map((tag: any) => {
                                    return (
                                        <li
                                            key={tag.tagName}
                                            className={styles["tag"]}
                                        >
                                            {tag}
                                            <div
                                                key={tag.tagName + "deleteIcon"}
                                                onClick={(e) => {
                                                    handleDeleteChoseTag(
                                                        e.currentTarget
                                                    );
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
                                                handleChooseTag(e.target);
                                            }}
                                        >
                                            {tag.tagName}
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
