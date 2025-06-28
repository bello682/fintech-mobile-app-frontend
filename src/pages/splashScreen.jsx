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
		}, 1500);
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
				duration={2000}
			>
				{/* <Text style={styles.welcomeText}>Welcome to GuarantyBank</Text> */}
			</Animated.View>
		</View>
	);
};

export default SplashScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		justifyContent: "center",
		alignItems: "center",
	},
	logoWrapper: {
		position: "absolute",
		left: 225, // Center
	},
	logo: {
		width: 100,
		height: 100,
		resizeMode: "contain",
	},
	textWrapper: {
		position: "absolute",
		left: Dimensions.get("window").width / 2 + 30,
	},
	welcomeText: {
		fontSize: 20,
		fontWeight: "extrabold",
		color: "purple",
	},
});
