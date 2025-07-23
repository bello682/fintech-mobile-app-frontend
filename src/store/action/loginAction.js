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

		// const res = await fetch(
		const res = await axios.post(
			`${process.env.EXPO_PUBLIC_MOBILE_APP_BASE_URL}/FintechUsers/login`,
			credentials

			// {
			// 	method: "POST",
			// 	headers: {
			// 		"Content-Type": "application/json",
			// 	},
			// 	body: JSON.stringify({ credentials }),
			// }
		);

		const userData = res.data;

		// Save JWT to AsyncStorage
		const jwtToken = userData.token; // Assuming the JWT token is returned as "token"
		await AsyncStorage.setItem("jwtToken", jwtToken);

		const userId = userData?.user?.id;
		console.log("login user ID from the login Action API", userId);

		if (userId) {
			await AsyncStorage.setItem("userId", userId);
		} else {
			throw new Error("No ID received during registration");
		}

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
			err.response?.data?.message || `Network Error. ${err.message}`;

		dispatch({
			type: actionTypes.LOGIN_FAILURE,
			payload: errorMessage,
		});

		showToast("error", errorMessage);

		throw err;
	}
};
