import React, { Component } from "react";
import { StyleSheet, View, Alert, ActivityIndicator } from "react-native";
import firebase from "../../database/firebase";
import * as Yup from "yup";
import { Formik } from "formik";

import AppButton from "../components/Button";
import TextInput from "../components/TextInput";
import ErrorMessage from "../components/ErrorMessage";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});

export default class Signup extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          firebase
            .auth()
            .createUserWithEmailAndPassword(values.email, values.password)
            .then((res) => {
              res.user.updateProfile({
                name: values.name,
              });
              this.props.navigation.navigate("Login");
              console.log("User registered successfully!");
            });
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
        }) => (
          <View>
            <TextInput
              autoCorrect={false}
              icon="account"
              name="name"
              placeholder="Name"
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
            />
            <ErrorMessage error={errors["name"]} visible={touched["name"]} />
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              icon="email"
              keyboardType="email-address"
              name="email"
              placeholder="Email"
              textContentType="emailAddress"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            <ErrorMessage error={errors["email"]} visible={touched["email"]} />
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              icon="lock"
              name="password"
              placeholder="Password"
              secureTextEntry
              textContentType="password"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            <ErrorMessage
              error={errors["password"]}
              visible={touched["password"]}
            />
            <AppButton title="Register" onPress={handleSubmit} />
            <AppButton
              title="Already Registered? Click here"
              color="secondary"
              onPress={() => this.props.navigation.navigate("Login")}
            ></AppButton>
          </View>
        )}
      </Formik>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
