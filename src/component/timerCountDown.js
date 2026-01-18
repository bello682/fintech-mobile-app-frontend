// CountdownTimer.js
// import React, { useState, useEffect, useRef } from "react";
// import { Text, View } from "react-native";
// import { useIsFocused } from "@react-navigation/native"; // Hook to check if the screen is focused

// const CountdownTimer = ({ onExpire, errorMsg }) => {
// 	const [secondsLeft, setSecondsLeft] = useState(60); // Set the time limit here (e.g., 60 seconds)
// 	const [isPaused, setIsPaused] = useState(false); // To track if the timer is paused
// 	const isFocused = useIsFocused(); // Determine if the page is in focus
// 	let timerInterval = useRef(); // Use ref to track the interval

// 	useEffect(() => {
// 		// let timeRemaining = 300; // 5 minutes in seconds
// 		// let timeRemaining = 120; // 2 minutes in seconds
// 		let timeRemaining = 60; // Reset time every time page is focused

// 		if (isFocused && !errorMsg && !isPaused) {
// 			// Start the timer when the page is focused, and there's no error
// 			timerInterval.current = setInterval(() => {
// 				timeRemaining -= 1;
// 				setSecondsLeft(timeRemaining);

// 				if (timeRemaining <= 0) {
// 					clearInterval(timerInterval.current);
// 					if (onExpire) {
// 						onExpire();
// 					}
// 				}
// 			}, 1000);
// 		}

// 		// Pause the timer if there's an error message
// 		if (errorMsg) {
// 			clearInterval(timerInterval.current);
// 			setIsPaused(true); // Pause the timer
// 			// Automatically hide error and resume after 10 seconds
// 			setTimeout(() => {
// 				setIsPaused(false); // Unpause the timer
// 			}, 10000); // 10 seconds delay
// 		}

// 		// Cleanup interval when the page is unfocused or unmounted
// 		return () => clearInterval(timerInterval.current);
// 	}, [isFocused, errorMsg, isPaused]); // Reset the timer when the page comes back into focus

// 	const formatTime = () => {
// 		const minutes = Math.floor(secondsLeft / 60);
// 		const seconds = secondsLeft % 60;
// 		return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
// 	};

// 	return (
// 		<View>
// 			<Text style={{ color: "red" }}>
// 				{secondsLeft > 0
// 					? formatTime()
// 					: "OTP expired, please request a new code"}
// 			</Text>
// 		</View>
// 	);
// };

// export default CountdownTimer;

import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { useIsFocused } from "@react-navigation/native"; // Hook to check if the screen is focused

const CountdownTimer = ({ onExpire }) => {
	// const [secondsLeft, setSecondsLeft] = useState(60); // Set the time limit here (e.g., 60 seconds)
	const [secondsLeft, setSecondsLeft] = useState(300); // Set the time limit here (e.g., 5 minute)
	const isFocused = useIsFocused(); // Determine if the page is in focus
	let timerInterval = null;

	useEffect(() => {
		let timeRemaining = 300; // 5 minutes in seconds
		// let timeRemaining = 120; // 2 minutes in seconds
		// let timeRemaining = 60; // Reset time every time page is focused

		if (isFocused) {
			// Start the timer when the page is focused
			timerInterval = setInterval(() => {
				timeRemaining -= 1;
				setSecondsLeft(timeRemaining);

				if (timeRemaining <= 0) {
					clearInterval(timerInterval);
					if (onExpire) {
						onExpire();
					}
				}
			}, 1000);
		}

		// Cleanup interval when the page is unfocused or unmounted
		return () => {
			clearInterval(timerInterval);
		};
	}, [isFocused]); // Reset the timer when the page comes back into focus

	const formatTime = () => {
		const minutes = Math.floor(secondsLeft / 60);
		const seconds = secondsLeft % 60;
		return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
	};

	return (
		<View>
			<Text style={{ color: "red" }}>
				{secondsLeft > 0
					? formatTime()
					: "OTP expired, please request a new code"}
			</Text>
		</View>
	);
};

export default CountdownTimer;
