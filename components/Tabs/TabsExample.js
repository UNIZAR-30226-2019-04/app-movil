import React, { Component } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";

export default class TabsExample extends Component {
  render() {
    const width = Dimensions.get("window").width;
    const height = Dimensions.get("window").height;
    return (
      <View style={{ flex: 1, height: height }}>
        <Text>Square Thumbnail</Text>
      </View>
    );
  }
}
