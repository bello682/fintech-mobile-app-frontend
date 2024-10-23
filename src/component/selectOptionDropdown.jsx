// GlobalSelect.js
import React, { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	FlatList,
	Modal,
	StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Optional, for icons

const GlobalSelect = ({
	options,
	selectedValue,
	onValueChange,
	placeholder,
}) => {
	const [isModalVisible, setModalVisible] = useState(false);
	const [selectedOption, setSelectedOption] = useState(selectedValue || "");

	const handleOptionPress = (option) => {
		setSelectedOption(option);
		onValueChange(option);
		setModalVisible(false);
	};

	return (
		<View>
			{/* Touchable to open the dropdown */}
			<TouchableOpacity
				style={styles.selectBox}
				onPress={() => setModalVisible(true)}
			>
				<Text style={styles.selectedText}>
					{selectedOption ? selectedOption : placeholder || "Select an option"}
				</Text>
				<Icon name="chevron-down" size={14} color="#444" />
			</TouchableOpacity>

			{/* Modal for dropdown options */}
			<Modal transparent={true} visible={isModalVisible} animationType="fade">
				<TouchableOpacity
					style={styles.modalOverlay}
					onPress={() => setModalVisible(false)}
				/>
				<View style={styles.modalContainer}>
					<FlatList
						data={options}
						keyExtractor={(item) => item}
						renderItem={({ item }) => (
							<TouchableOpacity
								style={styles.option}
								onPress={() => handleOptionPress(item)}
							>
								<Text style={styles.optionText}>{item}</Text>
							</TouchableOpacity>
						)}
					/>
				</View>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	selectBox: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		paddingVertical: 10,
		paddingHorizontal: 15,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: "#fff",
		marginVertical: 5,
	},
	selectedText: {
		fontSize: 16,
		color: "#444",
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalContainer: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: "#fff",
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		padding: 20,
	},
	option: {
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: "#eee",
	},
	optionText: {
		fontSize: 16,
		color: "#333",
	},
});

export default GlobalSelect;
