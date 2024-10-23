import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "./src/pages/welcomeScrean";
import SignUp from "./src/pages/sign-up";
import Login from "./src/pages/login";
import SignUp2_EmailVerification from "./src/pages/sign-up2";
import ForgetPassword from "./src/pages/forgetPassword";
import BottomTab from "./src/component/bottomTab";
import { Provider } from "react-redux";
import store from "./src/store/store";
import Toast from "react-native-toast-message";
import Kyc_User from "./src/pages/KYC/userKyc";

const Stack = createStackNavigator();

const App = () => {
	const isHermes = () => !!global.HermesInternal;

	// Log only during development
	if (__DEV__) {
		console.log("Hermes Enabled:", isHermes());
	}

	return (
		<SafeAreaView style={styles.safeArea}>
			<Provider store={store}>
				<NavigationContainer>
					<Stack.Navigator initialRouteName="Welcome">
						<Stack.Screen
							name="Welcome"
							component={WelcomeScreen}
							options={{ headerShown: false }}
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
							name="Kyc_User"
							component={Kyc_User}
							options={{ headerShown: true }}
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
						{/* Main Tabs */}
						<Stack.Screen
							name="MainTabs"
							component={BottomTab}
							options={{ headerShown: false }}
						/>
					</Stack.Navigator>

					<Toast />
				</NavigationContainer>
			</Provider>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: "#fff", // Set background color or customize
	},
});

export default App;

// adb kill-server
// adb start-server
// adb devices
