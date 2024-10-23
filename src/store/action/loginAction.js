import * as actionTypes from "../actionType/loginActionType";
import axios from "axios";
import { showToast } from "../../component/toastMessage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logoutUser } from "./logoutAction";

export const loginUser = (credentials, navigation) => async (dispatch) => {
	const handleBackToLoging = () => {
		navigation.navigate("Login");
	};
	try {
		dispatch({ type: actionTypes.LOGIN_REQUEST });

		const res = await axios.post(
			`${process.env.EXPO_PUBLIC_MOBILE_APP_BASE_URL}/FintechUsers/login`,
			credentials
		);

		const userData = res.data;

		// Save JWT to AsyncStorage
		const jwtToken = userData.token; // Assuming the JWT token is returned as "token"
		await AsyncStorage.setItem("jwtToken", jwtToken);

		dispatch({
			type: actionTypes.LOGIN_SUCCESS,
			payload: userData,
		});

		// Auto logout after 1 hour (3600 seconds)
		setTimeout(() => {
			dispatch(logoutUser());
			handleBackToLoging();
		}, 3600 * 1000); // 1 hour in milliseconds

		// Show success toast
		showToast("success", userData.message || "Login successfully.");

		return res;
	} catch (err) {
		const errorMessage =
			err.response?.data?.message ||
			`Network Error. Please check your connection and try again. ${err.message}`;

		dispatch({
			type: actionTypes.LOGIN_FAILURE,
			payload: errorMessage,
		});

		showToast("error", errorMessage);

		throw err;
	}
};
