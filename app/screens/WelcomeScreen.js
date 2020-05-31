import React from "react";
import { ImageBackground, StyleSheet, View, Image, Text } from "react-native";

import Button from "../components/Button";

function WelcomeScreen(props) {
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
        {/* <Text style={styles.tagline}>Flutter</Text> */}
      </View>
      <View style={styles.buttonsContainer}>
        <Button title="Login" />
        <Button title="Register" color="secondary" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
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
  tagline: {
    fontSize: 25,
    fontWeight: "600",
    paddingVertical: 20,
  },
});

export default WelcomeScreen;
