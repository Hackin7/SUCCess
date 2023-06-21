import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
export const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Add any necessary logic or delays here
    // For example, you can use setTimeout to delay the navigation
    setTimeout(() => {
      navigation.navigate("Setup"); // Replace 'Main' with the name of your main screen component
    }, 1000); // Delay for 3 seconds (adjust as needed)
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Add your logo or image here */}
      <Image source={require("../assets/splash.png")} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF", // Set your desired background color
  },
  logo: {
    width: 200, // Adjust the width of your logo or image
    height: 200, // Adjust the height of your logo or image
  },
});
