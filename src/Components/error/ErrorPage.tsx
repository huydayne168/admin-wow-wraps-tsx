import React from "react";
import { Button, Result } from "antd";
import { useNavigate, useRouteError } from "react-router-dom";

const ErrorPage: React.FC<{}> = () => {
    const error = useRouteError();
    const navigate = useNavigate();
    console.log(error);

    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={
                <Button
                    type="primary"
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    Go Back
                </Button>
            }
        />
    );
};

export default ErrorPage;
