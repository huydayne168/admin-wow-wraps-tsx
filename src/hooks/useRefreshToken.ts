import http from "../utils/http";
import { useAppDispatch } from "./useStore";
import { authActions } from "../store/store";
import { log } from "console";
const useRefreshToken = () => {
    const dispatch = useAppDispatch();
    const refresh = async function () {
        try {
            console.log(process.env.REACT_APP_DOMAIN + "/refresh");

            const response = await http.get(
                process.env.REACT_APP_DOMAIN + "/refresh",
                {
                    withCredentials: true,
                }
            );
            console.log(response);

            dispatch(authActions.storeNewAccessToken(response.data));
        } catch (error) {
            console.log(error);
        }
    };

    return refresh;
};

export default useRefreshToken;
