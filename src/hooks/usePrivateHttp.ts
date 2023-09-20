import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { privateHttp } from "../utils/http";
import { useAppSelector } from "./useStore";

const usePrivateHttp = () => {
    const currentUser = useAppSelector((state) => state.authentication);
    const refresh = useRefreshToken();

    useEffect(() => {
        const requestIntercept = privateHttp.interceptors.request.use(
            (config) => {
                if (!config.headers.Authorization && currentUser.accessToken) {
                    console.log(currentUser.accessToken);
                    config.headers.Authorization = `Bearer ${currentUser.accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseIntercept = privateHttp.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;
                console.log(prevRequest);
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    console.log("okee");

                    const newAccessToken = await refresh();
                    console.log(newAccessToken);
                    prevRequest.headers[
                        "Authorization"
                    ] = `Bearer ${newAccessToken}`;
                    return privateHttp(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            privateHttp.interceptors.request.eject(requestIntercept);
            privateHttp.interceptors.response.eject(responseIntercept);
        };
    }, [currentUser, refresh]);

    return privateHttp;
};

export default usePrivateHttp; // this hook is used to fetch protected route
