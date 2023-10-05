import { useState, useEffect, useCallback, ChangeEventHandler } from "react";
import styles from "./add-flashSale.module.css";
import {
    DatePicker,
    Form,
    Input,
    InputNumber,
    List,
    Avatar,
    Checkbox,
    Space,
    Button,
    Alert,
} from "antd";
import type { DatePickerProps, RangePickerProps } from "antd/es/date-picker";
import dayjs, { Dayjs } from "dayjs";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import http from "../../utils/http";
import type { PaginationProps } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import Pagination from "antd/es/pagination";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { productsAction } from "../../store/store";
import usePrivateHttp from "../../hooks/usePrivateHttp";
import { Product } from "../../models/product";
import { FlashSale } from "../../models/flashsale";
const { RangePicker } = DatePicker;
const AddFlashSale: React.FC<{}> = () => {
    const products = useAppSelector((state) => state.products);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const privateHttp = usePrivateHttp();
    const [search, setSearch] = useSearchParams();
    const [totalProducts, setTotalProducts] = useState(1);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [checkAll, setCheckAll] = useState(true);
    const [errMess, setErrMess] = useState(false);
    const [chooseProductErr, setChooseProductErr] = useState(false);
    const [formData, setFormData] = useState<FlashSale>({
        _id: "",
        name: "",
        discountPercent: 0,
        start: "",
        end: "",
        products: [],
        isActive: true,
        isDelete: false,
    });

    // get products from database:
    useEffect(() => {
        const getAllProducts = async () => {
            try {
                const res = await http.get(
                    process.env.REACT_APP_SERVER_DOMAIN +
                        "/api/product/get-products",
                    {
                        params: {
                            sortFlashSale: "false",
                        },
                    }
                );
                console.log(res.data);

                dispatch(productsAction.setProducts(res.data.products));
                if (!res.data.products[0]) {
                    setChooseProductErr(true);
                }
                setFormData((pre) => {
                    return {
                        ...pre,
                        products: res.data.products,
                    };
                });
            } catch (error) {
                console.log(error);
            }
        };
        getAllProducts();
    }, [search]);

    // discount change handler:
    const nameHandler = useCallback((value: any) => {
        setFormData((pre: any) => {
            return {
                ...pre,
                name: value,
            };
        });
    }, []);

    // discount change handler:
    const discountHandler = useCallback((value: any) => {
        setFormData((pre: any) => {
            return {
                ...pre,
                discountPercent: Number(value),
            };
        });
    }, []);

    // set time start and time end handler:
    const timeHandler = (
        value: DatePickerProps["value"] | RangePickerProps["value"],
        dateString: [string, string] | string
    ) => {
        if (value) {
            setFormData((pre: any) => {
                return {
                    ...pre,
                    start: dateString[0],
                    end: dateString[1],
                };
            });
        }
    };

    // set check all product:
    useEffect(() => {
        if (checkAll) {
            setFormData((pre: any) => {
                return {
                    ...pre,
                    products: products.map((product) => product._id),
                };
            });
        } else {
            setFormData((pre: any) => {
                return {
                    ...pre,
                    products: [],
                };
            });
        }
    }, [checkAll]);

    // check to choose product
    const checkProductHandler = (e: CheckboxChangeEvent, productId: any) => {
        if (
            (e.target.checked && formData.products.length === 0) ||
            formData.products.some((item) => item !== productId)
        ) {
            setFormData((pre: any) => {
                return {
                    ...pre,
                    products: [...pre.products, productId],
                };
            });
        } else if (
            !e.target.checked &&
            formData.products.some((item) => item === productId)
        ) {
            setFormData((pre: any) => {
                return {
                    ...pre,
                    products: pre.products.filter(
                        (item: any) => item !== productId
                    ),
                };
            });
        }
    };
    console.log(formData.start, formData.end);

    // send flash sale data to server:
    const submitHandler = useCallback(async () => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        try {
            const res = await privateHttp.post("/api/fs/add-fs", {
                name: formData.name,
                discountPercent: formData.discountPercent,
                start: formData.start,
                end: formData.end,
                products: formData.products,
            });

            console.log(res);
            navigate("/admin/flash-sales");
        } catch (error) {
            setErrMess(true);
            console.log(error);
        }
    }, [formData]);

    return (
        <div className={styles["add-flashSale"]}>
            <div className={styles.heading}>Add New Flash Sale</div>
            {errMess && (
                <Alert
                    type="error"
                    style={{ color: "red" }}
                    message="Please fill all inputs!"
                />
            )}
            <div className={styles["add-form"]}>
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="vertical"
                    style={{ maxWidth: "100%" }}
                >
                    <Form.Item label={"Name"}>
                        <Input
                            size="large"
                            placeholder="Enter Flash Sale Name"
                            onChange={(e) => {
                                nameHandler(e.target.value);
                            }}
                            required
                        />
                    </Form.Item>
                    <Form.Item label={"Discount %"}>
                        <InputNumber
                            onChange={(e) => {
                                discountHandler(e);
                            }}
                            min={0}
                            required
                        />
                    </Form.Item>

                    <Form.Item label="Time">
                        <RangePicker
                            showTime={{ format: "HH:mm" }}
                            format="YYYY-MM-DD HH:mm"
                            onChange={timeHandler}
                            aria-required
                        />
                    </Form.Item>

                    <Form.Item label="Choose Products">
                        <Space>
                            <span>All</span>
                            <Checkbox
                                checked={checkAll}
                                onChange={(e) => {
                                    setCheckAll(!checkAll);
                                }}
                            />
                        </Space>
                        <List
                            dataSource={products}
                            style={{
                                width: "100%",
                                marginTop: "32px",
                            }}
                            renderItem={(item, index) => (
                                <Space>
                                    <List.Item
                                        style={{
                                            margin: "0 4px",
                                            width: "200px",
                                            padding: "12px",
                                            borderRadius: "8px",
                                            cursor: "pointer",
                                            marginBottom: "8px",
                                            backgroundColor: "#eee",
                                        }}
                                        className={styles["products-list-item"]}
                                    >
                                        <List.Item.Meta
                                            style={{
                                                width: "100%",
                                            }}
                                            avatar={<Avatar src={item.image} />}
                                            title={
                                                <span
                                                    className={
                                                        styles["product-name"]
                                                    }
                                                    onClick={() => {
                                                        navigate(
                                                            `/admin/product-detail/${item._id}`,
                                                            {
                                                                state: {
                                                                    product:
                                                                        item,
                                                                },
                                                            }
                                                        );
                                                    }}
                                                >
                                                    {item.name}
                                                </span>
                                            }
                                        />
                                        <Checkbox
                                            indeterminate={checkAll}
                                            onChange={(e) => {
                                                checkProductHandler(
                                                    e,
                                                    item._id
                                                );
                                            }}
                                        />
                                    </List.Item>
                                </Space>
                            )}
                        />
                    </Form.Item>
                    {!formData.products[0] && chooseProductErr && (
                        <Alert
                            type="error"
                            message="All products are now on a flash sale"
                            style={{ color: "red", marginBottom: "12px" }}
                        />
                    )}
                    <Form.Item>
                        <Button
                            type="primary"
                            size="large"
                            onClick={submitHandler}
                        >
                            Add
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default AddFlashSale;
