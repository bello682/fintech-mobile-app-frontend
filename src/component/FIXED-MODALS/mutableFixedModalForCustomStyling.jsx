// ======================================= FEATURES =======================================
// | Feature                | Supported         |
// | ---------------------- | ----------------- |
// | Dynamic content        | ✅ via `children`  |
// | Style overrides        | ✅ via style props |
// | Navigation on "Yes"    | ✅                 |
// | Full animation         | ✅                 |
// | Reusability            | ✅                 |
// | Clean + human readable | ✅                 |

// components/MutableFixedGlobalPopupModalForCustomStyling.js

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

const { width } = Dimensions.get("window");

const MutableFixedGlobalPopupModalForCustomStyling = ({
	modalVisible,
	onClose,
	title = "Confirmation",
	message = "Are you sure you want to proceed?",
	iconName = "warning-outline",
	iconColor = "#800080",
	yesText = "Yes",
	noText = "No",
	navigateTo = null,
	children = null,

	// 🔥 Style mutation props
	modalContainerStyle = {},
	titleStyle = {},
	iconStyle = {},
	messageStyle = {},
	buttonContainerStyle = {},
	yesButtonStyle = {},
	noButtonStyle = {},
	yesButtonTextStyle = {},
	noButtonTextStyle = {},
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
		onClose();
		if (navigateTo) navigation.navigate(navigateTo);
	};

	return (
		<Modal animationType="fade" transparent visible={modalVisible}>
			<View style={styles.overlay}>
				<Animated.View
					style={[
						styles.modalContainer,
						modalContainerStyle,
						{ transform: [{ scale: scaleValue }] },
					]}
				>
					{/* Icon */}
					<View style={[styles.iconWrapper, iconStyle]}>
						<Ionicons name={iconName} size={40} color={iconColor} />
					</View>

					{/* Title */}
					<Text style={[styles.title, titleStyle]}>{title}</Text>

					{/* Content or Custom Children */}
					<View style={styles.contentWrapper}>
						{children ? (
							children
						) : (
							<Text style={[styles.message, messageStyle]}>{message}</Text>
						)}
					</View>

					{/* Buttons */}
					<View style={[styles.buttonRow, buttonContainerStyle]}>
						<TouchableOpacity
							style={[styles.button, styles.noButton, noButtonStyle]}
							onPress={onClose}
						>
							<Text style={[styles.buttonText, noButtonTextStyle]}>
								{noText}
							</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={[styles.button, styles.yesButton, yesButtonStyle]}
							onPress={handleYes}
						>
							<Text style={[styles.buttonText, yesButtonTextStyle]}>
								{yesText}
							</Text>
						</TouchableOpacity>
					</View>
				</Animated.View>
			</View>
		</Modal>
	);
};

export default MutableFixedGlobalPopupModalForCustomStyling;

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.5)",
		justifyContent: "center",
		alignItems: "center",
	},
	modalContainer: {
		width: width * 0.85,
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
		textAlign: "center",
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

// ===================================== HOW TO USE THE MutableFixedGlobalPopupModalForCustomStyling {✅ Example: Custom Usage with Styles}  =====================================

{
	/* <MutableFixedGlobalPopupModalForCustomStyling
	modalVisible={modalVisible}
	onClose={() => setModalVisible(false)}
	title="Logout?"
	message="You're about to log out of the app."
	yesText="Logout"
	noText="Stay"
	iconName="log-out-outline"
	iconColor="red"
	navigateTo="Login"
	// 🔥 Custom styling props
	modalContainerStyle={{ backgroundColor: "#fef6f6" }}
	titleStyle={{ color: "red" }}
	messageStyle={{ color: "#444" }}
	yesButtonStyle={{ backgroundColor: "red" }}
	noButtonStyle={{ backgroundColor: "gray" }}
	yesButtonTextStyle={{ fontWeight: "bold" }}
	noButtonTextStyle={{ fontWeight: "bold" }}
/>; */
}

// ===================================== HOW TO USE THE MutableFixedGlobalPopupModalForCustomStyling FOR CONTENTS LIKE (✅ To Use Custom Content (like a form or image)) =====================================

{
	/* <MutableFixedGlobalPopupModalForCustomStyling
  modalVisible={modalVisible}
	onClose={() => setModalVisible(false)}
	title="Logout?"
	message="You're about to log out of the app."
	yesText="Logout"
	noText="Stay"
	iconName="log-out-outline"
	iconColor="red"
	navigateTo="Login"
	// 🔥 Custom styling props
	modalContainerStyle={{ backgroundColor: "#fef6f6" }}
	titleStyle={{ color: "red" }}
	messageStyle={{ color: "#444" }}
	yesButtonStyle={{ backgroundColor: "red" }}
	noButtonStyle={{ backgroundColor: "gray" }}
	yesButtonTextStyle={{ fontWeight: "bold" }}
	noButtonTextStyle={{ fontWeight: "bold" }}
>
  <Text style={{ fontSize: 16 }}>This is custom content inside the modal</Text>
</MutableFixedGlobalPopupModalForCustomStyling> */
}
