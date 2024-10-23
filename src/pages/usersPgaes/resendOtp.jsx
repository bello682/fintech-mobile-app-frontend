// ResendOtp.js
import React from "react";
import { Formik } from "formik";
import {
	View,
	TextInput,
	Text,
	TouchableOpacity,
	StyleSheet,
	ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { EmailResendSchema } from "../../component/ErrorValidation";
import { showToast } from "../../component/toastMessage";
import { resendOtpUser } from "../../store/action/resendOtpAction";
import SpinningLoader from "../../component/spinner";
import { useNavigation } from "@react-navigation/native";

const ResendOtp = ({ onBackToOtpView }) => {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const { loading } = useSelector((state) => state.resendOtpState);

	const initialValues = {
		email: "",
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={EmailResendSchema} // Add validation for email
			onSubmit={async (values) => {
				// Handle resend OTP logic here

				await dispatch(resendOtpUser(values.email));
				navigation.navigate("Verification");
				showToast("success", `New OTP requested for: ${values.email}`);

				onBackToOtpView(); // Call back to switch back to OTP view after resending
			}}
		>
			{({ values, handleChange, handleBlur, handleSubmit, errors }) => (
				<View>
					<Text style={styles.PhoneNumber}>Enter your email address</Text>
					<TextInput
						style={[
							styles.Email_input,
							errors?.email ? styles.error_border : null,
						]}
						placeholder="Email Address"
						onChangeText={handleChange("email")}
						onBlur={handleBlur("email")}
						value={values.email}
					/>
					{errors.email && (
						<Text style={styles.error__message}>{errors.email}</Text>
					)}

					<TouchableOpacity
						style={styles.login__btn}
						onPress={handleSubmit}
						disabled={errors.email} // Disable button when there are errors
					>
						<View style={styles.login__text_btn_container}>
							<Text style={styles.login__text_btn}>Request new OTP </Text>
							{loading && (
								<ActivityIndicator
									size="large" // Adjusted size
									color="white"
									style={styles.indicator} // Add some optional margin if needed
								/>
							)}
						</View>
					</TouchableOpacity>

					<TouchableOpacity onPress={onBackToOtpView} style={styles.login__btn}>
						<Text style={styles.login__text_btn}>Back to OTP</Text>
					</TouchableOpacity>
				</View>
			)}
		</Formik>
	);
};

export default ResendOtp;
const styles = StyleSheet.create({
	PhoneNumber: {
		fontStyle: "normal",
		fontWeight: "bold",
		marginBottom: 8,
		color: "purple",
		display: "flex",
		justifyContent: "flex-end",
		alignSelf: "flex-end",
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

	login__text_btn_container: {
		flexDirection: "row", // Align text and indicator horizontally
		justifyContent: "center", // Center them horizontally
		alignItems: "center", // Align vertically in the middle
	},
	login__text_btn: {
		color: "white",
		fontSize: 20,
		fontWeight: "700",
		marginBottom: 5,
	},
	indicator: {
		marginLeft: 10, // Optional: space between text and spinner
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

	error__message: { color: "red" },
});
