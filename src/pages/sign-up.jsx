// refes
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { Link } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import {
	Image,
	StyleSheet,
	Text,
	View,
	Dimensions,
	TextInput,
	TouchableOpacity,
} from "react-native";
import { Terms_condition_text } from "./Terms_Condition";
import { SignUpValidationSchema } from "../component/ErrorValidation";
import { register } from "../store/action/registerAction";
import GlobalPopupModal from "../component/modalComponent";
import SpinningLoader from "../component/spinner";
import Icon from "react-native-vector-icons/FontAwesome";

const initialValues = {
	fullName: "",
	email: "",
	password: "",
	// isChecked: false,
};

const SignUp = () => {
	const [isChecked, setIsChecked] = useState(false);
	const [termCondition, setTermCondition] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const { loading, errorMsg } = useSelector((state) => state.registration);

	// Toggle terms and conditions modal
	const handleTerms__Condition = () => {
		setTermCondition(true);
	};

	if (errorMsg) {
		console.log("here error : " + errorMsg);
	}

	if (loading) {
		return (
			<View style={{ flex: 1 }}>
				<SpinningLoader />
			</View>
		); // Correctly return loading state
	}

	return (
		<>
			<Formik
				initialValues={initialValues}
				validationSchema={SignUpValidationSchema}
				onSubmit={async (values, { resetForm }) => {
					try {
						await dispatch(register(values));
						resetForm();
						navigation.navigate("Verification");
					} catch (error) {
						console.error("Registration error: ", error);
					}
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
								Welcome!! {"\n"} to{" "}
								<Text style={{ color: "purple" }}> GuarantyBest</Text>
							</Text>
							<View>
								<Text style={styles.login_email_text}>Full Name</Text>
								<View>
									<TextInput
										style={[
											styles.Email_input,
											errors?.fullName ? styles.error__border : null,
										]}
										placeholder="Enter your name"
										value={values.fullName}
										onChangeText={handleChange("fullName")}
										onBlur={handleBlur("fullName")}
									/>
									{errors.fullName && (
										<Text style={styles.error__message}>{errors.fullName}</Text>
									)}
								</View>
							</View>

							<View>
								<Text style={styles.login_email_text}>Email Address</Text>
								<View>
									<TextInput
										style={[
											styles.Email_input,
											errors?.email ? styles.error__border : null,
										]}
										placeholder="Enter your email address"
										value={values.email}
										onChangeText={handleChange("email")}
										onBlur={handleBlur("email")}
									/>
									{errors.email && (
										<Text style={styles.error__message}>{errors.email}</Text>
									)}
								</View>
							</View>

							<View>
								<Text style={styles.login_password_text}>Password</Text>
								<View
									style={[
										styles.passwordContainer,
										errors?.password ? styles.error__border : null,
									]}
								>
									<TextInput
										style={styles.Password_input}
										placeholder="Password"
										onChangeText={handleChange("password")}
										onBlur={handleBlur("password")}
										value={values.password}
										secureTextEntry={!showPassword} // Toggle secure text entry
									/>
									<TouchableOpacity
										style={styles.passwordToggleIcon}
										onPress={() => setShowPassword(!showPassword)} // Toggle password visibility
									>
										<Icon
											name={showPassword ? "eye-slash" : "eye"} // Toggle between icons
											size={20}
											color="#000"
										/>
									</TouchableOpacity>
								</View>
								{errors.password && (
									<Text style={styles.error__message}>{errors.password}</Text>
								)}
							</View>

							<View style={styles.checkbox__wrapper}>
								<TouchableOpacity
									style={styles.checkbox__div}
									onPress={() => {
										setIsChecked(!isChecked);
									}}
								>
									<TouchableOpacity
										style={[
											styles.check__Box,
											isChecked ? styles.checkBox__background : null,
										]}
										onPress={() => {
											setIsChecked(!isChecked);
										}}
									>
										{isChecked && <Text style={styles.checkBox__mark}>✔</Text>}
									</TouchableOpacity>
									<Text>I agree to the </Text>
								</TouchableOpacity>
								<Text
									style={styles.term__condition}
									onPress={handleTerms__Condition}
								>
									Terms of Service <Text>&</Text> Privacy Policy
								</Text>
							</View>
							{!isChecked && errors.isChecked && (
								<Text style={styles.error__message}>{errors.isChecked}</Text>
							)}

							{!values.fullName &&
							!values.email &&
							!values.password &&
							!isChecked ? (
								<View>
									<TouchableOpacity
										style={styles.login__btn}
										onPress={() => {
											console.log("please Create an account");
										}}
									>
										<Text style={styles.login__text_btn}>Sign Up</Text>
									</TouchableOpacity>
								</View>
							) : (
								<View>
									<TouchableOpacity
										style={[
											styles.login__btn,
											isChecked &&
											!errors.fullName &&
											!errors.email &&
											!errors.password
												? styles.submitButtonActive
												: styles.submitButtonDisabled,
										]}
										onPress={handleSubmit}
										disabled={
											!isChecked ||
											errors.email ||
											errors.fullName ||
											errors.password ||
											!values.email ||
											!values.fullName ||
											!values.password
										}
									>
										<Text style={styles.login__text_btn}>Create account</Text>
									</TouchableOpacity>
								</View>
							)}
							<View style={{ marginTop: 40 }}>
								<Text style={styles.text__link_signup}>
									Already have an accout?{" "}
									<Link to={"/Login"} style={styles.link_sign_navigate}>
										Login
									</Link>
								</Text>
							</View>
						</View>
					</View>
				)}
			</Formik>

			{termCondition && (
				<GlobalPopupModal
					title="Terms and Conditions"
					modalVisible={termCondition}
					onClose={() => setTermCondition(false)}
					onConfirm={() => setTermCondition(false)}
					message={Terms_condition_text}
				/>
			)}
		</>
	);
};

