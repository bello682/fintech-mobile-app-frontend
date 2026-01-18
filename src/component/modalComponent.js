// // GlobalPopupModal.js
// import React from "react";
// import {
// 	Modal,
// 	View,
// 	Text,
// 	TouchableOpacity,
// 	StyleSheet,
// 	Dimensions,
// } from "react-native";

// const GlobalPopupModal = ({
// 	visible,
// 	title,
// 	message,
// 	onClose,
// 	onConfirm,
// 	confirmText = "Confirm",
// 	cancelText = "Cancel",
// }) => {
// 	return (
// 		<Modal
// 			transparent={true}
// 			visible={visible}
// 			animationType="fade"
// 			onRequestClose={onClose}
// 			// overflow="scroll" // Prevents the modal from scrolling on iOS
// 			style={styles.ModalWrap} // Handles back button press on Android
// 		>
// 			<View style={styles.modalOverlay}>
// 				<View style={styles.modalContainer}>
// 					<Text style={styles.title}>{title}</Text>
// 					<Text style={styles.message}>{message}</Text>

// 					<View style={styles.buttonContainer}>
// 						<TouchableOpacity style={styles.cancelButton} onPress={onClose}>
// 							<Text style={styles.cancelText}>{cancelText}</Text>
// 						</TouchableOpacity>

// 						<TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
// 							<Text style={styles.confirmText}>{confirmText}</Text>
// 						</TouchableOpacity>
// 					</View>
// 				</View>
// 			</View>
// 		</Modal>
// 	);
// };

// export default GlobalPopupModal;

// const { width, height } = Dimensions.get("window");

// const styles = StyleSheet.create({
// 	ModalWrap: {
// 		overflow: "scroll",
// 	},
// 	modalOverlay: {
// 		flex: 1,
// 		justifyContent: "center",
// 		alignItems: "center",
// 		backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparent background
// 	},
// 	modalContainer: {
// 		width: width * 0.8,
// 		backgroundColor: "white",
// 		borderRadius: 10,
// 		padding: 20,
// 		elevation: 10,
// 		shadowColor: "#000",
// 		shadowOffset: { width: 0, height: 2 },
// 		shadowOpacity: 0.8,
// 		shadowRadius: 2,
// 	},
// 	title: {
// 		fontSize: 20,
// 		fontWeight: "bold",
// 		textAlign: "center",
// 		marginBottom: 10,
// 	},
// 	message: {
// 		fontSize: 16,
// 		textAlign: "center",
// 		marginBottom: 20,
// 	},
// 	buttonContainer: {
// 		flexDirection: "row",
// 		justifyContent: "space-around",
// 	},
// 	cancelButton: {
// 		paddingVertical: 10,
// 		paddingHorizontal: 20,
// 		backgroundColor: "#d3d3d3",
// 		borderRadius: 5,
// 	},
// 	confirmButton: {
// 		paddingVertical: 10,
// 		paddingHorizontal: 20,
// 		backgroundColor: "purple",
// 		borderRadius: 5,
// 	},
// 	cancelText: {
// 		color: "black",
// 		fontSize: 16,
// 		fontWeight: "500",
// 	},
// 	confirmText: {
// 		color: "white",
// 		fontSize: 16,
// 		fontWeight: "500",
// 	},
// });

// GlobalPopupModal.js
import React from "react";
import {
	Modal,
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
	ScrollView, // Import ScrollView
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
			// No need for 'style={styles.ModalWrap}' on Modal itself for scrolling content
		>
			<View style={styles.modalOverlay}>
				<View style={styles.modalContainer}>
					<Text style={styles.title}>{title}</Text>

					{/* Wrap the message Text component in a ScrollView */}
					<ScrollView style={styles.messageScrollView}>
						<Text style={styles.message}>{message}</Text>
					</ScrollView>

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
	// ModalWrap is not necessary for content scrolling, remove it or keep for other purposes
	// ModalWrap: {
	//     overflow: "scroll",
	// },
	modalOverlay: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparent background
	},
	modalContainer: {
		width: width * 0.8,
		// Set a maximum height for the modal container so it doesn't take up the whole screen
		// and allows the content within to scroll.
		maxHeight: height * 0.8, // Example: 80% of screen height
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
	// Style for the ScrollView itself
	messageScrollView: {
		// flexGrow: 1 is for contentContainerStyle.
		// For the ScrollView style, you might set a max height if needed,
		// but typically it grows to fit content up to the parent's available space
		// and then enables scrolling.
		// Add padding bottom to ensure buttons aren't immediately after text
		marginBottom: 20, // Add space above buttons
	},
	message: {
		fontSize: 16,
		textAlign: "center",
		// No marginBottom here, as it's within ScrollView.
		// The ScrollView itself now provides the spacing from buttons.
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: "auto", // Push buttons to the bottom of the modal content
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
