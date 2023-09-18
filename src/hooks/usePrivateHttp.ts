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
                if (!config.headers.Authorization) {
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
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
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
};

export default usePrivateHttp; // this hook is used to fetch protected route
