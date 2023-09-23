import React, { useCallback, useEffect, useState } from "react";
import TagsAndCategoriesForm from "./TagsAndCategoriesForm";
import usePrivateHttp from "../../hooks/usePrivateHttp";
import { useSearchParams } from "react-router-dom";
const Categories: React.FC<{}> = () => {
    const privateHttp = usePrivateHttp();
    const [search, setSearch] = useSearchParams();
    const [categories, setCategories] = useState<string[]>([]);
    // get all categories:
    useEffect(() => {
        const getAllCategories = async () => {
            try {
                const res = await privateHttp.get(
                    "/api/category/get-categories"
                );
                setCategories(res.data);
                console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        getAllCategories();
    }, [privateHttp]);

    // get categories by search input:
    const getCategories = useCallback(
        async (text: string) => {
            if (text.length === 0) {
                search.delete("categoryQuery");
                setSearch(search, {
                    replace: true,
                });
            } else {
                search.set("categoryQuery", text);
                setSearch(search, {
                    replace: true,
                });
            }
            try {
                const res = await privateHttp.get(
                    "/api/category/get-categories",
                    {
                        params: {
                            categoryQuery: search.get("categoryQuery"),
                        },
                    }
                );
                setCategories(res.data);
            } catch (error) {
                console.log(error);
            }
        },
        [privateHttp, search, setSearch]
    );

    const deleteCategory = useCallback(
        async (category: any) => {
            try {
                const res = await privateHttp.delete(
                    "/api/category/delete-category",
                    {
                        params: {
                            category,
                        },
                    }
                );
                console.log(res);

                setCategories((pre: any) => {
                    return pre.filter(
                        (_category: any) => _category !== category
                    );
                });
            } catch (error) {
                console.log(error);
            }
        },
        [privateHttp]
    );

    const addCategory = useCallback(
        async (category: string) => {
            try {
                const res = await privateHttp.post(
                    "/api/category/add-category",
                    {
                        newCategory: category,
                    }
                );
                console.log(res);
                setCategories((pre: any) => {
                    return [...pre, category];
                });
            } catch (error) {
                console.log(error);
            }
        },
        [categories, privateHttp]
    );

    return (
        <TagsAndCategoriesForm
            type="Category"
            listItems={categories}
            deleteFn={deleteCategory}
            addFn={addCategory}
            searchFn={getCategories}
        />
    );
};

export default Categories;
