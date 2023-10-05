import React, { Fragment, useState, useEffect } from "react";
import styles from "./user-info.module.css";
import { Descriptions } from "antd";
import type { DescriptionsProps } from "antd";
import { User } from "../../models/user";
import { useLocation } from "react-router-dom";
import DashboardTable from "../Dashboard/DashboardTable";
import usePrivateHttp from "../../hooks/usePrivateHttp";
import { Checkout } from "../../models/checkout";
import http from "../../utils/http";
const UserInfo: React.FC = () => {
    const location = useLocation();
    const userInfo: User = location.state.userInfo;
    const [userCheckouts, setUserCheckouts] = useState<Checkout[]>([]);

    // get user checkout:
    useEffect(() => {
        const getUserCheckouts = async () => {
            try {
                const res = await http.get(
                    process.env.REACT_APP_SERVER_DOMAIN + "/user/get-user",
                    {
                        params: {
                            _id: userInfo._id,
                        },
                    }
                );
                setUserCheckouts(res.data.userCheckouts);
            } catch (error) {
                console.log(error);
            }
        };
        getUserCheckouts();
    }, [userInfo._id]);
    console.log(userCheckouts);

    const items: DescriptionsProps["items"] = [
        {
            key: "_id",
            label: "Id",
            children: userInfo._id,
        },
        {
            key: "userName",
            label: "UserName",
            children: userInfo.userName,
        },
        {
            key: "role",
            label: "Role",
            children: userInfo.roleId.name,
        },
        {
            key: "telephone",
            label: "Telephone",
            children: userInfo.phoneNumber,
        },
        {
            key: "email",
            label: "Email",
            children: userInfo.email,
        },
    ];
    console.log(userCheckouts);

    return (
        <Fragment>
            <Descriptions
                title="User Info"
                items={items}
                className={styles["user-info"]}
            />
            <DashboardTable checkouts={userCheckouts} />
        </Fragment>
    );
};

export default UserInfo;
