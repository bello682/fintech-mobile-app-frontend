import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import User1 from "./../pages/usersPgaes/user1";
import Users2 from "./../pages/usersPgaes/users2";
import UsersPages2 from "./../pages/usersPgaes/usersPages2";
import SettingsScreen from "../pages/usersPgaes/SettingsScreen";
import MoreScreen from "../pages/usersPgaes/MoreScreen";
import { TouchableOpacity } from "react-native-gesture-handler";

const Tab = createBottomTabNavigator();

const BottomTab = () => {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					if (route.name === "Users1") {
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
				tabBarActiveTintColor: "tomato",
				tabBarInactiveTintColor: "gray",
				tabBarStyle: { height: 60 },
			})}
		>
			<Tab.Screen name="Users1" component={User1} />
			<Tab.Screen name="Users2" component={Users2} />
			<Tab.Screen
				name="AddUser"
				component={UsersPages2}
				options={{
					tabBarLabel: "",
					tabBarButton: (props) => (
						<TouchableOpacity {...props} style={styles.middleTab}>
							<Ionicons name="add-circle" size={40} color="tomato" />
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

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	middleTab: {
		height: 60,
		width: 60,
		borderRadius: 30,
		backgroundColor: "white",
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 2,
		borderColor: "tomato",
		marginBottom: 20, // Raised effect for the middle button
	},
});
