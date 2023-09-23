import React, { useState, useEffect, useCallback } from "react";
import styles from "./tags-and-categories.module.css";
import TagsAndCategoriesForm from "./TagsAndCategoriesForm";
import usePrivateHttp from "../../hooks/usePrivateHttp";
import { useSearchParams } from "react-router-dom";
const Tags: React.FC<{}> = () => {
    const privateHttp = usePrivateHttp();
    const [search, setSearch] = useSearchParams();

    const [tags, setTags] = useState<any>([]);
    // get all categories:
    useEffect(() => {
        const getAllTags = async () => {
            try {
                const res = await privateHttp.get("/api/tag/get-tags");
                setTags(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        getAllTags();
    }, []);

    // get categories by search input:
    const getTags = useCallback(
        async (text: string) => {
            if (text.length === 0) {
                search.delete("tagQuery");
                setSearch(search, {
                    replace: true,
                });
            } else {
                search.set("tagQuery", text);
                setSearch(search, {
                    replace: true,
                });
            }
            try {
                const res = await privateHttp.get("/api/tag/get-tags", {
                    params: {
                        tagQuery: search.get("tagQuery"),
                    },
                });
                setTags(res.data);
            } catch (error) {
                console.log(error);
            }
        },
        [privateHttp, search, setSearch]
    );

    const deleteTag = useCallback(async (tag: any) => {
        try {
            const res = await privateHttp.delete("/api/tag/delete-tag", {
                params: {
                    tag: tag,
                },
            });
            console.log(res);

            setTags((pre: any) => {
                return pre.filter((_tag: any) => _tag !== tag);
            });
        } catch (error) {
            console.log(error);
        }
    }, []);

    const addTag = useCallback(async (tag: any) => {
        try {
            {
                const res = await privateHttp.post("/api/tag/add-tag", {
                    newTag: tag,
                });
                console.log(res);

                setTags((pre: any) => {
                    return [...pre, tag];
                });
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <TagsAndCategoriesForm
            type="Tag"
            listItems={tags}
            deleteFn={deleteTag}
            addFn={addTag}
            searchFn={getTags}
        />
    );
};

export default Tags;
