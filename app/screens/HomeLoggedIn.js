import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import firebase from "../../database/firebase";

import AppButton from "../components/Button";
import Screen from "../components/Screen";
import SearchButton from "../components/SearchButton";

export default class HomeLoggedIn extends Component {
  constructor() {
    super();
  }

  signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.navigation.navigate("Login");
        console.log("Logged out successfully");
      });
  };

  render() {
    return (
      <Screen>
        <View style={styles.container}>
          <View style={styles.buttons}>
            <SearchButton
              title="Search Flights"
              color=""
              icon="airplane-takeoff"
            />
            <SearchButton title="Search Hotels" color="" icon="hotel" />
          </View>
          <AppButton title="Sign out" onPress={() => this.signOut()} />
        </View>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
  },
  container: {
    padding: 10,
    fontWeight: "bold",
    padding: 20,
    paddingTop: 40,
  },
});
