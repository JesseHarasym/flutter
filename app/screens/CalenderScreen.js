import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { CalendarList } from "react-native-calendars";

export default class ShowCalender extends Component {
  constructor(props) {
    super(props);
    this.renderChat = this.renderChat.bind(this);
    this.state = { selectedDates: this.selectedDates() };
  }

  renderChat = () => {
    return this.props.route.params;
  };

  selectedDates = () => {
    const selected = {};
    let initialArr = [];
    let flightData;
    let flightPriceRender = this.renderChat();
    let temp;
    for (var key in flightPriceRender) {
      temp = flightPriceRender[key];
    }
    for (let [key, value] of Object.entries(temp)) {
      flightData = {
        date: key,
        price: value,
      };
      // initialArr.push(flightData);
    }
    for (let [key, value] of Object.entries(temp)) {
      let color = "";
      if (value < 180) {
        color = "green";
      }
      if ((value > 180) & (value < 250)) {
        color = "yellow";
      }
      if (value >= 250) {
        color = "red";
      }
      let flight = {
        date: key,
        color: color,
        price: value,
      };
      initialArr.push(flight);
    }
    initialArr.forEach((item) => {
      selected[item.date] = {
        selected: true,
        selectedColor: item.color,
      };
    });
    console.log(initialArr);
    return JSON.parse(JSON.stringify(selected));
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>{}</Text>
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