export default SignUp;

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
		marginTop: 20,
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
		borderWidth: 1,
		borderColor: "#ccc", // Border color
		borderRadius: 10, // Border radius to create rounded corners
		marginBottom: 20,
		paddingLeft: 20,
		paddingTop: 5,
		paddingBottom: 5,
	},
	Password_input: {
		paddingLeft: 20,
		paddingTop: 5,
		paddingBottom: 5,
		width: "90%",
	},

	passwordContainer: {
		display: "flex", // Flexbox display
		flexDirection: "row", // Arrange items horizontally (row)
		alignItems: "center", // Vertically center the items
		justifyContent: "center", // Horizontally center the content
		margin: "auto", // Center the container itself (horizontally)
		height: "auto", // Adjust height based on content
		borderWidth: 1, // Border color
		borderRadius: 10, // Rounded corners
		marginBottom: 20, // Space below the container
		borderColor: "#ccc",
		paddingRight: 10, // Add right padding for icon space
		height: "auto", // Optional: set a height to ensure a consistent look
	},

	passwordToggleIcon: {
		marginLeft: 10,
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
		paddingVertical: 15,
		borderRadius: 10,
	},

	submitButtonDisabled: {
		opacity: 0.5,
	},
	submitButtonText: {
		color: "white",
		fontSize: 20,
		fontWeight: "700",
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

	check__Box: {
		width: 17,
		aspectRatio: 1 / 1,
		borderWidth: 2,
		borderColor: "blue",
		marginRight: 5,
		borderRadius: 5,
	},

	checkBox__background: {
		backgroundColor: "blue",
	},

	checkBox__mark: {
		fontSize: 10,
		fontWeight: "800",
		justifyContent: "center",
		alignContent: "center",
		margin: "auto",
		color: "white",
		// display: 'none',
	},

	checkbox__wrapper: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 20,
	},

	checkbox__div: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},

	term__condition: {
		textDecorationLine: "underline",
		color: "#FA8072",
		fontWeight: "700",
	},

	error__border: {
		borderColor: "red",
	},

	error__message: {
		color: "red",
	},
});
