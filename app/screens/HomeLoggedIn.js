import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Screen from "../components/Screen";
import AppButton from "../components/Button";
import colors from "../config/colors";

function HomeLoggedIn() {
  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.detailsContainer}>
          <Text style={styles.text}>Thank you for logging into flutter!</Text>
        </View>
      </View>
      <AppButton title="Search Flights" color="medium"></AppButton>
      <AppButton title="Search Hotels" color="medium"></AppButton>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  detailsContainer: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeLoggedIn;
