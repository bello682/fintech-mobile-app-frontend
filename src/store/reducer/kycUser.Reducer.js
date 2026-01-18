import * as actionTypes from "../actionType/kycUser.ActionType";

const initialState = {
	loadingKyc: false,
	kycData: null,
	errorMsgKyc: null,
};

export const kycReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.KYC_UPDATE_REQUEST:
			return {
				...state,
				loadingKyc: true,
				errorMsgKyc: null,
			};
		case actionTypes.KYC_UPDATE_SUCCESS:
			return {
				...state,
				loadingKyc: false,
				kycData: action.payload,
			};
		case actionTypes.KYC_UPDATE_FAILURE:
			return {
				...state,
				loadingKyc: false,
				errorMsgKyc: action.payload,
			};
		default:
			return state;
	}
};
