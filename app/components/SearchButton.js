import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import defaultStyles from "../config/styles";

import colors from "../config/colors";

function SearchButton({
  icon,
  width = "48%",
  title,
  onPress,
  color = "primary",
  ...otherProps
}) {
  return (
    <View style={[styles.container, { width }]}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={defaultStyles.colors.medium}
          style={styles.icon}
        />
      )}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors[color] }]}
        onPress={onPress}
      >
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 7,
    flexDirection: "row",
    padding: 15,
    marginLeft: 5,
    marginVertical: 10,
    borderColor: "black",
    borderWidth: 1,
  },
  icon: {
    marginRight: 10,
  },
  text: {
    textTransform: "uppercase",
    fontWeight: "bold",
    color: colors.dark,
  },
});

export default SearchButton;
