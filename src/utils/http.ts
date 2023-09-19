import axios from "axios";

const http = axios.create({
    baseURL: process.env.REACT_APP_ADMIN_API,
});
console.log(process.env.REACT_APP_ALL_API);

const privateHttp = axios.create({
    baseURL: process.env.REACT_APP_ALL_API,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});
export { privateHttp };

export default http;
