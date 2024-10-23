import axios from "axios";
import * as actionTypes from "../actionType/forgetPasswordActionType";
import { showToast } from "../../component/toastMessage";

export const forgetUserPassword = (email) => async (dispatch) => {
	try {
		dispatch({ type: actionTypes.FORGET_PASSWORD_REQUEST });

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const res = await axios.post(
			`${process.env.EXPO_PUBLIC_MOBILE_APP_BASE_URL}/FintechUsers/forgot-password`,
			{ email },
			config
		);

		dispatch({
			type: actionTypes.FORGET_PASSWORD_SUCCESS,
			payload: res.message,
		});

		showToast("success", res.data.message);
	} catch (err) {
		const errorMessage =
			err.response?.data?.message ||
			`Network Error. Please check your connection and try again. ${err.message}`;
		dispatch({
			type: actionTypes.FORGET_PASSWORD_FAIL,
			payload: errorMessage,
		});
		showToast("error", errorMessage);
	}
};
