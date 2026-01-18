import { StyleSheet, Text, View } from "react-native";
import { Link } from "@react-navigation/native";
import React from "react";
import LogoutComponent from "../logout";
import DeleteUserComponent from "../deleteUserAccount";

const SettingsScreen = () => {
	return (
		<View>
			<Text>Settings Screen</Text>
			{/* <Link to={"/Login"} style={styles.link_sign_navigate}>
				Logout
			</Link> */}
			<LogoutComponent />
			<DeleteUserComponent />
		</View>
	);
};

export default SettingsScreen;

const styles = StyleSheet.create({});
