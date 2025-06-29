import { PermissionsAndroid, Platform } from "react-native";

export const requestStoragePermission = async () => {
	if (Platform.OS === "android") {
		const granted = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
			{
				title: "Access Storage",
				message: "App needs access to your storage to select images",
				buttonNeutral: "Ask Me Later",
				buttonNegative: "Cancel",
				buttonPositive: "OK",
			}
		);
		return granted === PermissionsAndroid.RESULTS.GRANTED;
	}
	return true;
};
