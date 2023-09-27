import React, { useCallback, useMemo, useState } from "react";
import styles from "./sign-up.module.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import http from "../../utils/http";
const SignUp: React.FC<{}> = () => {
    const [signUpState, setSignUpState] = useState("SIGN_UP_FORM"); // SIGN_UP_FORM so render sign up form, VERIFY_CODE_FORM so render the verify code form
    const navigate = useNavigate();

    const [validate, setValidate] = useState({
        userNameErr: "",
        passwordErr: "",
        emailErr: "",
        phoneNumberErr: "",
        secretKeyErr: "",
        verifyCodeErr: "",
    });

    const emailRegex = useMemo(() => {
        return /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm;
    }, []);

    const phoneNumberRegex = useMemo(() => {
        return /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
    }, []);

    const [userNameValue, setUserNameValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [emailValue, setEmailValue] = useState("");
    const [phoneNumberValue, setPhoneNumberValue] = useState("");
    const [secretKeyValue, setSecretKeyValue] = useState("");
    const [verifyCode, setVerifyCode] = useState<string>("");

    const userName = useMemo(() => userNameValue, [userNameValue]);
    const password = useMemo(() => passwordValue, [passwordValue]);
    const email = useMemo(() => emailValue, [emailValue]);
    const phoneNumber = useMemo(() => phoneNumberValue, [phoneNumberValue]);
    const secretKey = useMemo(() => secretKeyValue, [secretKeyValue]);

    type SignUpFn = () => void;
    const signUpHandler: SignUpFn = useCallback(async () => {
        try {
            const res = await http.post("/sign-up", {
                userName,
                password,
                email,
                phoneNumber,
                secretKey,
                verifyCode,
            });
            if (!verifyCode && res.status !== 400 && res.status !== 500) {
                // if valid inputs and can send email (detail in backend) so I change this component to the verify code form:
                setSignUpState("VERIFY_CODE_FORM");
            } else {
                // after succeed verify code => go to login form to login:
                navigate("/");
            }
        } catch (error: any) {
            console.log(error);
            if (error instanceof Error) {
                setValidate((pre) => {
                    return { ...pre, ...error.response?.data };
                });
            }
        }
    }, [
        userName,
        password,
        email,
        phoneNumber,
        secretKey,
        verifyCode,
        navigate,
    ]);

    const validateInputHandler = useCallback(
        (inputName: string, errorMess: string) => {
            setValidate((pre) => {
                return { ...pre, [`${inputName}Err`]: errorMess };
            });
        },
        []
    );

    return signUpState === "SIGN_UP_FORM" ? (
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
                            value={userNameValue}
                            onChange={(e) => {
                                setUserNameValue(e.target.value);
                                // validate username
                                if (e.target.value.length === 0) {
                                    validateInputHandler(
                                        e.target.name,
                                        "Please enter your username!"
                                    );
                                } else {
                                    validateInputHandler(e.target.name, "");
                                }
                            }}
                        />
                        <label htmlFor="floatingInput">User Name</label>
                        {validate.userNameErr ? (
                            <p className="mt-2" style={{ color: "red" }}>
                                * {validate.userNameErr}
                            </p>
                        ) : (
                            ""
                        )}
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            name="password"
                            placeholder="Password"
                            value={passwordValue}
                            onChange={(e) => {
                                setPasswordValue(e.target.value);
                                if (e.target.value.length < 8) {
                                    validateInputHandler(
                                        e.target.name,
                                        "Password must be more than or equal 8 characters"
                                    );
                                } else {
                                    validateInputHandler(e.target.name, "");
                                }
                            }}
                        />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    {validate.passwordErr ? (
                        <p style={{ color: "red" }} className="mt-2">
                            {validate.passwordErr}
                        </p>
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
                            value={emailValue}
                            onChange={(e) => {
                                setEmailValue(e.target.value);
                                if (
                                    e.target.value.length === 0 ||
                                    !e.target.value.match(emailRegex)
                                ) {
                                    validateInputHandler(
                                        e.target.name,
                                        "This email is not valid!"
                                    );
                                } else {
                                    validateInputHandler(e.target.name, "");
                                }
                            }}
                        />
                        <label htmlFor="floatingEmail">Email</label>
                    </div>
                    {validate.emailErr ? (
                        <p style={{ color: "red" }} className="mt-2">
                            {validate.emailErr}
                        </p>
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
                            value={phoneNumberValue}
                            onChange={(e) => {
                                setPhoneNumberValue(e.target.value);
                                if (
                                    e.target.value.length < 10 ||
                                    !e.target.value.match(phoneNumberRegex)
                                ) {
                                    validateInputHandler(
                                        e.target.name,
                                        "This phone number is not valid!"
                                    );
                                } else {
                                    validateInputHandler(e.target.name, "");
                                }
                            }}
                        />
                        <label htmlFor="floatingPhone">Phone Number</label>
                    </div>
                    {validate.phoneNumberErr ? (
                        <p style={{ color: "red" }} className="mt-2">
                            {validate.phoneNumberErr}
                        </p>
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
                            value={secretKeyValue}
                            onChange={(e) => {
                                setSecretKeyValue(e.target.value);

                                if (e.target.value.length === 0) {
                                    validateInputHandler(
                                        e.target.name,
                                        "Please enter the secret key!"
                                    );
                                } else {
                                    validateInputHandler(e.target.name, "");
                                }
                            }}
                        />
                        <label htmlFor="floatingSecretKey">Secret Key</label>
                    </div>
                    {validate.secretKeyErr ? (
                        <p style={{ color: "red" }} className="mt-2">
                            {validate.secretKeyErr}
                        </p>
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
                        onClick={(e) => {
                            e.preventDefault();
                            signUpHandler();
                        }}
                    >
                        Sign up
                    </button>
                </div>
            </div>
        </div>
    ) : (
        <div className={`${styles.logInWrapper} logInPage container`}>
            <div className={`card`} style={{ width: "26rem" }}>
                <div className="card-body">
                    <h5 className="card-title">Verify Your Code</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">
                        Enter your verify code to register your admin account:
                    </h6>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="verifyCode"
                            name="code"
                            placeholder="code"
                            value={verifyCode}
                            onChange={(e) => {
                                setVerifyCode(e.target.value);

                                if (e.target.value.length === 0) {
                                    validateInputHandler(
                                        e.target.name,
                                        "Please enter your verify code!"
                                    );
                                } else {
                                    validateInputHandler(e.target.name, "");
                                }
                            }}
                        />
                        <label htmlFor="floatingInput">Code</label>
                        {validate.verifyCodeErr ? (
                            <p style={{ color: "red" }} className="mt-2">
                                {validate.verifyCodeErr}
                            </p>
                        ) : (
                            ""
                        )}
                    </div>
                    <button
                        type="button"
                        className={`${styles.logInBtn} btn btn-primary btn-lg`}
                        onClick={(e) => {
                            e.preventDefault();
                            signUpHandler();
                        }}
                    >
                        Sign up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
