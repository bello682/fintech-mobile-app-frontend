import React, { useState } from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserById } from "../store/action/deleteUserAction";
import { useNavigation } from "@react-navigation/native";
import GlobalPopupModal from "../component/modalComponent"; // Modal for confirmation

const DeleteUserComponent = () => {
	// Correct state initialization using array destructuring
	const [showGlobalPopupModal, setShowGlobalPopupModal] = useState(false);

	const dispatch = useDispatch();
	const navigation = useNavigation();

	// Get state from Redux store
	const { loading, successMessage, error } = useSelector(
		(state) => state.deleteUserState
	);
	const { user } = useSelector((state) => state.loginState);

	const userID = user?.user?.id; // Extract the user ID from login state

	const firstName = user?.user?.fullName?.split(" ")[0];

	// Function to handle account deletion
	const handleDelete = async () => {
		if (!userID) {
			console.log("Invalid or undefined userID:", userID);
			return;
		}

		// Dispatch the delete action
		await dispatch(deleteUserById(userID));
		navigation.navigate("SignUp");
	};

	// Function to show the confirmation modal
	const showDeleteConfirmationModal = () => {
		setShowGlobalPopupModal(true);
	};

	// Function to hide the confirmation modal
	const hideDeleteConfirmationModal = () => {
		setShowGlobalPopupModal(false);
	};

	// Show a loading indicator while the delete action is in progress
	if (loading) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size="large" color="#0000ff" />
				<Text style={{ color: "purple", fontSize: 20 }}>Deleting user...</Text>
			</View>
		);
	}

	return (
		<>
			<View>
				<Button
					title="Deactivate Account"
					onPress={showDeleteConfirmationModal}
				/>
			</View>

			{
				// Show the global confirmation modal
				showGlobalPopupModal && (
					<GlobalPopupModal
						visible={showGlobalPopupModal}
						title="Deactivate Account"
						message={`${firstName}, Are you sure you want to deactivate your account?`}
						confirmText="Yes Deactivate"
						cancelText="No"
						onConfirm={() => {
							hideDeleteConfirmationModal(); // Close modal
							handleDelete(); // Perform deletion after confirmation
						}}
						onClose={hideDeleteConfirmationModal} // Close the modal on cancel
					/>
				)
			}
		</>
	);
};

export default DeleteUserComponent;
