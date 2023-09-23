import styles from "./searchUserInput.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { ChangeEventHandler } from "react";
import { useSearchParams } from "react-router-dom";
const SearchUserInput: React.FC<{
    type: string; // this bases on what type admin want to search
    searchHandler: any /*this function with pass the search query to the Users comp*/;
}> = ({ type, searchHandler }) => {
    const [search, setSearch] = useSearchParams();
    const queryType = `${type}Query`;

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
                        onChange={(e) => {
                            searchHandler(e.target.value, queryType);
                        }}
                    />
                </div>
            </form>
        </div>
    );
};

export default SearchUserInput;
