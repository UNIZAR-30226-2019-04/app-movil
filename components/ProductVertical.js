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
const width = Dimensions.get("window").width / 2 - 20;

export default class ProductVertical extends Component {
  state = {
    isLiked: this.props.deseado
  };
  onPressHeart() {
    console.log("Like pressed");
    this.setState({ isLiked: !this.state.isLiked });
  }

  _isLiked = () => {
    return this.state.isLiked;
  };
  componentDidMount() {
    console.log("ProductVertical liked:", this.props.deseado);
    this.setState({ isliked: this.props.deseado });
  }

  render() {
    let red = "rgba(245,60,60,0.8)";
    const width = Dimensions.get("window").width / 2 - 20;
    let { navigation } = this.props;

    return (
      <View style={styles.container}>
        <View style={{}}>
          <Image
            source={{ uri: this.props.thumbnail }}
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
            {this.props.precio}€
          </Text>
        </View>

        <View style={{ marginBottom: 5 }}>
          <Text
            style={{
              paddingHorizontal: 10,
              color: "grey",
              fontSize: 16,
              fontWeight: "500"
            }}
          >
            {this.props.titulo}
          </Text>
        </View>

        <View style={{ marginVertical: 2 }}>
          <Text
            ellipsizeMode="tail"
            numberOfLines={6}
            style={{ paddingHorizontal: 10, color: "grey" }}
          >
            {this.props.descripcion}
          </Text>
        </View>

        <View
          style={{
            marginBottom: 5,
            marginHorizontal: 2,
            flex: 1,
            flexDirection: "row",
            bottom: 2,
            position: "absolute"
          }}
        >
          <TouchableOpacity
            style={{
              marginHorizontal: 2,
              paddingLeft: 18,
              marginRight: -10,
              marginLeft: 10,

              width: width / 2 - 13,
              height: 42,
              borderRadius: 6,
              borderWidth: 2,
              borderColor: "#fff",
              backgroundColor: "#dddddd"
            }}
            onPress={() => this.onPressHeart()}
          >
            <Icon
              name={this.state.isLiked ? "heart" : "heart-outline"}
              isActive={true}
              size={25}
              color="grey"
              colorInputRange={[0, 0.56, 1]}
              colorOutputRange={[
                "grey",
                "grey",
                this.state.isLiked ? red : "grey"
              ]}
            />
          </TouchableOpacity>

          <View style={styles.button}>
            <Button
              title="Chat"
              onPress={() =>
                navigation.navigate("Chat", { receiver: this.props.vendedor })
              }
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
    marginLeft: 10,

    width: width / 2 - 13,
    height: 42,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#fff"
  }
});
