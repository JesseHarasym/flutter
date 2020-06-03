import React from "react";
import { Button, View, Text } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import firebase from "../../database/firebase";
import { navigate, navigation } from "react-navigation";

import TextInput from "../components/TextInput";
import ErrorMessage from "../components/ErrorMessage";
import AppButton from "../components/Button";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});

function RegiTest(props) {
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
            console.log("User registered successfully!");
            //navigation.navigate("Login");
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

export default RegiTest;
