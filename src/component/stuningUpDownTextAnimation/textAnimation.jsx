import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";
import { Text, View } from "react-native-web";

const TextAnimation = () => {
	const dataText = [
		<Text style={{ color: "red", fontWeight: "700" }}>
			Update your KYC now to access full capacity
		</Text>,
		<Text style={{ color: "blue", fontWeight: "700" }}>
			please urge you to complete your KYC now to meet you needs
		</Text>,
		<Text style={{ color: "green", fontWeight: "700" }}>
			Update!! Update!! now your KYC
		</Text>,
	];

	const animatedValue = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		const animations = () => {
			const forwardAnimation = dataText.map((_, i) => {
				Animated.timing(animatedValue, {
					toValue: -i * 50,
					duration: 500,
					useNativeDriver: true,
				});
			});

			const reverseAnimation = dataText.map((_, i) => {
				Animated.timing(animatedValue, {
					toValue: -(dataText.length - i - 1) * 50,
					duration: 500,
					useNativeDriver: true,
				});
			});

			Animated.loop(
				Animated.sequence([
					...forwardAnimation.map((anim) =>
						Animated.sequence([anim, Animated.delay(1500)])
					),
					...reverseAnimation.map((anim) =>
						Animated.sequence([anim, Animated.delay(1500)])
					),
				])
			).start();
		};

		animations();
	}, []);

	return (
		<View style={styles.textAnimationContainer}>
			<Animated.View style={styles.textAnimationWrapper}>
				<View
					style={
						styles.textAnimationWrapText[
							{ transform: { translateY: animatedValue } }
						]
					}
				>
					{dataText.map((item, index) => {
						return (
							<View key={index} style={styles.textAnimationTextMapView}>
								<Text style={styles.textAnimationText}>{item}</Text>
							</View>
						);
					})}
				</View>
			</Animated.View>
		</View>
	);
};

export default TextAnimation;

const styles = StyleSheet.create({
	textAnimationContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
	},

	textAnimationWrapper: {
		width: 200,
		height: 50,
		overflow: "hidden",
		alignItems: "center",
	},

	// textAnimationWrapText {

	// },

	textAnimationTextMapView: {
		height: 50,
		justifyContent: "center",
		alignItems: "center",
	},

	textAnimationText: {
		fontSize: 20,
		color: "black",
	},
});
