// ======================================= FEATURES =======================================
// | Feature                                   | Done ✅ |
// | ----------------------------------------- | ------ |
// | Overlay with animation                    | ✅      |
// | Cannot dismiss by tapping outside         | ✅      |
// | "Yes" and "No" buttons, customizable text | ✅      |
// | Navigation link in "Yes" button           | ✅      |
// | Pass any content and icons                | ✅      |
// | Beautiful design with animations          | ✅      |
// | Fully reusable                            | ✅      |
// | Easy to understand                        | ✅      |

// components/GlobalPopupModal.js

import React from "react";
import {
	View,
	Text,
	Modal,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
	Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const FixedGlobalPopupModal = ({
	modalVisible,
	onClose,
	title = "Confirmation",
	message = "Are you sure you want to proceed?",
	iconName = "warning-outline",
	iconColor = "#800080",
	yesText = "Yes",
	noText = "No",
	navigateTo = null,
	children = null, // optional custom content
}) => {
	const navigation = useNavigation();
	const scaleValue = new Animated.Value(0);

	React.useEffect(() => {
		if (modalVisible) {
			Animated.spring(scaleValue, {
				toValue: 1,
				useNativeDriver: true,
			}).start();
		} else {
			scaleValue.setValue(0);
		}
	}, [modalVisible]);

	const handleYes = () => {
		onClose(); // hide modal
		if (navigateTo) {
			navigation.navigate(navigateTo);
		}
	};

	return (
		<Modal
			animationType="fade"
			transparent
			visible={modalVisible}
			onRequestClose={() => {}} // Disable back button dismiss
		>
			<View style={styles.overlay}>
				<Animated.View
					style={[
						styles.modalContainer,
						{ transform: [{ scale: scaleValue }] },
					]}
				>
					{/* ICON */}
					<View style={styles.iconWrapper}>
						<Ionicons name={iconName} size={40} color={iconColor} />
					</View>

					{/* TITLE */}
					<Text style={styles.title}>{title}</Text>

					{/* MESSAGE or CUSTOM CONTENT */}
					<View style={styles.contentWrapper}>
						{children ? (
							children
						) : (
							<Text style={styles.message}>{message}</Text>
						)}
					</View>

					{/* ACTION BUTTONS */}
					<View style={styles.buttonRow}>
						<TouchableOpacity
							style={[styles.button, styles.noButton]}
							onPress={onClose}
						>
							<Text style={styles.buttonText}>{noText}</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={[styles.button, styles.yesButton]}
							onPress={handleYes}
						>
							<Text style={styles.buttonText}>{yesText}</Text>
						</TouchableOpacity>
					</View>
				</Animated.View>
			</View>
		</Modal>
	);
};

export default FixedGlobalPopupModal;

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.5)",
		justifyContent: "center",
		alignItems: "center",
	},
	modalContainer: {
		width: width * 0.8,
		backgroundColor: "#fff",
		borderRadius: 20,
		padding: 20,
		alignItems: "center",
		elevation: 10,
	},
	iconWrapper: {
		marginBottom: 10,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#333",
		marginBottom: 10,
	},
	contentWrapper: {
		marginBottom: 20,
	},
	message: {
		fontSize: 16,
		color: "#555",
		textAlign: "center",
	},
	buttonRow: {
		flexDirection: "row",
		gap: 15,
	},
	button: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 12,
	},
	noButton: {
		backgroundColor: "#ccc",
	},
	yesButton: {
		backgroundColor: "#800080",
	},
	buttonText: {
		color: "#fff",
		fontWeight: "600",
	},
});

// ===================================== HOW TO USE THE FixedGlobalPopupModal  =====================================

// In any screen component

// import React, { useState } from "react";
// import { View, Button, Text } from "react-native";
// import GlobalPopupModal from "../components/GlobalPopupModal";

// const HomeScreen = () => {
//   const [modalVisible, setModalVisible] = useState(false);

//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Button title="Show Modal" onPress={() => setModalVisible(true)} />

//       <GlobalPopupModal
//         modalVisible={modalVisible}
//         onClose={() => setModalVisible(false)}
//         title="Delete Account?"
//         message="Are you sure you want to delete your account permanently?"
//         iconName="trash-outline"
//         iconColor="#E53935"
//         yesText="Delete"
//         noText="Cancel"
//         navigateTo="SuccessScreen" // Navigate to this screen on "Yes"
//       />
//     </View>
//   );
// };

// export default HomeScreen;

// ===================================== HOW TO USE THE FixedGlobalPopupModal FOR CONTENTS LIKE (✅ To Use Custom Content (like a form or image)) =====================================

{
	/* <GlobalPopupModal
  modalVisible={modalVisible}
  onClose={() => setModalVisible(false)}
  title="Custom Modal"
  yesText="Okay"
  noText="Dismiss"
>
  <Text style={{ fontSize: 16 }}>This is custom content inside the modal</Text>
</GlobalPopupModal> */
}
