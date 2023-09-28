import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { privateHttp } from "../utils/http";
import { useAppDispatch, useAppSelector } from "./useStore";
import { authActions } from "../store/store";

const usePrivateHttp = () => {
    const currentUser = useAppSelector((state) => state.authentication);
    const dispatch = useAppDispatch();
    const refresh = useRefreshToken();

    useEffect(() => {
        const requestIntercept = privateHttp.interceptors.request.use(
            (config) => {
                if (!config.headers.Authorization && currentUser.accessToken) {
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
                    console.log(newAccessToken);

                    prevRequest.headers[
                        "Authorization"
                    ] = `Bearer ${newAccessToken}`;
                    dispatch(authActions.storeNewAccessToken(newAccessToken));
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
