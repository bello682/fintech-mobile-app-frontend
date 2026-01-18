import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
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
import SplashScreen from "./src/pages/splashScreen";

const Stack = createStackNavigator();

const App = () => {
	const isHermes = () => !!global.HermesInternal;

	// Log only during development
	if (__DEV__) {
		console.log("Hermes Enabled:", isHermes());
	}

	return (
		<SafeAreaProvider>
			<Provider store={store}>
				<SafeAreaView style={styles.safeArea}>
					<NavigationContainer>
						<Stack.Navigator initialRouteName='Splash'>
							<Stack.Screen
								name='Splash'
								component={SplashScreen}
								options={{ headerShown: false }}
							/>
							<Stack.Screen
								name='Welcome'
								component={WelcomeScreen}
								options={{ headerShown: false }}
							/>
							<Stack.Screen
								name='SignUp'
								component={SignUp}
								options={{ headerShown: false }}
							/>
							<Stack.Screen
								name='Login'
								component={Login}
								options={{ headerShown: false }}
							/>
							<Stack.Screen
								name='Kyc_User'
								component={Kyc_User}
								options={{ headerShown: false }}
							/>
							<Stack.Screen
								name='Verification'
								component={SignUp2_EmailVerification}
								options={{ headerShown: false }}
							/>
							<Stack.Screen
								name='Password_reset'
								component={ForgetPassword}
								options={{ headerShown: true }}
							/>
							{/* Main Tabs */}
							<Stack.Screen
								name='MainTabs'
								component={BottomTab}
								options={{ headerShown: false }}
							/>
						</Stack.Navigator>

						<Toast />
					</NavigationContainer>
				</SafeAreaView>
			</Provider>
		</SafeAreaProvider>
	);
};

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: "#fff",
	},
});

export default App;

// adb kill-server
// adb start-server
// adb devices
// npm start -- --reset-cache
// rm -rf node_modules
// rm package-lock.json
// npm install

// REACT_NATIVE_PACKAGER_HOSTNAME=192.168.0.3 npx expo start

// Windows: Open CMD as Administrator and type: netstat -ano | findstr :8081

// To start this app use
// REACT_NATIVE_PACKAGER_HOSTNAME=192.168.0.3 npx expo start -c
