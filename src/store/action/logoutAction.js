import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as actionTypes from "../actionType/logoutActionType";
import { showToast } from "../../component/toastMessage";

export const logoutUser = () => async (dispatch) => {
	try {
		dispatch({ type: actionTypes.LOGOUT_REQUEST });

		// Retrieve JWT token from AsyncStorage
		const jwtToken = await AsyncStorage.getItem("jwtToken");

		if (!jwtToken) {
			throw new Error("No JWT token found. Please log in again.");
		}

		// Make the POST request to log out the user
		const res = await axios.post(
			`${process.env.EXPO_PUBLIC_MOBILE_APP_BASE_URL}/FintechUsers/logout`,
			null, // No body required
			{
				headers: {
					Authorization: `Bearer ${jwtToken}`, // Send JWT in Authorization header
				},
			}
		);

		// Clear AsyncStorage (e.g., remove JWT)
		await AsyncStorage.removeItem("jwtToken");

		// Dispatch success action
		dispatch({
			type: actionTypes.LOGOUT_SUCCESS,
			payload: res.data.message,
		});

		// Show success toast
		showToast("success", res.data.message || "Logout successful.");
	} catch (error) {
		// Dispatch failure action
		dispatch({
			type: actionTypes.LOGOUT_FAILURE,
			payload:
				error.response?.data?.message || error.message || "Logout failed",
		});

		// Show error toast
		showToast(
			"error",
			error.response?.data?.message || error.message || "Logout failed."
		);
	}
};
