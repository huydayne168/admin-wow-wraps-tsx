import axios from "axios";

const http = axios.create({
    baseURL: process.env.REACT_APP_ADMIN_API,
});

const privateHttp = axios.create({
    baseURL: process.env.REACT_APP_SERVER_DOMAIN,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});
export { privateHttp };

export default http;
