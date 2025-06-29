// src/screens/SplashScreen.js
import React, { useEffect, useRef } from "react";
import * as Animatable from "react-native-animatable";
import {
	View,
	Text,
	Image,
	StyleSheet,
	Animated,
	Dimensions,
} from "react-native";

const SplashScreen = ({ navigation }) => {
	useEffect(() => {
		// Wait and go to main welcome screen
		setTimeout(() => {
			navigation.replace("Welcome"); // Navigate to your main welcome screen
		}, 3000);
	}, []);

	return (
		<View style={styles.container}>
			<Animatable.View
				style={[styles.logoWrapper, { opacity: 1 }]}
				animation="slideInRight"
				duration={1500}
			>
				<Image
					source={require("../asset/newlogo.png")} // Replace with your actual logo path
					style={styles.logo}
				/>
			</Animatable.View>

			<Animated.View
				style={[styles.textWrapper, { opacity: 1 }]}
				animation="fadeInRight"
				duration={3000}
			>
				<Text style={styles.welcomeText}>Welcome to GuarantyBank</Text>
			</Animated.View>
		</View>
	);
};

export default SplashScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		backgroundColor: "#fff",
		justifyContent: "center",
		alignItems: "center",
	},
	logo: {
		width: 100,
		height: 100,
		resizeMode: "contain",
	},
	textWrapper: {},
	welcomeText: {
		fontSize: 30,
		fontWeight: "extrabold",
		color: "purple",
	},
});
