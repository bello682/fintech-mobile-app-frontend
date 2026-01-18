import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Users2 from "./../pages/usersPgaes/users2";
import UsersPages2 from "./../pages/usersPgaes/usersPages2";
import SettingsScreen from "../pages/usersPgaes/SettingsScreen";
import MoreScreen from "../pages/usersPgaes/MoreScreen";
import { TouchableOpacity } from "react-native-gesture-handler";
import DashboardUser from "../pages/dashboardUser";

// Create bottom tab navigator
const Tab = createBottomTabNavigator();

const BottomTab = () => {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					// Set the icon based on the tab
					let iconName;
					if (route.name === "Dashboard") {
						iconName = focused ? "home" : "home-outline";
					} else if (route.name === "Users2") {
						iconName = focused ? "person" : "person-outline";
					} else if (route.name === "AddUser") {
						iconName = focused ? "add-circle" : "add-circle-outline";
						size = 60; // Enlarge the middle icon
					} else if (route.name === "Settings") {
						iconName = focused ? "settings" : "settings-outline";
					} else if (route.name === "More") {
						iconName = focused
							? "ellipsis-horizontal"
							: "ellipsis-horizontal-outline";
					}

					return <Ionicons name={iconName} size={size} color={color} />;
				},
				tabBarActiveTintColor: "purple", // Active color for focused tab
				tabBarInactiveTintColor: "gray", // Inactive color for unfocused tabs
				tabBarStyle: { height: 60 }, // Custom tab height
			})}
		>
			<Tab.Screen
				name="Dashboard"
				component={DashboardUser}
				options={{ headerShown: false }}
			/>
			<Tab.Screen name="Users2" component={Users2} />
			<Tab.Screen
				name="AddUser"
				component={UsersPages2}
				options={{
					tabBarLabel: "",
					tabBarButton: (props) => (
						<TouchableOpacity {...props} style={styles.middleTab}>
							<Ionicons name="add-circle" size={40} color="purple" />
						</TouchableOpacity>
					),
				}}
			/>
			<Tab.Screen name="Settings" component={SettingsScreen} />
			<Tab.Screen name="More" component={MoreScreen} />
		</Tab.Navigator>
	);
};

export default BottomTab;

// Styling for custom components
const styles = StyleSheet.create({
	middleTab: {
		height: 60,
		width: 60,
		borderRadius: 30,
		backgroundColor: "white",
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 2,
		borderColor: "purple",
		marginBottom: 20, // Raised effect for the middle button
	},
});
