import http from "../utils/http";
import { useAppDispatch } from "./useStore";
import { authActions } from "../store/store";
const useRefreshToken = () => {
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
        }
    };

    return refresh;
};

export default useRefreshToken;
