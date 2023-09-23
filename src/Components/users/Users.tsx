import styles from "./users.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleLeft,
    faAngleRight,
    faSearch,
    faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useState } from "react";
import usePrivateHttp from "../../hooks/usePrivateHttp";
import { useSearchParams } from "react-router-dom";
import { User } from "../../models/user";
import { BeatLoader } from "react-spinners";
import SearchUserInput from "./SearchUserInput";
const Users: React.FC<{}> = () => {
    const privateHttp = usePrivateHttp();
    // states:
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useSearchParams();
    const [users, setUsers] = useState<User[]>([]);
    const [isSearching, setIsSearching] = useState({
        _id: false,
        userName: false,
        email: false,
        phoneNumber: false,
        role: false,
    });

    const [sortRole, setSortRole] = useState("");
    // get users from database
    useEffect(() => {
        const getUsers = async () => {
            setIsLoading(true);
            try {
                setIsLoading(true);
                const res = await privateHttp.get("/user/get-users", {
                    params: search,
                });

                setIsLoading(false);
                setUsers((prev) => res.data);
            } catch (error) {
                console.log(error);
            }
        };

        getUsers();
    }, []);

    const searchHandler = useCallback(
        async (text: string, queryType: string) => {
            if (text.length === 0) {
                search.delete(queryType);
                setSearch(search, {
                    replace: true,
                });
            } else {
                search.set(queryType, text);
                setSearch(search, {
                    replace: true,
                });
            }

            try {
                setIsLoading(true);
                const res = await privateHttp.get("/user/get-users", {
                    params: search,
                });
                setIsLoading(false);
                setUsers((pre) => res.data);
            } catch (error) {
                console.log(error);
            }
        },
        []
    );

    const sortRoleHandler = useCallback(async (role: string) => {
        setSortRole(role);
        await searchHandler("", ""); // get all users back
        setUsers((pre) => {
            return pre.filter((user) => user.roles[role.toLowerCase()]);
        });
    }, []);

    return (
        <div className="tableWrapper">
            <div className={styles.heading}>
                <h2>Users List</h2>
                {isLoading && (
                    <div className={styles["loading"]}>
                        <BeatLoader />
                    </div>
                )}
            </div>

            <div className="tableContent">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col" style={{ width: "20%" }}>
                                <div className={styles["header-title"]}>
                                    ID
                                    <FontAwesomeIcon
                                        icon={faSearch}
                                        className={styles["sort-icon"]}
                                        onClick={() => {
                                            setIsSearching((pre) => {
                                                return {
                                                    ...pre,
                                                    _id: !pre._id,
                                                };
                                            });
                                        }}
                                    />
                                    {isSearching._id ? (
                                        <SearchUserInput
                                            type={"_id"}
                                            searchHandler={searchHandler}
                                        />
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </th>
                            <th scope="col" style={{ width: "15%" }}>
                                <div className={styles["header-title"]}>
                                    Username
                                    <FontAwesomeIcon
                                        icon={faSearch}
                                        className={styles["sort-icon"]}
                                        onClick={() => {
                                            setIsSearching((pre) => {
                                                return {
                                                    ...pre,
                                                    userName: !pre.userName,
                                                };
                                            });
                                        }}
                                    />
                                    {isSearching.userName ? (
                                        <SearchUserInput
                                            type={"userName"}
                                            searchHandler={searchHandler}
                                        />
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </th>
                            <th scope="col" style={{ width: "30%" }}>
                                <div className={styles["header-title"]}>
                                    Email
                                    <FontAwesomeIcon
                                        icon={faSearch}
                                        className={styles["sort-icon"]}
                                        onClick={() => {
                                            setIsSearching((pre) => {
                                                return {
                                                    ...pre,
                                                    email: !pre.email,
                                                };
                                            });
                                        }}
                                    />
                                    {isSearching.email ? (
                                        <SearchUserInput
                                            type={"email"}
                                            searchHandler={searchHandler}
                                        />
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </th>
                            <th scope="col" style={{ width: "15%" }}>
                                <div className={styles["header-title"]}>
                                    Phone Number
                                    <FontAwesomeIcon
                                        icon={faSearch}
                                        className={styles["sort-icon"]}
                                        onClick={() => {
                                            setIsSearching((pre) => {
                                                return {
                                                    ...pre,
                                                    phoneNumber:
                                                        !pre.phoneNumber,
                                                };
                                            });
                                        }}
                                    />
                                    {isSearching.phoneNumber ? (
                                        <SearchUserInput
                                            type={"phoneNumber"}
                                            searchHandler={searchHandler}
                                        />
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </th>
                            <th scope="col">
                                <div className={styles["header-title"]}>
                                    {sortRole.length !== 0 ? sortRole : "Role"}
                                    <FontAwesomeIcon
                                        icon={faSortDown}
                                        className={styles["sort-icon"]}
                                        onClick={() => {
                                            setIsSearching((pre) => {
                                                return {
                                                    ...pre,
                                                    role: !pre.role,
                                                };
                                            });
                                        }}
                                    />
                                    {isSearching.role ? (
                                        <ul
                                            className={`${styles["dropdown"]} dropdown-menu`}
                                        >
                                            <li>
                                                <a
                                                    className="dropdown-item"
                                                    href="#"
                                                    onClick={() => {
                                                        setSortRole(
                                                            (pre) => ""
                                                        );
                                                        searchHandler("", ""); // get all user back
                                                    }}
                                                >
                                                    All
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    className="dropdown-item"
                                                    href="#"
                                                    onClick={() => {
                                                        sortRoleHandler(
                                                            "Admin"
                                                        );
                                                    }}
                                                >
                                                    Admin
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    className="dropdown-item"
                                                    href="#"
                                                    onClick={() => {
                                                        sortRoleHandler("User");
                                                    }}
                                                >
                                                    User
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    className="dropdown-item"
                                                    href="#"
                                                    onClick={() => {
                                                        sortRoleHandler(
                                                            "Counselor"
                                                        );
                                                    }}
                                                >
                                                    Counselor
                                                </a>
                                            </li>
                                        </ul>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </th>
                            <th scope="col" className="text-center">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users[0] && !isLoading
                            ? users.map((user: User, index: number) => {
                                  return (
                                      <tr key={user._id}>
                                          <th scope="row">{user._id}</th>
                                          <td>{user.userName}</td>
                                          <td>{user.email}</td>
                                          <td>{user.phoneNumber}</td>
                                          <td>{Object.keys(user.roles)[0]}</td>

                                          <td className="text-center">
                                              <button
                                                  type="button"
                                                  className="btn btn-outline-success ms-1"
                                                  style={{ fontSize: "12px" }}
                                                  //   onClick={(e) =>
                                                  //       navigate(
                                                  //           "/admin/product-detail" +
                                                  //               `/${product._id}`,
                                                  //           {
                                                  //               state: {
                                                  //                   product,
                                                  //               },
                                                  //           }
                                                  //       )
                                                  //   }
                                              >
                                                  Detail
                                              </button>
                                          </td>
                                      </tr>
                                  );
                              })
                            : null}
                    </tbody>
                </table>

                <div className="tableDirection">
                    <span>1 - 8 of 8</span>
                    <FontAwesomeIcon icon={faAngleLeft} />
                    <FontAwesomeIcon icon={faAngleRight} />
                </div>
            </div>
        </div>
    );
};

export default Users;
