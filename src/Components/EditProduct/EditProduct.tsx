import React, { useCallback, useState } from "react";
import ProductForm from "../ProductForm/ProductForm";
import { useLocation, useNavigate } from "react-router-dom";
import { Product } from "../../models/product";
import { useAppDispatch } from "../../hooks/useStore";
import { loadingActions } from "../../store/store";
import usePrivateHttp from "../../hooks/usePrivateHttp";
const EditProduct: React.FC<{}> = () => {
    const location = useLocation();
    const product = location.state.product;
    const dispatch = useAppDispatch();
    const privateHttp = usePrivateHttp();
    const navigate = useNavigate();
    const [errMess, setErrMess] = useState(false);
    // edit handler
    const editProductHandler = useCallback(async (product: Product) => {
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
            const response = await privateHttp.patch(
                "/api/product/edit-product",
                {
                    _id,
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
            navigate("/admin/product-detail" + `/${product._id}`, {
                state: { product },
            });
        } catch (error) {
            console.log(error);
            dispatch(loadingActions.setLoading(false));
            setErrMess(true);
        }
    }, []);
    return (
        <ProductForm
            errMess={errMess}
            product={product}
            handleProductFn={editProductHandler}
        />
    );
};

export default EditProduct;
