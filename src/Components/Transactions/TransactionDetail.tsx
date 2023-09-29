import { Modal, Table } from "antd";
import type { ColumnType, ColumnsType } from "antd/es/table";
import { Tag } from "antd";
import { Checkout } from "../../models/checkout";
import { Product } from "../../models/product";

const TransactionDetail: React.FC<{
    checkout: any;
    open: boolean;
    closePopup: Function;
}> = ({ checkout, open, closePopup }) => {
    type Products = [{ product: Product; quantity: number }];
    const columns: ColumnsType<Checkout> = [
        {
            title: "Time",
            dataIndex: "date",
            key: "date",
            width: "20%",
        },
        {
            title: "User",
            dataIndex: "user",
            key: "user",
            width: "10%",
            render: (user) => {
                return <div>{user.userName}</div>;
            },
        },
        {
            title: "Products",
            dataIndex: "products",
            key: "products",
            width: "20%",

            render: (products: Products) => {
                return (
                    <span
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "4px",
                        }}
                    >
                        {products.map((product) => {
                            return (
                                <div
                                    key={product.product._id}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "4px",
                                    }}
                                >
                                    <img
                                        src={product.product.image}
                                        alt={product.product._id}
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                            objectFit: "cover",
                                        }}
                                    />
                                    <div>
                                        {product.product.name} x{" "}
                                        {product.quantity}
                                    </div>
                                </div>
                            );
                        })}
                    </span>
                );
            },
        },

        {
            title: "Phone Number",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
            width: "10%",
        },

        {
            title: "Address",
            dataIndex: "address",
            key: "address",
            width: "20%",
        },

        {
            title: "Total",
            dataIndex: "total",
            key: "total",
            width: "5%",
            render: (total) => {
                return <span>${total}</span>;
            },
        },

        {
            title: "Payment Method",
            dataIndex: "paymentMethod",
            key: "paymentMethod",
            width: "15%",
        },

        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            width: "20%",
            render: (status) => {
                return (
                    <Tag
                        color={`${
                            (status === "WAITING FOR PAYING" && "processing") ||
                            (status === "PAID" && "success") ||
                            (status === "CANCELED" && "error")
                        }`}
                    >
                        {status}
                    </Tag>
                );
            },
        },
    ];
    return (
        <Modal
            title={`Check out id : ${checkout[0]?._id}`}
            centered
            width={1500}
            open={open}
            footer={null}
            onCancel={(e) => closePopup()}
        >
            <Table columns={columns} dataSource={checkout} pagination={false} />
        </Modal>
    );
};

export default TransactionDetail;
