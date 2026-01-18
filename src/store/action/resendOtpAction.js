import * as actionTypes from "../actionType/resendOtpActionType";
import axios from "axios";
import { showToast } from "../../component/toastMessage"; // Import your toast function
import AsyncStorage from "@react-native-async-storage/async-storage";

export const resendOtpUser = (email) => async (dispatch) => {
	try {
		dispatch({ type: actionTypes.OTP_RESEND_REQUEST });

		// Resend OTP request
		const res = await axios.post(
			`${process.env.EXPO_PUBLIC_MOBILE_APP_BASE_URL}/FintechUsers/resend-otp`,
			{ email }
		);

		// Dispatch success action with response data
		dispatch({
			type: actionTypes.OTP_RESEND_SUCCESS,
			payload: { data: res?.data },
		});

		// Save JWT token to AsyncStorage after registration
		const token = res.data?.token; // Assuming the token is in the response data
		if (token) {
			await AsyncStorage.setItem("jwtToken", token); // Store the token in AsyncStorage
		} else {
			throw new Error("No token received during registration");
		}

		// Show success toast
		showToast("success", res.data?.message || "OTP sent successfully.");

		return res;
	} catch (err) {
		// Handle verification failure and show error toast
		const errorMessage =
			err.response?.data?.message || "Network Error, please try again!";

		dispatch({
			type: actionTypes.OTP_RESEND_FAILURE,
			payload: errorMessage,
		});
		showToast("error", errorMessage);

		throw err;
	}
};
