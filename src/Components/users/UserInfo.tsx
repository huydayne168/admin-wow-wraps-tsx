import React, { Fragment } from "react";
import styles from "./user-info.module.css";
import { Descriptions } from "antd";
import type { DescriptionsProps } from "antd";
import { User } from "../../models/user";
import { useLocation } from "react-router-dom";
import DashboardTable from "../Dashboard/DashboardTable";

const UserInfo: React.FC = () => {
    const location = useLocation();
    const userInfo: User = location.state.userInfo;
    console.log(userInfo);

    const items: DescriptionsProps["items"] = [
        {
            key: "1",
            label: "Id",
            children: userInfo._id,
        },
        {
            key: "1",
            label: "UserName",
            children: userInfo.userName,
        },
        {
            key: "4",
            label: "Role",
            children: userInfo.roleId.name,
        },
        {
            key: "2",
            label: "Telephone",
            children: userInfo.phoneNumber,
        },
        {
            key: "3",
            label: "Email",
            children: userInfo.email,
        },
    ];

    return (
        <Fragment>
            <Descriptions
                title="User Info"
                items={items}
                className={styles["user-info"]}
            />
            <DashboardTable checkouts={userInfo.checkout} />
        </Fragment>
    );
};

export default UserInfo;
