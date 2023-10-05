import { useState, useCallback } from "react";
import styles from "./add-voucher.module.css";
import { DatePicker, Form, Input, InputNumber, Button, Alert } from "antd";
import type { DatePickerProps, RangePickerProps } from "antd/es/date-picker";
import dayjs, { Dayjs } from "dayjs";
import { useAppDispatch } from "../../hooks/useStore";
import http from "../../utils/http";

import { useNavigate } from "react-router-dom";
import usePrivateHttp from "../../hooks/usePrivateHttp";
import { AxiosError } from "axios";
const { RangePicker } = DatePicker;
const AddVoucher: React.FC<{}> = () => {
    const navigate = useNavigate();
    const privateHttp = usePrivateHttp();
    const [errMess, setErrMess] = useState(false);
    const [duplicateErrMess, setDuplicateErrMess] = useState(false);
    const [formData, setFormData] = useState({
        code: "",
        discountPercent: null,
        quantity: null,
        end: "",
    });

    // discount change handler:
    const codeHandler = useCallback((value: any) => {
        setFormData((pre: any) => {
            return {
                ...pre,
                code: value,
            };
        });
    }, []);

    // discount change handler:
    const quantityHandler = useCallback((value: any) => {
        setFormData((pre: any) => {
            return {
                ...pre,
                quantity: Number(value),
            };
        });
    }, []);

    // discount change handler:
    const discountPercentHandler = useCallback((value: any) => {
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
                    end: dateString,
                };
            });
        }
    };

    // send flash sale data to server:
    const submitHandler = useCallback(async () => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        try {
            setDuplicateErrMess(false);
            const res = await privateHttp.post("/api/voucher/add-voucher", {
                code: formData.code,
                discountPercent: formData.discountPercent,
                quantity: formData.quantity,
                end: formData.end,
            });
            navigate("/admin/vouchers");
            console.log(res);
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 422) {
                    setErrMess(true);
                } else if (error.response?.status === 409) {
                    setDuplicateErrMess(true);
                }
            }
            console.log(error);
        }
    }, [formData]);

    return (
        <div className={styles["add-voucher"]}>
            <div className={styles.heading}>Add New Voucher</div>
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
                    {duplicateErrMess && (
                        <Alert
                            type="error"
                            style={{ color: "red" }}
                            message="Duplicate voucher code!"
                        />
                    )}
                    <Form.Item label={"Code"}>
                        <Input
                            size="large"
                            placeholder="Enter Voucher Code"
                            onChange={(e) => {
                                codeHandler(e.target.value);
                            }}
                            required
                        />
                    </Form.Item>

                    <Form.Item label={"Discount %"}>
                        <InputNumber
                            onChange={(e) => {
                                discountPercentHandler(e);
                            }}
                            min={0}
                            required
                        />
                    </Form.Item>
                    <Form.Item label={"Quantity"}>
                        <InputNumber
                            onChange={(e) => {
                                quantityHandler(e);
                            }}
                            min={0}
                            required
                        />
                    </Form.Item>

                    <Form.Item label="Time End">
                        <DatePicker
                            showTime={{ format: "HH:mm" }}
                            onChange={timeHandler}
                        />
                    </Form.Item>

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

export default AddVoucher;
