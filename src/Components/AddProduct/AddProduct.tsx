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
    // post product data to server to add a new product:
    const handleAddProduct = useCallback(async (product: Product) => {
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
                    category,
                    amount,
                    price,
                    shortDescription,
                    longDescription,
                    tags,
                    image,
                }
            );
            dispatch(loadingActions.setLoading(false));
            navigate("/admin/products");
        } catch (error) {
            console.log(error);
        }
    }, []);

    // return tsx:
    return <ProductForm handleProductFn={handleAddProduct} />;
};

export default AddProduct;
