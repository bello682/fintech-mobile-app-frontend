// actions/kycAction.js
import * as actionTypes from "../actionType/kycUser.ActionType";
import axios from "axios";
import { showToast } from "../../component/toastMessage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode"; // ✅ You'll need this

export const updateKyc = (fd, userId) => async (dispatch) => {
	try {
		dispatch({ type: actionTypes.KYC_UPDATE_REQUEST });

		// const userId = await AsyncStorage.getItem("userId");
		const token = await AsyncStorage.getItem("jwtToken");
		const decodedToken = jwtDecode(token);
		const userId = decodedToken?.user?._id || decodedToken?._id; // adjust based on your token structure
		console.log(userId);

		const res = await axios.patch(
			`${process.env.EXPO_PUBLIC_MOBILE_APP_BASE_URL}/FintechUsers/users/${userId}/update-kyc`,
			fd,
			{
				headers: {
					// "Content-Type": "multipart/form-data",
					Authorization: `Bearer ${token}`,
				},
			}
		);

		dispatch({
			type: actionTypes.KYC_UPDATE_SUCCESS,
			payload: { data: res?.data },
		});

		showToast("success", res.data?.message || "KYC updated successfully");
		return res;
	} catch (err) {
		console.log("FULL AXIOS ERROR:", err);
		console.log("RESPONSE DATA:", err.response?.data);
		console.log("MESSAGE:", err.message);
		const errorMessage =
			err.response?.data?.message ||
			"Network Error, please connect to a strong network and try again!!!!!";

		dispatch({
			type: actionTypes.KYC_UPDATE_FAILURE,
			payload: errorMessage,
		});
		showToast("error", errorMessage);
		throw err;
	}
};
