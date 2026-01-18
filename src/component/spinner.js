// import React, { useEffect, useRef } from "react";
// import { Animated, StyleSheet, View, Text } from "react-native";

// const SpinningLoader = () => {
// 	const spinValue = useRef(new Animated.Value(0)).current;

// 	useEffect(() => {
// 		const spinAnimation = Animated.loop(
// 			Animated.timing(spinValue, {
// 				toValue: 1,
// 				duration: 1000, // 1 second per rotation
// 				useNativeDriver: true, // Enable native driver for smoother animation
// 			})
// 		);
// 		spinAnimation.start();

// 		return () => spinAnimation.stop(); // Clean up the animation on component unmount
// 	}, [spinValue]);

// 	// Interpolate spinValue to rotate
// 	const spin = spinValue.interpolate({
// 		inputRange: [0, 1],
// 		outputRange: ["0deg", "360deg"],
// 	});

// 	return (
// 		<View style={styles.overlay}>
// 			<View style={styles.container}>
// 				<Animated.View
// 					style={[styles.loader, { transform: [{ rotate: spin }] }]}
// 				/>
// 				<Text style={styles.text}>Processing, please wait....</Text>
// 			</View>
// 		</View>
// 	);
// };

// export default SpinningLoader;

// const styles = StyleSheet.create({
// 	overlay: {
// 		...StyleSheet.absoluteFillObject, // Cover the whole screen
// 		backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
// 		justifyContent: "center",
// 		alignItems: "center",
// 	},
// 	container: {
// 		justifyContent: "center",
// 		alignItems: "center",
// 	},
// 	loader: {
// 		width: 50,
// 		height: 50,
// 		borderWidth: 5,
// 		borderColor: "red",
// 		borderTopColor: "white", // Color of the spinning part
// 		borderRadius: 50,
// 	},
// 	text: {
// 		marginTop: 10,
// 		color: "#fff", // White text to be visible on dark background
// 		fontSize: 16,
// 	},
// });

// ============= CUBE LOADING =============================
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";

const CubeLoader = () => {
	const [activeCube, setActiveCube] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setActiveCube((prevCube) => (prevCube + 1) % 7); // Loop back after the 7th cube
		}, 300); // Adjust the speed as necessary (300ms here)

		return () => clearInterval(interval); // Cleanup interval on unmount
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.cubeWrapper}>
				{[...Array(7)].map((_, index) => (
					<View
						key={index}
						style={[
							styles.cube,
							activeCube === index && styles.activeCube, // Highlight the active cube
						]}
					/>
				))}
			</View>
			<Text style={styles.text}>Processing, please wait....</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1, // Take up full screen height
		justifyContent: "center", // Center vertically
		alignItems: "center", // Center horizontally
		backgroundColor: "transparent", // Transparent background
	},
	cubeWrapper: {
		flexDirection: "row", // Display cubes in a row
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 20, // Space between the cubes and the text
	},
	cube: {
		width: 10,
		height: 10,
		backgroundColor: "#ccc", // Default color for inactive cubes
		margin: 5,
	},
	activeCube: {
		backgroundColor: "purple", // Color of the active cube
	},
	text: {
		fontSize: 16,
		color: "#333",
	},
});

export default CubeLoader;
