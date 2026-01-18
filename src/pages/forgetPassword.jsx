// refes
import React from "react";
import { Formik, useFormik } from "formik";
import { useNavigation } from "@react-navigation/native";
import {
	Image,
	StyleSheet,
	Text,
	View,
	Dimensions,
	TextInput,
	ActivityIndicator,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ForgetPasswordValidationSchema } from "../component/ErrorValidation";
import { forgetUserPassword } from "../store/action/forgetPasswordAction";
import { useSelector, useDispatch } from "react-redux";

const initialValues = {
	email: "",
};
const ForgetPassword = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const { loading_now } = useSelector((state) => state.forgetPasswordReducer);

	return (
		<>
			<Formik
				initialValues={initialValues}
				validationSchema={ForgetPasswordValidationSchema}
				onSubmit={async (values) => {
					await dispatch(forgetUserPassword(values.email));

					navigation.navigate("Login");
				}}>
				{({
					values,
					handleChange,
					handleBlur,
					handleSubmit,
					errors,
					touched,
				}) => (
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
								}}>
								{/* Step */}
								<Text style={{ color: "purple", fontSize: 21 }}>
									{" "}
									Forget Password
								</Text>
							</Text>
							<View>
								<View
									style={[
										styles.emailContainer,
										errors?.email ? styles.error__border : null,
									]}>
									<TextInput
										style={styles.Email_input}
										placeholder='Enter Email'
										onChangeText={handleChange("email")}
										onBlur={handleBlur("email")}
										value={values.email}
									/>
								</View>
								{errors.email && (
									<Text style={styles.Error__Message}>{errors.email}</Text>
								)}
							</View>

							<View>
								<TouchableOpacity
									style={styles.login__btn}
									onPress={handleSubmit}
									disabled={errors.email}>
									<Text style={styles.login__text_btn}>
										{loading_now ? (
											<ActivityIndicator size='large' color='#fff' />
										) : (
											"Get Code"
										)}
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				)}
			</Formik>
		</>
	);
};

export default ForgetPassword;

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

	emailContainer: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderRadius: 10,
		marginBottom: 20,
		borderColor: "#ccc",
		height: 45, // Use a number, and make it tall enough for fingers
		paddingRight: 10,
		width: "100%", // Ensure it fills the screen width
	},

	Email_input: {
		flex: 1, // Same here
		height: "100%",
		paddingLeft: 20,
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

	error__border: {
		borderColor: "red",
	},

	Error__Message: {
		color: "red",
	},
});
