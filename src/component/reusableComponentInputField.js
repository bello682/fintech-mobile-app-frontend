// Separate reusable input field component
// InputField.js
import React from "react";
import { TextInput, Text, View, StyleSheet } from "react-native";

const InputField = ({
	label,
	placeholder,
	value,
	onChangeText,
	onBlur,
	error,
}) => {
	return (
		<View style={styles.inputWrapper}>
			{label && <Text style={styles.label}>{label}</Text>}
			<TextInput
				style={[styles.input, error ? styles.errorBorder : null]}
				placeholder={placeholder}
				value={value}
				onChangeText={onChangeText}
				onBlur={onBlur}
			/>
			{error && <Text style={styles.errorMessage}>{error}</Text>}
		</View>
	);
};

export default InputField;

const styles = StyleSheet.create({
	inputWrapper: {
		marginBottom: 20,
	},
	label: {
		fontWeight: "bold",
		marginBottom: 8,
	},
	input: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 10,
		padding: 10,
	},
	errorBorder: {
		borderColor: "red",
	},
	errorMessage: {
		color: "red",
		marginTop: 5,
	},
});
