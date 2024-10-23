import * as actionTypes from "../actionType/deleteUserActionType";

const initialState = {
	loading: false,
	successMessage: null,
	error: null,
};

const deleteUserReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.DELETE_USER_REQUEST:
			return {
				...state,
				loading: true,
				successMessage: null,
				error: null,
			};
		case actionTypes.DELETE_USER_SUCCESS:
			return {
				...state,
				loading: false,
				successMessage: action.payload,
				error: null,
			};
		case actionTypes.DELETE_USER_FAILURE:
			return {
				...state,
				loading: false,
				successMessage: null,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default deleteUserReducer;
