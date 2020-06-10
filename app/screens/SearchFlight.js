import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

import TextInput from "../components/TextInput";
import AppButton from "../components/Button";

const validationSchema = Yup.object().shape({
  departure: Yup.string().required(),
  arrival: Yup.string().required(),
});

export default class SearchFlights extends Component {
  constructor(props) {
    super(props);
    this.state;
  }
  writeToServer = (values) => {
    let departure = values.departure.toUpperCase();
    let arrival = values.arrival.toUpperCase();
    const url = `http://10.0.2.2:5000//flights/${departure}/${arrival}`;
    try {
      fetch(url)
        .then((response) => response.text())
        .then((contents) => this.sortData(contents));
    } catch (error) {
      console.log(error);
    }
  };

  sortData = (data) => {
    console.log(data);
    const { navigate } = this.props.navigation;
    data = JSON.parse(data);
    this.setState(data);
    for (var key in this.state) {
      console.log(`Day: ${key} Price: ${this.state[key]}`);
    }
    navigate("Calender", {
      JSON_data: this.state,
    });
  };

  render() {
    return (
      <Formik
        initialValues={{ departure: "", arrival: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          console.log(values.departure);
          console.log(values.arrival);
          resetForm();
          this.writeToServer(values);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.container}>
            <TextInput
              autoCorrect={false}
              icon="home"
              name="name"
              placeholder="Where from?"
              maxLength={15}
              onChangeText={handleChange("departure")}
              onBlur={handleBlur("departure")}
              value={values.departure}
            />
            <TextInput
              autoCorrect={false}
              icon="airplane-takeoff"
              name="name"
              placeholder="Where to fly?"
              maxLength={15}
              onChangeText={handleChange("arrival")}
              onBlur={handleBlur("arrival")}
              value={values.arrival}
            />
            <AppButton title="Search" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingTop: 50,
  },
});
