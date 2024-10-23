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
	ScrollView,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import GlobalPopupModal from "../../component/modalComponent";
import SpinningLoader from "../../component/spinner";
import Icon from "react-native-vector-icons/FontAwesome";
import { KycValidationSchema } from "../../component/ErrorValidation";
import GlobalSelect from "../../component/selectOptionDropdown";

const initialValues = {
	documentType: "",
	documentImage: "",
	occupation: "",
	address: "",
	dateOfBirth: "",
	placeOfWork: "",
	bvn: "",
	phoneNumber: "",
};

const Kyc_User = () => {
	const [termCondition, setTermCondition] = useState(false);
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const { loading, errorMsg } = useSelector((state) => state.registration);
	const [documentType, setDocumentType] = useState("");
	const [selectedFile, setSelectedFile] = useState(null);

	const documentOptions = [
		"National ID",
		"Driver's License",
		"Voter's Card",
		"Passport",
	];

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		setSelectedFile(file);
	};

	const handleUpload = () => {
		if (selectedFile) {
			console.log("Uploading: ", selectedFile.name);
			// Handle the upload logic here
		} else {
			console.log("No file selected");
		}
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
				validationSchema={KycValidationSchema}
				onSubmit={async (values) => {
					try {
						// Add selectedDocumentImage to values if file selected
						if (selectedDocumentImage) {
							values.documentImage = selectedDocumentImage.uri; // Update with file URI
						}
						await dispatch(register(values));

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
					<KeyboardAvoidingView
						style={{ flex: 1 }}
						behavior={Platform.OS === "ios" ? "padding" : "height"}
					>
						<ScrollView contentContainerStyle={styles.scrollContainer}>
							<View style={styles.login__wrapper}>
								<View style={{ width: "100%" }}>
									<View style={styles.login__logo_wrapper}>
										<Image
											source={require("../../asset/newlogo.png")}
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
										<Text style={{ color: "purple" }}> GuarantyBest</Text>!!
										{"\n"}
										We guaranty you the best{" "}
									</Text>
									<View>
										<Text style={styles.login_email_text}>Address</Text>
										<View>
											<TextInput
												style={[
													styles.Email_input,
													errors?.address ? styles.error__border : null,
												]}
												placeholder="Enter address"
												value={values.address}
												onChangeText={handleChange("address")}
												onBlur={handleBlur("address")}
											/>
											{errors.address && (
												<Text style={styles.error__message}>
													{errors.address}
												</Text>
											)}
										</View>
									</View>
									<View>
										<Text style={styles.login_email_text}>Date of Birth</Text>
										<View>
											<TextInput
												style={[
													styles.Email_input,
													errors?.dateOfBirth ? styles.error__border : null,
												]}
												placeholder="Enter DOB"
												value={values.dateOfBirth}
												onChangeText={handleChange("dateOfBirth")}
												onBlur={handleBlur("dateOfBirth")}
											/>
											{errors.dateOfBirth && (
												<Text style={styles.error__message}>
													{errors.dateOfBirth}
												</Text>
											)}
										</View>
									</View>
									<View>
										<Text style={styles.login_email_text}>Occupation</Text>
										<View>
											<TextInput
												style={[
													styles.Email_input,
													errors?.occupation ? styles.error__border : null,
												]}
												placeholder="Enter Occupation"
												value={values.occupation}
												onChangeText={handleChange("occupation")}
												onBlur={handleBlur("occupation")}
											/>
											{errors.occupation && (
												<Text style={styles.error__message}>
													{errors.occupation}
												</Text>
											)}
										</View>
									</View>
									<View>
										<Text style={styles.login_email_text}>Place of Work</Text>
										<View>
											<TextInput
												style={[
													styles.Email_input,
													errors?.placeOfWork ? styles.error__border : null,
												]}
												placeholder="Enter Place of Work"
												value={values.placeOfWork}
												onChangeText={handleChange("placeOfWork")}
												onBlur={handleBlur("placeOfWork")}
											/>
											{errors.placeOfWork && (
												<Text style={styles.error__message}>
													{errors.placeOfWork}
												</Text>
											)}
										</View>
									</View>
									<View>
										<Text style={styles.login_email_text}>BVN</Text>
										<View>
											<TextInput
												style={[
													styles.Email_input,
													errors?.bvn ? styles.error__border : null,
												]}
												placeholder="Enter BVN"
												value={values.bvn}
												onChangeText={handleChange("bvn")}
												onBlur={handleBlur("bvn")}
											/>
											{errors.bvn && (
												<Text style={styles.error__message}>{errors.bvn}</Text>
											)}
										</View>
									</View>
									<View>
										<Text style={styles.login_email_text}>Phone Number</Text>
										<View>
											<TextInput
												style={[
													styles.Email_input,
													errors?.phoneNumber ? styles.error__border : null,
												]}
												placeholder="Enter phone number"
												value={values.phoneNumber}
												onChangeText={handleChange("phoneNumber")}
												onBlur={handleBlur("phoneNumber")}
											/>
											{errors.phoneNumber && (
												<Text style={styles.error__message}>
													{errors.phoneNumber}
												</Text>
											)}
										</View>
									</View>

									{/* Replace Picker with DropDownPicker */}
									<View>
										<Text style={styles.login_email_text}>ID Card Type</Text>
										<GlobalSelect
											options={documentOptions}
											selectedValue={documentType}
											onValueChange={(value) => setDocumentType(value)}
											placeholder="Select ID Type"
											style={[
												styles.picker,
												errors?.documentType ? styles.error__border : null,
											]}
										/>

										{errors.documentType && touched.documentType && (
											<Text style={styles.error__message}>
												{errors.documentType}
											</Text>
										)}
									</View>

									{/* Document Image Upload */}
									<View>
										<View>
											{/* For React Native Web or WebView, input tag works */}
											<input
												type="file"
												accept="image/*"
												onChange={handleFileChange} // Ensure handleFileChange is defined
												style={{ margin: 10 }}
											/>
											{selectedFile && (
												<Text>Selected File: {selectedFile.name}</Text>
											)}

											{/* Using a button for uploading the file */}
											<TouchableOpacity
												style={styles.login_email_text}
												onPress={handleUpload}
											>
												<Text>Upload ID</Text>
											</TouchableOpacity>
										</View>

										{/* Display form validation errors */}
										{errors.documentImage && touched.documentImage && (
											<Text style={styles.error__message}>
												{errors.documentImage}
											</Text>
										)}
									</View>

									{!values.address &&
									!values.bvn &&
									!values.dateOfBirth &&
									!values.documentImage &&
									!values.documentType &&
									!values.occupation &&
									!values.phoneNumber &&
									!values.placeOfWork ? (
										<View>
											<TouchableOpacity
												style={styles.login__btn}
												onPress={() => {
													console.log("please Create an account");
												}}
											>
												<Text style={styles.login__text_btn}>Create KYC</Text>
											</TouchableOpacity>
										</View>
									) : (
										<View>
											<TouchableOpacity
												style={[
													styles.login__btn,
													!errors.documentImage &&
													!errors.address &&
													!errors.bvn &&
													!errors.dateOfBirth &&
													!errors.documentType &&
													!errors.occupation &&
													!errors.phoneNumber &&
													!errors.placeOfWork
														? styles.submitButtonActive
														: styles.submitButtonDisabled,
												]}
												onPress={handleSubmit}
												disabled={
													!errors.documentImage ||
													!errors.address ||
													!errors.bvn ||
													!errors.dateOfBirth ||
													!errors.documentType ||
													!errors.occupation ||
													!errors.phoneNumber ||
													!errors.placeOfWork
												}
											>
												<Text style={styles.login__text_btn}>Submit KYC</Text>
											</TouchableOpacity>
										</View>
									)}
								</View>
							</View>
						</ScrollView>
					</KeyboardAvoidingView>
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

export default Kyc_User;

const styles = StyleSheet.create({
	scrollContainer: {
		flexGrow: 1,
		justifyContent: "center",
		paddingBottom: 20,
	},

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

	// submitButtonActive: {
	// 	backgroundColor: "purple",
	// },

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

	//

	filePicker: {
		borderColor: "#ccc",
		borderWidth: 1,
		padding: 10,
		borderRadius: 5,
		backgroundColor: "#f8f8f8",
		marginTop: 10,
	},
	filePickerText: {
		color: "#666",
		fontSize: 16,
	},
	picker: {
		height: 50,
		width: "100%",
		borderColor: "#ccc",
		borderWidth: 1,
		borderRadius: 5,
		marginTop: 10,
	},
	error__message: {
		color: "red",
		fontSize: 12,
		marginTop: 5,
	},
});
