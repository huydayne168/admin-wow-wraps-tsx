import axios from "axios";

const http = axios.create({
    baseURL: "http://localhost:5000/admin",
});

export default http;
