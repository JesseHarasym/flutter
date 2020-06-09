import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { CalendarList } from "react-native-calendars";

export default class ShowCalender extends Component {
  constructor() {
    super();
    this.state = { selectedDates: this.selectedDates() };
  }

  selectedDates = () => {
    const selected = {};
    let flightPrice = {
      "2020-06-09": "30",
      "2020-06-10": "203",
      "2020-06-11": "420",
      "2020-06-12": "30",
    };
    let initialArr = [];
    for (var key in flightPrice) {
      let color = "";
      if (flightPrice[key] < 100) {
        color = "green";
      }
      if ((flightPrice[key] > 100) & (flightPrice[key] < 300)) {
        color = "yellow";
      }
      if (flightPrice[key] >= 300) {
        color = "red";
      }
      let flight = {
        date: key,
        price: color,
      };
      initialArr.push(flight);
    }
    initialArr.forEach((item) => {
      selected[item.date] = {
        selected: true,
        selectedColor: item.price,
      };
    });
    return JSON.parse(JSON.stringify(selected));
  };

  render() {
    return (
      <View style={styles.container}>
        <CalendarList
          pastScrollRange={0}
          futureScrollRange={9}
          onDayPress={(day) => {
            console.log("selected day", day);
          }}
          markedDates={this.selectedDates()}
        ></CalendarList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
  },
});
