import http from "../utils/http";
import { useAppDispatch } from "./useStore";
import { authActions } from "../store/store";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
const useRefreshToken = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const refresh = async function () {
        try {
            const response = await http.get(
                process.env.REACT_APP_SERVER_DOMAIN + "/refresh",
                {
                    withCredentials: true,
                }
            );

            dispatch(
                authActions.storeNewAccessToken(response.data.accessToken)
            );
            return response.data.accessToken;
        } catch (error) {
            console.log(error);
            if (error instanceof AxiosError) {
                if (error.response?.status === 403 || 401) {
                    navigate("/");
                } else if (error.request) {
                    navigate("/");
                }
            }
        }
    };

    return refresh;
};

export default useRefreshToken;
