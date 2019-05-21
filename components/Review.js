import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { Rating, AirbnbRating, Button } from "react-native-elements";
import Icon from "react-native-animated-icons";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default class Review extends Component {
  render() {
    let red = "rgba(245,60,60,0.8)";
    const custom_height = Dimensions.get("window").height / 10;
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <Image
            source={this.props.imageUri}
            style={{
              width: 80,
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
            {this.props.name}
          </Text>

          <Text
            numberOfLines={9}
            style={{ fontSize: 14, fontWeight: "200", paddingHorizontal: 10 }}
          >
            {this.props.description}€
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",

    width: Dimensions.get("window").width - 20,
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
