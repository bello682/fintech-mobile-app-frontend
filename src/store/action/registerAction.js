import AsyncStorage from "@react-native-async-storage/async-storage";
import * as actionTypes from "../actionType/registerActionType";
import axios from "axios";
import { showToast } from "../../component/toastMessage"; // Import the component function

export const register = (fd) => async (dispatch) => {
	try {
		dispatch({ type: actionTypes.REGISTRATION_REQUEST });

		const res = await axios.post(
			`${process.env.EXPO_PUBLIC_MOBILE_APP_BASE_URL}/FintechUsers/register`,
			fd
		);

		dispatch({
			type: actionTypes.REGISTRATION_SUCCESS,
			payload: { data: res?.data },
		});

		// Save JWT token to AsyncStorage after registration
		const token = res.data?.token; // Assuming the token is in the response data
		if (token) {
			await AsyncStorage.setItem("jwtToken", token); // Store the token in AsyncStorage
		} else {
			throw new Error("No token received during registration");
		}

		// Use the showToast utility for success
		showToast("success", res.data?.message || "Registration successful");

		return res;
	} catch (err) {
		const errorMessage =
			err.response?.data?.message ||
			"Network Error, please connect to a strong network and try again!!!!!";

		dispatch({
			type: actionTypes.REGISTRATION_FAILURE,
			payload: errorMessage,
		});

		// Use the showToast utility for error
		showToast("error", errorMessage);

		throw err;
	}
};
