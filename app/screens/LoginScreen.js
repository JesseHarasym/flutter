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

export default class Login extends Component {
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
            .signInWithEmailAndPassword(values.email, values.password)
            .then((res) => {
              console.log(res);
              this.props.navigation.navigate("HomeLogged");
              console.log("User logged-in successfully!");
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
              placeholder="Email"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            <ErrorMessage error={errors["email"]} visible={touched["email"]} />
            <TextInput
              autoCorrect={false}
              icon="account"
              name="name"
              placeholder="Password"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              maxLength={15}
              secureTextEntry={true}
            />
            <ErrorMessage
              error={errors["password"]}
              visible={touched["password"]}
            />
            <AppButton title="Sign in" onPress={handleSubmit} />
            <AppButton
              onPress={() => this.props.navigation.navigate("Register")}
              color="secondary"
              title="Need to register? click here"
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
