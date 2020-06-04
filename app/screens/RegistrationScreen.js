import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import firebase from "../../database/firebase";
import * as Yup from "yup";
import { Formik } from "formik";

import AppButton from "../components/Button";
import TextInput from "../components/TextInput";
import ErrorMessage from "../components/ErrorMessage";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email("Email is required").label("Email"),
  password: Yup.string()
    .required("Password is required")
    .min(6)
    .label("Password"),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
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
        onSubmit={(values, { resetForm }) => {
          firebase
            .auth()
            .createUserWithEmailAndPassword(values.email, values.password)
            .then((res) => {
              res.user.updateProfile({
                name: values.name,
              });
              resetForm();
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
          <View style={styles.container}>
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
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              icon="lock"
              name="passwordConfirmation"
              placeholder="Repeat Password"
              secureTextEntry
              textContentType="password"
              onChangeText={handleChange("passwordConfirmation")}
              onBlur={handleBlur("passwordConfirmation")}
              value={values.passwordConfirmation}
            />
            <ErrorMessage
              error={errors["passwordConfirmation"]}
              visible={touched["passwordConfirmation"]}
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
    padding: 20,
    paddingTop: "35%",
  },
});
