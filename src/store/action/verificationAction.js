import * as actionTypes from "../actionType/verificationActionType";
import axios from "axios";
import { showToast } from "../../component/toastMessage"; // Import your toast function
import AsyncStorage from "@react-native-async-storage/async-storage"; // Ensure you have this for storage

export const verifyUser = (otp) => async (dispatch) => {
	try {
		dispatch({ type: actionTypes.VERIFICATION_REQUEST });

		// Retrieve JWT token from AsyncStorage
		const token = await AsyncStorage.getItem("jwtToken");

		if (!token) {
			throw new Error("No token found");
		}

		// Make OTP verification request
		const res = await axios.post(
			`${process.env.EXPO_PUBLIC_MOBILE_APP_BASE_URL}/FintechUsers/verify-otp`,
			{ otp },
			{
				headers: {
					Authorization: `Bearer ${token}`, // Include the token in headers
				},
			}
		);

		// Dispatch success action with response data
		dispatch({
			type: actionTypes.VERIFICATION_SUCCESS,
			payload: { data: res?.data },
		});

		// Show success toast
		showToast(
			"success",
			res.data?.message || "User has been verified successfully."
		);

		// Optionally remove the token (only do this if it's no longer needed)
		await AsyncStorage.removeItem("jwtToken");

		return res;
	} catch (err) {
		// Handle verification failure and show error toast
		const errorMessage =
			err.response?.data?.message || "Network Error, please try again!";

		dispatch({
			type: actionTypes.VERIFICATION_FAILURE,
			payload: errorMessage,
		});
		showToast("error", errorMessage);

		throw err;
	}
};
