import React, { useRef, useState } from "react";
import styles from "./sign-up.module.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const SignUp: React.FC<{}> = () => {
    const navigate = useNavigate();
    const userNameRef = useRef();
    const passwordRef = useRef();
    const [validate, setValidate] = useState({ state: true, message: "" });
    return (
        <div className={`${styles.logInWrapper} logInPage container`}>
            <div className={` card`} style={{ width: "26rem" }}>
                <div className="card-body">
                    <h5 className="card-title">Sign up</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">
                        Create an account to be an admin
                    </h6>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            name="userName"
                            placeholder="Your username"
                            // ref={userNameRef}
                        />
                        <label htmlFor="floatingInput">User Name</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            name="password"
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
                    <div className="form-floating mb-3">
                        <input
                            type="email"
                            className="form-control"
                            id="floatingEmail"
                            name="email"
                            placeholder="Email"
                            // ref={passwordRef}
                        />
                        <label htmlFor="floatingEmail">Email</label>
                    </div>
                    {!validate.state ? (
                        <p style={{ color: "red" }}>{validate.message}</p>
                    ) : (
                        ""
                    )}

                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingPhone"
                            name="phoneNumber"
                            placeholder="Phone Number"
                            // ref={passwordRef}
                        />
                        <label htmlFor="floatingPhone">Phone Number</label>
                    </div>
                    {!validate.state ? (
                        <p style={{ color: "red" }}>{validate.message}</p>
                    ) : (
                        ""
                    )}

                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingSecretKey"
                            name="secretKey"
                            placeholder="Secret Key"
                            // ref={passwordRef}
                        />
                        <label htmlFor="floatingSecretKey">Secret Key</label>
                    </div>
                    {!validate.state ? (
                        <p style={{ color: "red" }}>{validate.message}</p>
                    ) : (
                        ""
                    )}
                    <p>
                        Already have an admin account?{" "}
                        <Link to={"/"}>Log in</Link>
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
};

export default SignUp;
