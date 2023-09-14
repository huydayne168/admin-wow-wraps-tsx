import React, { useRef, useState } from "react";
import styles from "./login.module.css";
import http from "../../utils/http";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
function Login() {
    const navigate = useNavigate();
    const userNameRef = useRef();
    const passwordRef = useRef();
    const [validate, setValidate] = useState({ state: true, message: "" });
    // function logInHandler(e) {
    //     e.preventDefault();
    //     http.get("/login-admin", {
    //         params: {
    //             userName: userNameRef.current.value,
    //             password: passwordRef.current.value,
    //         },
    //     })
    //         .then((res) => {
    //             const data = res.data;
    //             if (data.status === 401) {
    //                 setValidate({ state: false, message: data.message });
    //             } else {
    //                 navigate("/admin/dashboard");
    //                 setValidate({ state: true, message: data.message });
    //                 localStorage.setItem(
    //                     "admin",
    //                     JSON.stringify({
    //                         userName: userNameRef.current.vale,
    //                         password: passwordRef.current.value,
    //                     })
    //                 );
    //             }
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }
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
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="Your username"
                            // ref={userNameRef}
                        />
                        <label htmlFor="floatingInput">User Name</label>
                    </div>

                    <div className="form-floating">
                        <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Password"
                            // ref={passwordRef}
                        />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    {!validate.state ? (
                        <p style={{ color: "red" }}>{validate.message}</p>
                    ) : (
                        ""
                    )}
                    <p>
                        Sign up to be an admin?{" "}
                        <Link to={"/sign-up"}>Sign up</Link>
                    </p>
                    <button
                        type="button"
                        className={`${styles.logInBtn} btn btn-primary btn-lg`}
                        // onClick={logInHandler}
                    >
                        Log in
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
