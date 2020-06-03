import React, { Component } from "react";
import { StyleSheet, View, Alert, ActivityIndicator } from "react-native";
import firebase from "../../database/firebase";

import AppButton from "../components/Button";
import Screen from "../components/Screen";
import TextInput from "../components/TextInput";

export default class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      isLoading: false,
    };
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  registerUser = () => {
    if (this.state.email === "" && this.state.password === "") {
      Alert.alert("Enter your details to sign up!");
    } else {
      this.setState({
        isLoading: true,
      });
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
          res.user.updateProfile({
            displayName: this.state.displayName,
          });
          console.log("User registered successfully!");
          this.setState({
            isLoading: false,
            name: "",
            email: "",
            password: "",
          });
          this.props.navigation.navigate("Login");
        })
        .catch((error) => this.setState({ errorMessage: error.message }));
    }
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }
    return (
      <Screen style={styles.input}>
        <TextInput
          autoCorrect={false}
          icon="account"
          name="name"
          placeholder="Name"
          value={this.state.name}
          onChangeText={(val) => this.updateInputVal(val, "name")}
        />
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, "email")}
        />
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
          value={this.state.password}
          onChangeText={(val) => this.updateInputVal(val, "password")}
        />

        <AppButton title="Register" onPress={() => this.registerUser()} />
        <AppButton
          title="Already Registered? Click here"
          color="secondary"
          onPress={() => this.props.navigation.navigate("Login")}
        ></AppButton>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
