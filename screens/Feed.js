import React, { Component } from "react";
import { View, Text, StyleSheet, Button, Field } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import { SearchBar } from "react-native-elements";

export default class Feed extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <SearchBar
          style={{ width: 800, flexGrow: 1, flexBasis: 50 }}
          lightTheme
        />
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>Feed</Text>
        </View>
      </View>
    );
  }
}
