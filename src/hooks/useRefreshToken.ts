import http from "../utils/http";
import { useAppDispatch } from "./useStore";
import { authActions } from "../store/store";
const dispatch = useAppDispatch();
const useRefreshToken = () => {
    const refresh = async function () {
        try {
            const response = await http.get("/refresh", {
                withCredentials: true,
            });
            dispatch(authActions.storeNewAccessToken(response.data));
        } catch (error) {
            console.log(error);
        }
    };

    return refresh;
};

export default useRefreshToken;
