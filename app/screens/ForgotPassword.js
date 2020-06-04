import React, { Component } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Text, SafeAreaView, View, StyleSheet } from "react-native";
import ErrorMessage from "../components/ErrorMessage";
import firebase from "../../database/firebase";

import AppButton from "../components/Button";
import TextInput from "../components/TextInput";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label("Email")
    .email("Enter a valid email")
    .required("Please enter a registered email"),
});

export default class ForgotPassword extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <View style={styles.container}>
        <Formik
          initialValues={{ email: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, actions, { resetForm }) => {
            try {
              firebase.auth().sendPasswordResetEmail(values.email);
              resetForm();
              this.props.navigation.navigate("Login");
              console.log("Password reset email sent successfully");
            } catch (error) {
              actions.setFieldError("general", error.message);
            }
          }}
        >
          {({
            handleChange,
            values,
            handleSubmit,
            errors,
            touched,
            handleBlur,
          }) => (
            <>
              <TextInput
                autoCorrect={false}
                icon="email"
                name="name"
                placeholder="Email"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
              <ErrorMessage
                error={errors["email"]}
                visible={touched["email"]}
              />
              <AppButton
                buttonType="outline"
                onPress={handleSubmit}
                title="Send Email"
                buttonColor="#039BE5"
              />
              <ErrorMessage errorValue={errors.general} />
            </>
          )}
        </Formik>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 150,
    padding: 25,
  },
});
