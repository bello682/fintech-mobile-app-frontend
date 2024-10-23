import React from "react";
import Toast from "react-native-toast-message";

const CustomToast = ({ type, message }) => {
	return (
		<Toast
			type={type}
			text1={type === "success" ? "Success" : "Error"}
			text2={message}
			position="bottom"
			visibilityTime={3000}
		/>
	);
};

export default CustomToast;

// Another example of a custom

export const showToast = (type, message) => {
	Toast.show({
		type: type,
		text1: type === "success" ? "Success" : "Error",
		text2: message,
		position: "top",
		visibilityTime: 7000,
	});
};
