// refes
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
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
	ActivityIndicator,
	Alert, // Using Alert for user feedback instead of console.log for "No file selected"
} from "react-native";
import GlobalPopupModal from "../../component/modalComponent";
import SpinningLoader from "../../component/spinner";
import Icon from "react-native-vector-icons/FontAwesome";
import { KycValidationSchema } from "../../component/ErrorValidation";
import GlobalSelect from "../../component/selectOptionDropdown";
import * as ImagePicker from "expo-image-picker";
import { requestStoragePermission } from "./../../utils/requestPermissions";
import { updateKyc } from "./../../store/action/kycUser.Action";

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
	const { loadingKyc, kycData, errorMsgKyc } = useSelector(
		(state) => state.kyc
	);

	const documentOptions = [
		"National ID",
		"Driver's License",
		"Voter's Card",
		"Passport",
	];

	// Function to handle image selection and update Formik state
	const pickImage = async (setFieldValue) => {
		try {
			const permissionResult =
				await ImagePicker.requestMediaLibraryPermissionsAsync();

			if (!permissionResult.granted) {
				Alert.alert(
					"Permission Denied",
					"Permission to access media library is required!"
				);
				return;
			}

			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				quality: 1,
			});

			if (!result.canceled) {
				const asset = result.assets[0];
				setFieldValue("documentImage", asset); // ⚠️ Store entire asset object
				Alert.alert("Success", "Image selected successfully!");
			} else {
				Alert.alert("Cancelled", "Image selection was cancelled.");
			}
		} catch (error) {
			console.error("Error picking image:", error);
			Alert.alert("Error", "Failed to select image. Please try again.");
		}
	};

	if (errorMsgKyc) {
		console.log("here error : " + errorMsgKyc);
		// You might want to display a GlobalPopupModal here for the errorMsgKyc
		Alert.alert("Error", errorMsgKyc);
	}
	if (loadingKyc) {
		return (
			<View style={styles.loadingContainer}>
				<SpinningLoader />
			</View>
		);
	}

	return (
		<>
			<Formik
				initialValues={initialValues}
				validationSchema={KycValidationSchema}
				onSubmit={async (values) => {
					try {
						// Validate that image is selected
						if (!values.documentImage || !values.documentImage.uri) {
							Alert.alert(
								"Error",
								"Please select a document image to proceed."
							);
							return;
						}

						// Create FormData for file upload
						const formData = new FormData();
						for (const key in values) {
							if (key === "documentImage") {
								formData.append("documentImage", {
									uri: values.documentImage.uri,
									name: values.documentImage.fileName || "kyc.jpg",
									type: values.documentImage.type || "image/jpeg",
								});
							} else {
								formData.append(key, values[key]);
							}
						}

						// Dispatch your API call action
						await dispatch(updateKyc(formData)); // You’ll define `updateKyc` next
						// await dispatch(updateKyc(formData, userId));
						navigation.navigate("Verification");
					} catch (error) {
						console.error("KYC UPDATE error: ", error);
						Alert.alert(
							"Submission Error",
							"Failed to submit KYC. Please try again."
						);
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
					setFieldValue,
				}) => {
					// filling all field checked for button submission disable
					const allFieldsFilled =
						values.address &&
						values.bvn &&
						values.dateOfBirth &&
						values.documentImage?.uri && // we stored full object now
						values.documentType &&
						values.occupation &&
						values.phoneNumber &&
						values.placeOfWork;

					const hasErrors = Object.keys(errors).length > 0;
					return (
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
													<Text style={styles.error__message}>
														{errors.bvn}
													</Text>
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
												selectedValue={values.documentType}
												onValueChange={(value) =>
													setFieldValue("documentType", value)
												}
												placeholder="Select ID Type"
											/>

											{errors.documentType && touched.documentType && (
												<Text style={styles.error__message}>
													{errors.documentType}
												</Text>
											)}
										</View>

										{/* Document Image Upload */}
										<View style={styles.imageUploadContainer}>
											<Text style={styles.label}>Upload ID Image</Text>
											<TouchableOpacity
												// onPress={() => handleUpload()} // Pass setFieldValue to access Formik's state
												onPress={() => pickImage(setFieldValue)} // Pass setFieldValue to access Formik's state
												style={styles.imageSelectButton}
											>
												<Icon name="image" size={24} color="purple" />
												<Text style={styles.imageSelectButtonText}>
													Select Image
												</Text>
											</TouchableOpacity>

											{values.documentImage && values.documentImage.uri && (
												<View style={styles.imagePreviewContainer}>
													<Image
														source={{ uri: values.documentImage.uri }}
														style={styles.previewImage}
													/>
													<Text style={styles.selectedFileName}>
														{values.documentImage.fileName || "Image Selected"}{" "}
														({(values.documentImage.fileSize / 1024).toFixed(2)}{" "}
														KB)
													</Text>
												</View>
											)}

											{errors.documentImage && touched.documentImage && (
												<Text style={styles.error__message}>
													{errors.documentImage}
												</Text>
											)}
										</View>

										<View>
											<TouchableOpacity
												style={[
													styles.login__btn,
													allFieldsFilled && !hasErrors
														? styles.submitButtonActive
														: styles.submitButtonDisabled,
												]}
												onPress={handleSubmit}
												disabled={!allFieldsFilled || hasErrors}
											>
												<Text style={styles.login__text_btn}>
													{loadingKyc ? (
														<ActivityIndicator size="large" color="#fff" />
													) : (
														"Submit KYC"
													)}
												</Text>
											</TouchableOpacity>
										</View>
									</View>
								</View>
							</ScrollView>
						</KeyboardAvoidingView>
					);
				}}
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
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},

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
		marginTop: 40,
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

	imageUploadContainer: {
		marginTop: 20,
		marginBottom: 20,
	},

	label: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#555",
		marginBottom: 5,
		marginTop: 15,
	},

	imageSelectButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#e0f7fa", // Light blue background
		paddingVertical: 15,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "purple",
		shadowColor: "#007bff",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},

	imageSelectButtonText: {
		fontSize: 18,
		color: "purple",
		fontWeight: "bold",
		marginLeft: 10,
	},

	imagePreviewContainer: {
		marginTop: 15,
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 10,
		padding: 10,
		backgroundColor: "#f9f9f9",
	},
	previewImage: {
		width: 150,
		height: 150,
		borderRadius: 5,
		resizeMode: "contain",
		marginBottom: 10,
	},
	selectedFileName: {
		fontSize: 14,
		color: "#555",
		fontStyle: "italic",
	},
});
