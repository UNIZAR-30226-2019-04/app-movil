import React, { Component } from "react";
import TruequeModal from "./TruequeModal";

import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { AsyncStorage } from "react-native";
import { Rating, AirbnbRating, Button } from "react-native-elements";
import Icon from "react-native-animated-icons";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default class ProductHorizontal2 extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <Image
            source={{ uri: this.props.thumbnail }}
            style={{
              width: 40,
              height: 80,
              resizeMode: "cover",
              borderRadius: 16,
              marginHorizontal: 10
            }}
          />
        </View>
        <View style={{ margin: 10, flex: 3, flexDirection: "column" }}>
          <Text
            style={{ fontSize: 20, fontWeight: "500", paddingHorizontal: 10 }}
          >
            {this.props.titulo}
          </Text>

          <View
            key={this.props.id}
            style={{
              display: "flex",
              flexDirection: "row",

              margin: 10
            }}
          >
            <Text
              style={{ fontSize: 20, fontWeight: "500", paddingHorizontal: 10 }}
            >
              {this.props.precio}€
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",

    width: Dimensions.get("window").width/2 + 60,
    marginHorizontal: 10,

    borderWidth: 0.5,
    borderRadius: 12,
    borderColor: "#dddddd",
    marginBottom: 7
  },
  button: {
    marginHorizontal: 2,
    marginLeft: 10,
    height: 42,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#fff"
  }
});
