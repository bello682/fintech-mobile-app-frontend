import React, { useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getGreeting } from "../component/getGreetings";
import { fetchUserById } from "../store/action/fetchUserByIdAction";

const DashboardUser = () => {
	const dispatch = useDispatch();
	const { profile, loading, error } = useSelector(
		(state) => state.userProfileFetch
	);
	const { user } = useSelector((state) => state.loginState);

	const userID = user?.user?.id;

	// Extract just the first name from the full name
	const firstName = profile?.data?.fullName?.split(" ")[0];

	useEffect(() => {
		if (userID) {
			// Fetch user profile by userID
			dispatch(fetchUserById(userID));
		} else {
			console.log("Invalid or undefined userID: ", userID);
		}
	}, [dispatch, userID]);

	if (loading) {
		return <ActivityIndicator size="large" color="purple" />;
	}

	if (error) {
		return <Text>Error: {error}</Text>;
	}

	return (
		<>
			<ScrollView style={styles.container}>
				{/* Header */}
				<View style={styles.header}>
					<View>
						<Text style={styles.headerText}>
							{getGreeting()} {firstName}
						</Text>
						<Text style={styles.subHeaderText}>Your Banking Dashboard</Text>
					</View>
				</View>

				{/* Balance Section */}
				<View style={styles.balanceSection}>
					<Text style={styles.balanceTitle}>Current Balance</Text>
					<Text style={styles.balanceAmount}>$12,345.67</Text>
					<TouchableOpacity style={styles.actionButton}>
						<Text style={styles.buttonText}>Deposit Funds</Text>
					</TouchableOpacity>
				</View>

				{/* Quick Actions */}
				<View style={styles.quickActions}>
					<TouchableOpacity style={styles.quickActionButton}>
						<Text style={styles.quickActionText}>Transfer</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.quickActionButton}>
						<Text style={styles.quickActionText}>Pay Bills</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.quickActionButton}>
						<Text style={styles.quickActionText}>View Statements</Text>
					</TouchableOpacity>
				</View>

				{/* Transaction History */}
				<View style={styles.transactionHistory}>
					<Text style={styles.transactionTitle}>Recent Transactions</Text>
					<View style={styles.transactionItem}>
						<Text style={styles.transactionDescription}>Amazon Purchase</Text>
						<Text style={styles.transactionAmount}>- $50.00</Text>
					</View>
					<View style={styles.transactionItem}>
						<Text style={styles.transactionDescription}>Salary Credit</Text>
						<Text style={styles.transactionAmount}>+ $2,500.00</Text>
					</View>
					<View style={styles.transactionItem}>
						<Text style={styles.transactionDescription}>Coffee Shop</Text>
						<Text style={styles.transactionAmount}>- $5.00</Text>
					</View>
				</View>
			</ScrollView>

			{/* Tabs */}
		</>
	);
};

export default DashboardUser;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#f0f4f8",
	},
	header: {
		marginBottom: 20, // Space below the header
		alignItems: "center", // Center items horizontally
		justifyContent: "center", // Center items vertically
		paddingHorizontal: 20, // Padding on the left and right sides
		flexDirection: "column", // Stack children vertically
		marginHorizontal: "auto", // Center the header horizontally
	},

	headerText: {
		fontSize: 28,
		fontWeight: "bold",
		color: "#333",
	},
	subHeaderText: {
		fontSize: 16,
		color: "#666",
	},
	balanceSection: {
		backgroundColor: "#4CAF50",
		padding: 20,
		borderRadius: 12,
		marginBottom: 20,
		alignItems: "center",
	},
	balanceTitle: {
		fontSize: 18,
		color: "#fff",
		marginBottom: 10,
	},
	balanceAmount: {
		fontSize: 36,
		fontWeight: "bold",
		color: "#fff",
	},
	actionButton: {
		marginTop: 20,
		backgroundColor: "#388E3C",
		padding: 12,
		borderRadius: 8,
	},
	buttonText: {
		fontSize: 16,
		color: "#fff",
	},
	quickActions: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 20,
	},
	quickActionButton: {
		backgroundColor: "#2196F3",
		padding: 15,
		borderRadius: 8,
		width: "100%",
		height: "auto",
		alignItems: "center",
	},
	quickActionText: {
		color: "#fff",
		fontSize: 14,
	},
	transactionHistory: {
		marginTop: 20,
	},
	transactionTitle: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#333",
		marginBottom: 10,
	},
	transactionItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		backgroundColor: "#fff",
		padding: 15,
		borderRadius: 8,
		marginBottom: 10,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	transactionDescription: {
		fontSize: 16,
		color: "#333",
	},
	transactionAmount: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#333",
	},

	WelcomeScreen__logo_wrapper: {
		position: "absolute",
		top: 20,
		right: 20,
		aspectRatio: 1 / 1, // Maintains a square aspect ratio
		width: "18%",
	},

	WelcomeScreen__logo: {
		flex: 1,
		width: "100%",
		aspectRatio: 1 / 1,
	},
});

// npm install react-native-safe-area-context
//  npx react-native start --reset-cache
// npm install @react-navigation/native
// npm install @react-navigation/bottom-tabs
