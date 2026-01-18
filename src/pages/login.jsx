// refes
import React, { useState } from "react";
import { Link } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import {
	Image,
	StyleSheet,
	Text,
	View,
	Dimensions,
	TextInput,
} from "react-native";
import { Formik } from "formik";
import { TouchableOpacity } from "react-native-gesture-handler";
import { loginUser } from "../store/action/loginAction";
import { LoginValidationSchema } from "../component/ErrorValidation";
import { showToast } from "../component/toastMessage";
import { useDispatch, useSelector } from "react-redux";
import SpinningLoader from "../component/spinner";
import { Ionicons } from "@expo/vector-icons";

const initialValues = {
	email: "",
	password: "",
};

const Login = () => {
	// const fullWidth = Dimensions.get('window').width;
	const [err, setErr] = useState("");
	const navigation = useNavigation();
	const [showPassword, setShowPassword] = useState(false);
	const { isLoading, user } = useSelector((state) => state.loginState);
	const dispatch = useDispatch();

	const handleNavigationForgetPassword = () => {
		navigation.navigate("Password_reset");
	};

	if (isLoading) {
		return (
			<View style={{ flex: 1 }}>
				<SpinningLoader />
			</View>
		);
	}

	return (
		<>
			<Formik
				initialValues={initialValues}
				validationSchema={LoginValidationSchema}
				onSubmit={async (values) => {
					try {
						await dispatch(
							loginUser(
								{
									email: values.email,
									password: values.password,
								},
								navigation,
							),
						);

						navigation.navigate("MainTabs");
					} catch (error) {
						console.error("Login error: ", error);
					}
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
								Welcome!!
							</Text>

							<Text style={{ textAlign: "center", color: "red", fontSize: 15 }}>
								{err}
							</Text>

							<View>
								<Text style={styles.login_email_text}>Email Address</Text>
								<View
									style={[
										styles.passwordContainer,
										errors?.email ? styles.error__border : null,
									]}>
									<TextInput
										style={styles.Email_input}
										placeholder='Enter your email address'
										onChangeText={handleChange("email")}
										onBlur={handleBlur("email")}
										value={values.email}
									/>
								</View>
								{errors.email && (
									<Text style={styles.error__message}>{errors.email}</Text>
								)}
							</View>

							<View>
								<Text style={styles.login_password_text}>Password</Text>

								<View
									style={[
										styles.passwordContainer,
										errors?.password ? styles.error__border : null,
									]}>
									<TextInput
										style={styles.Password_input}
										placeholder='Password'
										onChangeText={handleChange("password")}
										onBlur={handleBlur("password")}
										value={values.password}
										secureTextEntry={!showPassword} // Toggle secure text entry
									/>
									<TouchableOpacity
										style={styles.passwordToggleIcon}
										onPress={() => setShowPassword(!showPassword)} // Toggle password visibility
									>
										<Ionicons
											name={showPassword ? "eye-off-outline" : "eye-outline"} // Toggle between icons
											size={20}
											color='#000'
										/>
									</TouchableOpacity>
								</View>
								{errors.password && (
									<Text style={styles.error__message}>{errors.password}</Text>
								)}
							</View>

							<View>
								<Text
									style={styles.forget__pas}
									onPress={handleNavigationForgetPassword}>
									Forgot Password?
								</Text>
							</View>

							{!values.email && !values.password ? (
								<View>
									<TouchableOpacity
										style={styles.login__btn}
										onPress={() => {
											showToast(
												"error",
												"Please enter your email address and password",
											);
										}}>
										<Text style={styles.login__text_btn}>Sign In</Text>
									</TouchableOpacity>
								</View>
							) : (
								<View>
									<TouchableOpacity
										style={styles.login__btn}
										onPress={handleSubmit} // Pass values and handleSubmit
										disabled={
											errors.email ||
											errors.password ||
											!values.email ||
											!values.password
										}>
										<Text style={styles.login__text_btn}>Login</Text>
									</TouchableOpacity>
								</View>
							)}
							<View
								style={{
									marginTop: 60,
									flexDirection: "row",
									justifyContent: "center",
								}}>
								<Text style={styles.text__link_signup}>
									Don't have an account yet?{" "}
								</Text>
								<TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
									<Text style={styles.link_sign_navigate}>Sign-up</Text>
								</TouchableOpacity>
							</View>

							{/* <TouchableOpacity
								style={styles.login__btn}
								onPress={() => {
									navigation.navigate("Kyc_User");
								}}
							>
								<View style={styles.google__btn_wrapper}>
									<Text style={styles.login__text_btn}>Sign In to KYC</Text>
								</View>
							</TouchableOpacity> */}
						</View>
					</View>
				)}
			</Formik>
		</>
	);
};

export default Login;

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
		marginTop: 30,
	},

	logo__login: {
		flex: 1,
		width: "100%",
		aspectRatio: 1 / 1,
		objectFit: "contain",
	},

	login_body_info_wrapper: {
		height: "auto",
		marginTop: 70,
		paddingLeft: 10,
		paddingRight: 10,
	},
	login_email_text: {
		fontStyle: "normal",
		fontWeight: "bold",
		marginBottom: 8,
	},
	login_password_text: {
		fontStyle: "normal",
		fontWeight: "bold",
		marginBottom: 8,
	},

	Email_input: {
		flex: 1, // This is the "magic" that fixes the layout
		height: "100%",
		paddingLeft: 20,
	},

	Password_input: {
		flex: 1, // Same here
		height: "100%",
		paddingLeft: 20,
	},

	passwordContainer: {
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

	passwordToggleIcon: {
		marginLeft: 10,
		padding: 5,
	},

	forget__pas: {
		textAlign: "center",
		marginTop: 10,
		color: "purple",
		fontWeight: "bold",
		textDecorationLine: "underline",
	},

	login__btn: {
		width: "100%",
		backgroundColor: "purple",
		alignItems: "center",
		margin: "auto",
		marginTop: 50,
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

	text__link_signup: {
		textAlign: "center",
		fontWeight: "600",
	},

	link_sign_navigate: {
		color: "red",
		textDecorationLine: "underline",
	},

	error__border: {
		borderColor: "red",
	},

	error__message: {
		color: "red",
	},
});
