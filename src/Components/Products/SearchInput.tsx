import React, { useCallback, useState } from "react";
import styles from "./search-input.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import { loadingActions, productsAction } from "../../store/store";
import { useSearchParams } from "react-router-dom";
import http from "../../utils/http";
const SearchInput: React.FC<{
    searchType: string;
    obj: any;
}> = ({ searchType, obj }) => {
    const products = useAppSelector((state) => state.products);
    const dispatch = useAppDispatch();
    const [search, setSearch] = useSearchParams();
    const queryType = searchType + "Query";

    const searchHandler = useCallback(
        async (e: React.ChangeEvent<HTMLInputElement>) => {
            const text = e.target.value;
            if (text.length === 0) {
                search.delete(queryType);
                setSearch(search);
            } else {
                search.set(queryType, text);
                setSearch(search);
            }
            dispatch(loadingActions.setLoading(true));
            const res = await http.get(
                process.env.REACT_APP_SERVER_DOMAIN +
                    "/api/product/get-products",
                {
                    params: search,
                }
            );
            dispatch(productsAction.setProducts(res.data));
            dispatch(loadingActions.setLoading(false));
        },
        [search, searchType, setSearch]
    );

    return (
        <div className={styles["search-input"]}>
            <form action="#">
                <div className="input-group input-group-sm">
                    <span
                        className="input-group-text"
                        id="inputGroup-sizing-sm"
                    >
                        <FontAwesomeIcon icon={faSearch} />
                    </span>
                    <input
                        type="text"
                        className="form-control"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-sm"
                        defaultValue={search.get(queryType) || undefined}
                        onChange={searchHandler}
                    />
                </div>
            </form>
        </div>
    );
};

export default SearchInput;
