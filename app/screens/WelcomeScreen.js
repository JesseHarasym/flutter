import React from "react";
import { ImageBackground, StyleSheet, View, Image, Text } from "react-native";

import Button from "../components/Button";
import { Context } from "./SearchFlight";

function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      blurRadius={5}
      style={styles.background}
      source={require("../assets/Welcome.jpg")}
    >
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/FlutterLogo.png")}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <Button title="Login" onPress={() => navigation.navigate("Login")} />
        <Button
          title="Register"
          color="secondary"
          onPress={() => navigation.navigate("Register")}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 20,
    paddingTop: 40,
  },
  buttonsContainer: {
    padding: 20,
    width: "100%",
  },
  logo: {
    width: 500,
    height: 280,
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
    width: "100%",
  },
});

export default WelcomeScreen;
