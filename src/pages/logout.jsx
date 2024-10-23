import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/action/logoutAction";
import { Button } from "react-native";

const LogoutComponent = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const { loading, errorMessage } = useSelector((state) => state.logout);

	const handleLogout = async () => {
		await dispatch(logoutUser());
		// only navigate if logged out successfully
		navigation.navigate("Login");
	};

	if (loading) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		);
	}

	return (
		<View>
			<TouchableOpacity onPress={handleLogout} disabled={loading}>
				<Text>Logout</Text>
				{/* <Button title="Logout" /> */}
			</TouchableOpacity>
		</View>
	);
};

export default LogoutComponent;
