// refes
import React, { useState } from "react";
import { Formik } from "formik";
import { useNavigation } from "@react-navigation/native";
import {
	Image,
	StyleSheet,
	Text,
	View,
	Dimensions,
	TextInput,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Email2VerificationCode } from "../component/ErrorValidation";
import { verifyUser } from "../store/action/verificationAction";
import { useDispatch, useSelector } from "react-redux";
import SpinningLoader from "../component/spinner";
import CountdownTimer from "../component/timerCountDown";
import ResendOtp from "./usersPgaes/resendOtp";
import { ActivityIndicator } from "react-native";

const SignUp2_EmailVerification = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const { loading } = useSelector((state) => state.verification);

	const [showVerificationOtp, setShowVerificationOtp] = useState(true);

	const initialValues = {
		otp: "",
	};

	const handleExpire = () => {
		// Handle OTP expiration logic
		// alert("OTP expired, please request a new OTP code");
	};

	const handleResendVerificationOtp = () => {
		setShowVerificationOtp(false); // Switch to the ResendOtp component
	};

	const handleBackToOtpView = () => {
		setShowVerificationOtp(true); // Switch back to the OTP verification view
	};

	const handleLogin = () => {
		navigation.navigate("Login");
	};

	return (
		<View style={styles.login__wrapper}>
			<View style={{ width: "100%" }}>
				<View style={styles.login__logo_wrapper}>
					<Image
						source={require("../asset/newlogo.png")}
						style={styles.logo__login}
					/>
				</View>
			</View>
			<View style={styles.login_body_info_wrapper}>
				<Text
					style={{
						textAlign: "center",
						fontSize: 20,
						fontWeight: 500,
						marginBottom: 20,
					}}
				>
					<Text style={{ color: "purple", fontSize: 21 }}>
						{" "}
						Email Verification
					</Text>
				</Text>

				{showVerificationOtp ? (
					<Formik
						initialValues={initialValues}
						validationSchema={Email2VerificationCode}
						onSubmit={async (value, { resetForm }) => {
							// Dispatch the verifyUser action and wait for its completion
							await dispatch(verifyUser(value.otp));
							handleLogin();
							resetForm(); // Reset the form after successful submission
						}}
					>
						{({
							values,
							handleChange,
							handleBlur,
							handleSubmit,
							errors,
							touched,
						}) => (
							<View>
								<View>
									{/* Display the timer only when there is no error */}
									{loading && <ActivityIndicator size="large" color="purple" />}

									<Text style={styles.PhoneNumber}>
										<CountdownTimer onExpire={handleExpire} />
									</Text>

									<View>
										<TextInput
											style={[
												styles.Email_input,
												errors?.otp ? styles.error_border : null,
											]}
											placeholder="Enter 6 digit code"
											onChangeText={handleChange("otp")}
											onBlur={handleBlur("otp")}
											value={values.otp}
										/>
									</View>
									{errors.otp && (
										<Text style={styles.error__message}>{errors.otp}</Text>
									)}
								</View>

								<View>
									<Text style={styles.resend__code}>
										Didn't get a mail?{" "}
										<Text
											style={styles.resend}
											onPress={handleResendVerificationOtp}
										>
											Resend
										</Text>
									</Text>
								</View>

								<View>
									<TouchableOpacity
										style={styles.login__btn}
										onPress={handleSubmit} // Properly bind handleSubmit here
										disabled={errors.otp || loading} // Disable button when there are errors or loading
									>
										<Text style={styles.login__text_btn}>Verify</Text>
									</TouchableOpacity>
								</View>
							</View>
						)}
					</Formik>
				) : (
					<ResendOtp onBackToOtpView={handleBackToOtpView} />
				)}
			</View>
		</View>
	);
};

export default SignUp2_EmailVerification;

const styles = StyleSheet.create({
	login__wrapper: {
		width: Dimensions.get("window").width,
		height: "100%",
		padding: 10,
		backgroundColor: "white",
	},
	login__logo_wrapper: {
		width: "18%",
		aspectRatio: 1 / 1,
		display: "flex",
		justifyContent: "flex-end",
		alignSelf: "flex-end",
		marginRight: 5,
	},

	logo__login: {
		flex: 1,
		width: "100%",
		aspectRatio: 1 / 1,
		objectFit: "contain",
	},

	login_body_info_wrapper: {
		height: "auto",
		marginTop: 60,
		paddingLeft: 10,
		paddingRight: 10,
	},
	PhoneNumber: {
		fontStyle: "normal",
		fontWeight: "bold",
		marginBottom: 8,
		color: "purple",
		display: "flex",
		justifyContent: "flex-end",
		alignSelf: "flex-end",
	},

	countryName: {
		fontStyle: "normal",
		fontWeight: "bold",
		marginBottom: 8,
	},

	dob: {
		fontStyle: "normal",
		fontWeight: "bold",
		marginBottom: 8,
	},
	nin: {
		fontStyle: "normal",
		fontWeight: "bold",
		marginBottom: 8,
	},

	resend__code: {
		fontStyle: "normal",
		fontWeight: "bold",
		marginBottom: 8,
		display: "flex",
		justifyContent: "center",
		alignContent: "center",
		margin: "auto",
	},

	resend: {
		color: "black",
		fontWeight: "900",
		textDecorationLine: "underline",
	},

	login_password_text: {
		fontStyle: "normal",
		fontWeight: "bold",
		marginBottom: 8,
	},

	Email_input: {
		borderWidth: 1,
		borderColor: "#ccc", // Border color
		borderRadius: 10, // Border radius to create rounded corners
		marginBottom: 20,
		paddingLeft: 20,
		paddingTop: 5,
		paddingBottom: 5,
	},

	Password_input: {
		borderWidth: 1, // Border width in pixels
		borderColor: "#ccc", // Border color
		borderRadius: 10, // Border radius to create rounded corners
		marginBottom: 20,
		paddingLeft: 20,
	},

	login__btn: {
		width: "100%",
		backgroundColor: "purple",
		alignItems: "center",
		margin: "auto",
		marginTop: 30,
		paddingTop: 15,
		paddingBottom: 15,
		borderRadius: 10,
		cursor: "pointer",
	},

	login__text_btn: {
		color: "white",
		fontSize: 20,
		fontWeight: "700",
	},

	link_sign_navigate_back: {
		width: "100%",
		backgroundColor: "#353935",
		alignItems: "center",
		margin: "auto",
		marginTop: 0,
		paddingTop: 15,
		paddingBottom: 15,
		borderRadius: 10,
		cursor: "pointer",
	},

	error_border: { borderColor: "red" },

	error__message: {
		color: "red",
		fontStyle: "normal",
		fontWeight: "bold",
		marginBottom: 8,
		display: "flex",
		justifyContent: "flex-end",
		alignSelf: "flex-end",
	},
});
