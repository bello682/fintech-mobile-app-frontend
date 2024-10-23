import * as actionTypes from "../actionType/logoutActionType";

const initialState = {
	loading: false,
	successMessage: null,
	errorMessage: null,
};

export const logoutReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.LOGOUT_REQUEST:
			return {
				...state,
				loading: true,
				successMessage: null,
				errorMessage: null,
			};
		case actionTypes.LOGOUT_SUCCESS:
			return {
				...state,
				loading: false,
				successMessage: action.payload,
			};
		case actionTypes.LOGOUT_FAILURE:
			return {
				...state,
				loading: false,
				errorMessage: action.payload,
			};
		default:
			return state;
	}
};
