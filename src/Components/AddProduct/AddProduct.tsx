import React, { useCallback, useEffect, useState } from "react";
// import { useParams } from "react-router";
import usePrivateHttp from "../../hooks/usePrivateHttp";
import { useAppDispatch } from "../../hooks/useStore";
import { loadingActions } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { Product } from "../../models/product";
import ProductForm from "../ProductForm/ProductForm";
const AddProduct: React.FC = () => {
    const privateHttp = usePrivateHttp();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [errMess, setErrMess] = useState(false);
    // post product data to server to add a new product:
    const handleAddProduct = useCallback(async (product: Product) => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        const {
            _id,
            name,
            category,
            amount,
            price,
            shortDescription,
            longDescription,
            tags,
            image,
        } = product;
        try {
            dispatch(loadingActions.setLoading(true));
            const response = await privateHttp.post(
                "/api/product/add-product",
                {
                    name,
                    category: category._id,
                    amount,
                    price,
                    shortDescription,
                    longDescription,
                    tags: tags.map((tag) => tag._id),
                    image,
                }
            );
            dispatch(loadingActions.setLoading(false));
            navigate("/admin/products");
        } catch (error) {
            setErrMess(true);
            dispatch(loadingActions.setLoading(false));
            console.log(error);
        }
    }, []);

    // return tsx:
    return <ProductForm errMess={errMess} handleProductFn={handleAddProduct} />;
};

export default AddProduct;
