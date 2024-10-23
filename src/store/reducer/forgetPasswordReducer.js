import * as actionTypes from "../actionType/forgetPasswordActionType";

const initialState = {
	loading_now: false,
	message: null,
	error: null,
};

export const forgetPasswordReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FORGET_PASSWORD_REQUEST:
			return { ...state, loading_now: true };

		case actionTypes.FORGET_PASSWORD_SUCCESS:
			return { loading_now: false, message: action.payload, error: null };

		case actionTypes.FORGET_PASSWORD_FAIL:
			return { loading_now: false, error: action.payload, message: null };

		default:
			return state;
	}
};
