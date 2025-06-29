// redux store
import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { registrationReducer } from "./reducer/resgisterReducer";
import { verificationReducer } from "./reducer/verificationReducer";
import { resendOtpReducer } from "./reducer/resendOtpReducer";
import loginReducer from "./reducer/loginReducer";
import { logoutReducer } from "./reducer/logoutReducer";
import { forgetPasswordReducer } from "./reducer/forgetPasswordReducer";
import FetchUserReducer from "./reducer/fetchUserByIdReducer";
import deleteUserReducer from "./reducer/deleteUserReducer";
import { kycReducer } from "./reducer/kycUser.Reducer";

const rootReducer = combineReducers({
	registration: registrationReducer,
	verification: verificationReducer,
	resendOtpState: resendOtpReducer,
	loginState: loginReducer,
	logout: logoutReducer,
	forgetPasswordReducer: forgetPasswordReducer,
	userProfileFetch: FetchUserReducer,
	deleteUserState: deleteUserReducer,
	kyc: kycReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
