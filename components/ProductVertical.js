import React, { Component } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { AsyncStorage } from "react-native";
import { Rating, AirbnbRating, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
const width = Dimensions.get("window").width / 2 - 20;

export default class ProductVertical extends Component {
  render() {
    const width = Dimensions.get("window").width / 2 - 20;
    return (
      <View style={styles.container}>
        <View style={{}}>
          <Image
            source={this.props.imageUri}
            style={{
              width: Dimensions.get("window").width / 2 - 30,
              height: 100,
              resizeMode: "cover",
              borderRadius: 12
            }}
          />
        </View>
        <View style={{}}>
          <Text
            style={{ fontSize: 20, fontWeight: "500", paddingHorizontal: 10 }}
          >
            {this.props.price}€
          </Text>
        </View>

        <View style={{ marginBottom: 5 }}>
          <Text style={{ paddingHorizontal: 10, color: "grey" }}>
            {this.props.name}
          </Text>
        </View>

        <View style={{ marginBottom: 5 }}>
          <Text
            ellipsizeMode="tail"
            numberOfLines={6}
            style={{ paddingHorizontal: 10, color: "grey" }}
          >
            {this.props.description}
          </Text>
        </View>

        <View
          style={{
            marginBottom: 5,
            marginHorizontal: 6,
            flex: 1,
            flexDirection: "row"
          }}
        >
          <View style={styles.button}>
            <Button
              icon={{
                name: "favorite-border",
                size: 25,
                color: "grey"
              }}
              type="outline"
              style={{
                backgroundColor: "#F5F5F5",
                color: "#F5F5F5",
                marginHorizontal: 2
              }}
            />
          </View>

          <View style={styles.button}>
            <Button
              title="Chat"
              //onPress={() => this.props.navigation.navigate("Welcome")}
              //buttonStyle={{ height: 38 }}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: Dimensions.get("window").width / 2 - 20,
    marginLeft: 10,
    borderWidth: 0.5,
    borderRadius: 12,
    borderColor: "#dddddd",
    marginBottom: 7
  },
  button: {
    marginHorizontal: 2,
    width: width / 2 - 13,
    height: 42,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#fff"
  }
});
