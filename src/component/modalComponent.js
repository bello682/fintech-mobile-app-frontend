// GlobalPopupModal.js
import React from "react";
import {
	Modal,
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
} from "react-native";

const GlobalPopupModal = ({
	visible,
	title,
	message,
	onClose,
	onConfirm,
	confirmText = "Confirm",
	cancelText = "Cancel",
}) => {
	return (
		<Modal
			transparent={true}
			visible={visible}
			animationType="fade"
			onRequestClose={onClose} // Handles back button press on Android
		>
			<View style={styles.modalOverlay}>
				<View style={styles.modalContainer}>
					<Text style={styles.title}>{title}</Text>
					<Text style={styles.message}>{message}</Text>

					<View style={styles.buttonContainer}>
						<TouchableOpacity style={styles.cancelButton} onPress={onClose}>
							<Text style={styles.cancelText}>{cancelText}</Text>
						</TouchableOpacity>

						<TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
							<Text style={styles.confirmText}>{confirmText}</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	);
};

export default GlobalPopupModal;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
	modalOverlay: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparent background
	},
	modalContainer: {
		width: width * 0.8,
		backgroundColor: "white",
		borderRadius: 10,
		padding: 20,
		elevation: 10,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.8,
		shadowRadius: 2,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 10,
	},
	message: {
		fontSize: 16,
		textAlign: "center",
		marginBottom: 20,
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
	},
	cancelButton: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		backgroundColor: "#d3d3d3",
		borderRadius: 5,
	},
	confirmButton: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		backgroundColor: "purple",
		borderRadius: 5,
	},
	cancelText: {
		color: "black",
		fontSize: 16,
		fontWeight: "500",
	},
	confirmText: {
		color: "white",
		fontSize: 16,
		fontWeight: "500",
	},
});
