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
import { useNavigate, useSearchParams } from "react-router-dom";
import { User } from "../../models/user";
import { BeatLoader } from "react-spinners";
import SearchUserInput from "./SearchUserInput";
import type { PaginationProps } from "antd";
import Pagination from "antd/es/pagination";
import type { ColumnType, ColumnsType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import { Input, Table, Button, Dropdown, Tag, Popconfirm } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import {
    SearchOutlined,
    CaretDownOutlined,
    DeleteOutlined,
    InfoCircleOutlined,
} from "@ant-design/icons";
const Users: React.FC<{}> = () => {
    const privateHttp = usePrivateHttp();
    const navigate = useNavigate();
    // states:
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useSearchParams();
    const [users, setUsers] = useState<User[]>([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const [sortRole, setSortRole] = useState("");
    const [deletePopup, setDeletePopup] = useState(false);

    // by default set search params category=All and page = 1
    useEffect(() => {
        search.set("page", currentPage.toString());
        setSearch(search, {
            replace: true,
        });
    }, [currentPage]);

    // change page with ant pagination
    const onChangePagination: PaginationProps["onChange"] = useCallback(
        (page: number) => {
            setCurrentPage(page);
        },
        []
    );
    console.log(currentPage);

    // get users from database
    useEffect(() => {
        const getUsers = async () => {
            setIsLoading(true);
            try {
                const res = await privateHttp.get("/user/get-users", {
                    params: search || null,
                });

                setIsLoading(false);
                setUsers((prev) => res.data.users);
                setTotalUsers(res.data.totalUsers);
            } catch (error) {
                console.log(error);
            }
        };

        getUsers();
    }, [search]);

    // Column type:
    type DataIndex = keyof User;
    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<User> => ({
        filterDropdown: ({}) => (
            <div onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    placeholder={`Search ${dataIndex}`}
                    onChange={(e) => {
                        if (e.target.value === "") {
                            search.delete(`${dataIndex}Query`);
                        } else {
                            search.set(`${dataIndex}Query`, e.target.value);
                        }
                        setSearch(search, {
                            replace: true,
                        });
                    }}
                    style={{ display: "block" }}
                />
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined
                style={{ color: filtered ? "#1677ff" : undefined }}
            />
        ),
    });

    // columns data
    const columns: ColumnsType<User> = [
        {
            title: "ID",
            dataIndex: "_id",
            key: "_id",
            width: "28%",
            ...getColumnSearchProps("_id"),
        },
        {
            title: "User",
            dataIndex: "userName",
            key: "userName",
            width: "15%",
            ...getColumnSearchProps("userName"),
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            width: "25%",

            ...getColumnSearchProps("email"),
        },

        {
            title: "Phone Number",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
            width: "15%",
            ...getColumnSearchProps("phoneNumber"),
        },

        {
            title: "Role",
            dataIndex: "roleId",
            key: "roleId",
            width: "10%",
            render: (roleId) => {
                return (
                    <Tag
                        color={`${
                            (roleId.name === "admin" && "processing") ||
                            (roleId.name === "user" && "success")
                        }`}
                    >
                        {roleId.name}
                    </Tag>
                );
            },
            filterDropdown: ({}) => {
                return (
                    <div
                        style={{
                            padding: "4px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "4px",
                        }}
                        onKeyDown={(e) => e.stopPropagation()}
                    >
                        <div
                            className={styles["dropdown-item"]}
                            onClick={() => {
                                search.delete("sortRole");
                                setSearch(search, { replace: true });
                            }}
                        >
                            Default
                        </div>

                        <div
                            className={styles["dropdown-item"]}
                            onClick={() => {
                                search.set("sortRole", "admin");
                                setSearch(search, { replace: true });
                            }}
                        >
                            Admin
                        </div>

                        <div
                            className={styles["dropdown-item"]}
                            onClick={() => {
                                search.set("sortRole", "user");
                                setSearch(search, { replace: true });
                            }}
                        >
                            User
                        </div>
                    </div>
                );
            },
            filterIcon: () => {
                return <CaretDownOutlined />;
            },
        },

        {
            title: "Actions",
            width: "20%",
            dataIndex: "actions",
            key: "actions",
            render: (_, record) => {
                return (
                    <div style={{ display: "flex", gap: "4px" }}>
                        <Button
                            icon={<InfoCircleOutlined />}
                            onClick={() => {
                                // setOpenDetailPopup(true);
                                navigate("/admin/user-info/" + record._id, {
                                    state: {
                                        userInfo: record,
                                    },
                                });
                            }}
                        />
                        <Popconfirm
                            title="Delete"
                            description="Are you sure to delete this product?"
                            open={deletePopup}
                            onConfirm={() => {
                                // deleteHandler(record._id);
                            }}
                            okButtonProps={{ loading: isLoading }}
                            onCancel={(e) => {
                                setDeletePopup(false);
                            }}
                        >
                            <Button
                                onClick={(e) => {
                                    setDeletePopup(true);
                                }}
                                type="primary"
                                danger
                                icon={<DeleteOutlined />}
                            />
                        </Popconfirm>
                    </div>
                );
            },
        },
    ];

    return (
        <div className="tableWrapper">
            <div className={styles.heading}>
                <h2>Users List</h2>
            </div>

            <div className="tableContent">
                <Table
                    columns={columns}
                    dataSource={users}
                    pagination={false}
                    loading={isLoading}
                />

                <div className={styles["pagination"]}>
                    <Pagination
                        current={currentPage}
                        onChange={onChangePagination}
                        total={totalUsers}
                        pageSize={5}
                        style={{ margin: "auto" }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Users;
