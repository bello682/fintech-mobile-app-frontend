import * as actionTypes from "../actionType/loginActionType";

const initialState = {
	user: null,
	isLoading: false,
	error: null,
};

const loginReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.LOGIN_REQUEST:
			return {
				...state,
				isLoading: true,
			};
		case actionTypes.LOGIN_SUCCESS:
			return {
				...state,
				isLoading: false,
				user: action.payload,
			};
		case actionTypes.LOGIN_FAILURE:
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};

export default loginReducer;
