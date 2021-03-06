import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import Icon from "@expo/vector-icons/Ionicons";

export default class Product extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 2 }}>
          <Image
            source={{ uri: this.props.thumbnail }}
            style={{
              flex: 1,
              width: null,
              height: null,
              resizeMode: "cover",
              borderRadius: 12
            }}
          />
        </View>
        <View style={{}}>
          <Text
            style={{ fontSize: 20, fontWeight: "500", paddingHorizontal: 10 }}
          >
            {this.props.precio}€
          </Text>
        </View>

        <View style={{ marginBottom: 5 }}>
          <Text style={{ paddingHorizontal: 10, color: "grey" }}>
            {this.props.titulo}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 140,
    width: 140,
    marginLeft: 10,
    borderWidth: 0.5,
    borderRadius: 12,
    borderColor: "#dddddd"
  }
});
