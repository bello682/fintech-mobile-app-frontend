import axios from "axios";
import * as actionTypes from "../actionType/deleteUserActionType";
import { showToast } from "../../component/toastMessage"; // For showing toast notifications
import AsyncStorage from "@react-native-async-storage/async-storage";

export const deleteUserById = (userID) => async (dispatch) => {
	if (!userID) {
		dispatch({
			type: actionTypes.DELETE_USER_FAILURE,
			payload: "Invalid user ID",
		});
		return;
	}

	try {
		dispatch({ type: actionTypes.DELETE_USER_REQUEST });

		// Retrieve the JWT token from AsyncStorage
		const jwtToken = await AsyncStorage.getItem("jwtToken");

		// Make DELETE request to delete user by ID with the token in headers
		const res = await axios.delete(
			`${process.env.EXPO_PUBLIC_MOBILE_APP_BASE_URL}/FintechUsers/user/${userID}`,
			{
				headers: {
					Authorization: `Bearer ${jwtToken}`, // Include the token
				},
			}
		);

		dispatch({
			type: actionTypes.DELETE_USER_SUCCESS,
			payload: res?.data?.message, // Payload with success message
		});

		// Show success toast message after deletion
		showToast("success", res.data.message);
	} catch (err) {
		// Dispatch failure action with error message from server response
		dispatch({
			type: actionTypes.DELETE_USER_FAILURE,
			payload: err.response?.data?.message || "Error deleting user",
		});

		// Show error toast message
		showToast("error", err.response?.data?.message || "Error deleting user");
	}
};
