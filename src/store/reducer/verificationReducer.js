import * as actionTypes from "../actionType/verificationActionType";

const initialState = {
	loading: false,
	OtpVerification: null,
	errorMsg: null,
};

export const verificationReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.VERIFICATION_REQUEST:
			return {
				...state,
				loading: true,
				errorMsg: null,
			};
		case actionTypes.VERIFICATION_SUCCESS:
			return {
				...state,
				loading: false,
				OtpVerification: action.payload,
			};
		case actionTypes.VERIFICATION_FAILURE:
			return {
				...state,
				loading: false,
				errorMsg: action.payload,
			};

		default:
			return state;
	}
};
