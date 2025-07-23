import React, { useEffect, useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	ActivityIndicator,
	Dimensions, // Import Dimensions to get screen width for animation
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getGreeting } from "../component/getGreetings";
import { fetchUserById } from "../store/action/fetchUserByIdAction";

const { width } = Dimensions.get("window");

const DashboardUser = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const { profile, loading, error } = useSelector(
		(state) => state.userProfileFetch
	);

	// State for showing/hiding balance
	const [showBalance, setShowBalance] = useState(false);
	const [kycStatus, setShowKycStatus] = useState(false);

	const { user } = useSelector((state) => state.loginState);

	const userID = user?.user?.id;

	// Extract just the first name from the full name
	const firstName = profile?.data?.fullName?.split(" ")[0];

	useEffect(() => {
		if (userID) {
			dispatch(fetchUserById(userID));
		}

		if (!profile?.kyc) {
			setShowKycStatus(true);
		}

		console.log(profile?.kyc);
	}, [dispatch, userID, kycStatus]);

	if (loading) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size="large" color="purple" />
			</View>
		);
	}

	if (error) {
		return <Text>Error: {error}</Text>;
	}

	// Dummy balance for demonstration. Replace with actual profile balance.
	const userBalance = profile?.data?.balance
		? `$${profile.data.balance.toFixed(2)}`
		: "$0.00";
	// const kycStatus = profile?.data?.kycVerified === false; // Assuming a kycVerified field in profile data

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

				{/* KYC Warning Banner - Only show if KYC is not verified */}
				{kycStatus && (
					<View style={styles.warningBannerContainer}>
						<View style={styles.movingTextWrapper}>
							<Text style={[styles.movingText]}>
								Please update your KYC to access all features
							</Text>
						</View>
						<TouchableOpacity
							style={styles.kycButton}
							onPress={() => navigation.navigate("Kyc_User")} // Navigate to your KYC page
						>
							<Text style={styles.kycButtonText}>Update KYC</Text>
						</TouchableOpacity>
					</View>
				)}

				{/* Balance Section */}
				<View style={styles.balanceSection}>
					<View style={styles.balanceHeaderContainer}>
						<Text style={styles.balanceTitle}>Current Balance</Text>
						<TouchableOpacity
							onPress={() => setShowBalance(!showBalance)}
							style={styles.toggleBalanceButton}
						>
							<Icon
								name={showBalance ? "eye" : "eye-slash"} // FontAwesome eye icons
								size={24}
								color="#fff"
							/>
						</TouchableOpacity>
					</View>
					<Text style={styles.balanceAmount}>
						{showBalance ? userBalance : "********"}
					</Text>
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
			<View>
				<TouchableOpacity
					style={styles.login__btn}
					onPress={() => {
						navigation.navigate("Kyc_User");
					}}
				>
					<View style={styles.google__btn_wrapper}>
						<Text style={styles.login__text_btn}>Sign In to KYC</Text>
					</View>
				</TouchableOpacity>
			</View>
		</>
	);
};

export default DashboardUser;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#f0f4f8",
		marginTop: 50, // Space above the container
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
		// color: "purple",
	},
	subHeaderText: {
		fontSize: 16,
		color: "purple",
	},
	// KYC Warning Banner Styles
	warningBannerContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#fff3cd",
		borderColor: "#ffeeba",
		borderWidth: 1,
		borderRadius: 8,
		paddingVertical: 10,
		paddingHorizontal: 15,
		marginBottom: 20,
		overflow: "hidden",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 3,
		elevation: 4,
	},

	movingTextWrapper: {
		flex: 1, // Allows the text to take available space
		overflow: "hidden", // Ensures text is clipped at the wrapper boundaries
		height: 30, // Fixed height for the moving text line
		justifyContent: "center",
		paddingVertical: 5,
		alignItems: "flex-start", // ✅ Ensures text starts at left
		// width: "100%",
	},

	movingText: {
		fontSize: 14,
		color: "#856404",
		fontWeight: "500",
		width: width * 3, // Make it longer so it scrolls visibly
	},

	kycButton: {
		marginLeft: 15, // Space between text and button
		backgroundColor: "purple",
		paddingVertical: 8,
		paddingHorizontal: 15,
		borderRadius: 20,
		// No animation on this button, it's fixed
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.2,
		shadowRadius: 2,
		elevation: 3,
	},
	kycButtonText: {
		color: "#fff",
		fontSize: 14,
		fontWeight: "bold",
	},

	// Balance Section Styles
	balanceSection: {
		backgroundColor: "purple",
		padding: 20,
		borderRadius: 12,
		marginBottom: 20,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 5,
		elevation: 8,
	},
	balanceHeaderContainer: {
		// New container for title and toggle button
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center", // Center content horizontally
		marginBottom: 10,
		width: "100%", // Take full width of parent
	},
	balanceTitle: {
		fontSize: 18,
		color: "#fff",
		marginRight: 10, // Space between title and icon
	},
	toggleBalanceButton: {
		padding: 5, // Make the touch target larger
	},
	balanceAmount: {
		fontSize: 36,
		fontWeight: "bold",
		color: "#fff",
		letterSpacing: 1.5, // Add some spacing for hidden balance
	},
	actionButton: {
		marginTop: 20,
		backgroundColor: "transparent",
		borderColor: "#fff",
		borderWidth: 1,
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
		backgroundColor: "purple",
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
		// color: "#333",
		color: "purple",
	},
	transactionAmount: {
		fontSize: 16,
		fontWeight: "bold",
		// color: "#333",
		color: "purple",
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
