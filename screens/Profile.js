import React, { Component } from "react";
import { View, Text, StyleSheet, Button, Field } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import { SearchBar } from "react-native-elements";

export default class Profile extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Profile</Text>
        <Button
          title={"Log out"}
          onPress={() => this.props.navigation.navigate("Welcome")}
        />
      </View>
    );
  }
}
