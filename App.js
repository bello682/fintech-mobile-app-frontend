import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "./src/pages/welcomeScrean";
import SignUp from "./src/pages/sign-up";
import Login from "./src/pages/login";
import SignUp2_EmailVerification from "./src/pages/sign-up2";
import ForgetPassword from "./src/pages/forgetPassword";
import DashboardUser from "./src/pages/dashboardUser";

const Stack = createStackNavigator();

const App = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Welcome">
				{/* Removed the extra {' '} */}
				<Stack.Screen
					name="Welcome"
					component={WelcomeScreen}
					options={{ headerShown: false }} // Hide header for WelcomeScreen
				/>
				<Stack.Screen
					name="SignUp"
					component={SignUp}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Login"
					component={Login}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Verification"
					component={SignUp2_EmailVerification}
					options={{ headerShown: true }}
				/>
				<Stack.Screen
					name="Password_reset"
					component={ForgetPassword}
					options={{ headerShown: true }}
				/>
				<Stack.Screen
					name="Dashboard"
					component={DashboardUser}
					options={{ headerShown: false }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;

// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View } from "react-native";

// export default function App() {
// 	return (
// 		<View style={styles.container}>
// 			<Text>Welvome to my Bank World</Text>
// 			<StatusBar style="auto" />
// 		</View>
// 	);
// }

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: "#fff",
// 		alignItems: "center",
// 		justifyContent: "center",
// 	},
// });

// @react-navigation/stack
