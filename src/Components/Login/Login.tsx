import React, { useCallback, useState } from "react";
import styles from "./login.module.css";
import http from "../../utils/http";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import { authActions } from "../../store/store";
function Login() {
    const navigate = useNavigate();
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [validate, setValidate] = useState({
        emailErr: "",
        passwordErr: "",
    });
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector((state: any) => state.authentication);

    const logInHandler = useCallback(() => {
        async function login() {
            try {
                const res = await http.post(
                    "/login",
                    {
                        email: emailValue,
                        password: passwordValue,
                    },
                    {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true,
                    }
                );
                const userInfo = res.data?.userInfo;
                const accessToken = res.data?.accessToken;
                dispatch(
                    authActions.storeUser({
                        _id: userInfo._id,
                        accessToken,
                    })
                );
                navigate("/admin/dash-board");
            } catch (error: any) {
                if (error instanceof Error) {
                    setValidate((pre) => {
                        return { ...pre, ...error.response?.data };
                    });
                }
            }
        }
        login();
    }, [emailValue, passwordValue, dispatch, navigate]);

    return (
        <div className={`${styles.logInWrapper} logInPage container`}>
            <div className={` card`} style={{ width: "26rem" }}>
                <div className="card-body">
                    <h5 className="card-title">Log In</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">
                        log in for admin
                    </h6>
                    <div className="form-floating mb-3">
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            placeholder="Your email"
                            value={emailValue}
                            onChange={(e) => {
                                setEmailValue(e.target.value);
                            }}
                        />
                        <label htmlFor="email">Your Email</label>
                    </div>
                    {validate.emailErr ? (
                        <p style={{ color: "red" }} className="mt-2">
                            {validate.emailErr}
                        </p>
                    ) : (
                        ""
                    )}

                    <div className="form-floating">
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Password"
                            value={passwordValue}
                            onChange={(e) => {
                                setPasswordValue(e.target.value);
                            }}
                        />
                        <label htmlFor="password">Password</label>
                    </div>
                    {validate.passwordErr ? (
                        <p style={{ color: "red" }} className="mt-2">
                            {validate.passwordErr}
                        </p>
                    ) : (
                        ""
                    )}
                    <p className="mt-2">
                        Sign up to be an admin?{" "}
                        <Link to={"/sign-up"}>Sign up</Link>
                    </p>
                    <button
                        type="button"
                        className={`${styles.logInBtn} btn btn-primary btn-lg`}
                        onClick={logInHandler}
                    >
                        Log in
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
