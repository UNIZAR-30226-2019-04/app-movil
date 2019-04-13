import React, { Component } from "react";
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
//import Icon from "react-native-vector-icons/FontAwesome";
import ModalDropdown from "react-native-modal-dropdown";
import Icon from "react-native-animated-icons";

const width = Dimensions.get("window").width;
let _this = null;

export default class ProductDetails extends Component {
  state = {
    search: "",
    modalVisible: null,
    product: "",
    room: 1,
    user: "unzurdo@gmail.com",
    receiver: "alberto@gmail.com",
    token: "",
    isLiked: false
  };
  onPressHeart() {
    console.log("Like pressed");
    this.setState({ isLiked: !this.state.isLiked });
  }

  _isLiked = () => {
    return this.state.isLiked;
  };

  static navigationOptions = ({ navigation }) => {
    return {
      // Your custom header

      headerRight: (
        <View
          style={{
            flex: 1,
            marginLeft: 10,
            flexDirection: "row",
            marginRight: 10
          }}
        >
          <View style={{ marginRight: 15 }}>
            <Icon
              style={{ marginTop: 6, marginHorizontal: 5 }}
              name="share-variant"
              size={32}
              color="white"
            />
          </View>

          <ModalDropdown
            options={["Reportar anuncio"]}
            dropdownStyle={{ marginTop: -10, height: 40 }}
            renderRow={(a, b, c) => _this._renderRow(a, b, c)}
          >
            <Icon
              style={{ marginTop: 6, marginHorizontal: 5 }}
              name="ellipsis-v"
              iconFamily="FontAwesome"
              size={35}
              color="white"
            />
          </ModalDropdown>
        </View>
      )
    };
  };

  _method = () => {
    this.props.navigation.navigate("Chat");
  };

  _renderRow(rowData, rowID, highlighted) {
    console.log(rowData, rowID, highlighted);
    return (
      <Button
        title={rowData}
        type="clear"
        //onPress={() => this.props.navigation.navigate("Welcome")}
        style={{ color: "black", width: 200 }}
      />
    );
  }
  componentDidMount() {
    _this = this;

    const { setParams } = this.props.navigation;
    const { state } = this.props.navigation;
    const product = this.props.navigation.state.params.product;
    console.log(product);
    this.setState({ product: product });
  }

  render() {
    console.log("render", this.state.product);
    const width = Dimensions.get("window").width;
    let red = "rgba(245,60,60,0.8)";
    let light = "rgba(255,255,255,0.5)";

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={{ flex: 1 }}>
            <Image
              source={{ uri: this.state.product.url }}
              style={{
                resizeMode: "cover",
                width: width,
                height: 200,
                borderRadius: 12
              }}
            />
          </View>
          <View style={{ flex: 2 }}>
            <View>
              <View style={styles.lineStyle} />
              <TouchableOpacity
                style={{
                  height: 50,
                  width: 50
                }}
                onPress={() => this.onPressHeart()}
              >
                <Icon
                  style={{ marginHorizontal: 5 }}
                  name={this.state.isLiked ? "heart" : "heart-outline"}
                  isActive={true}
                  size={40}
                  color="grey"
                  colorInputRange={[0, 0.56, 1]}
                  colorOutputRange={[
                    "grey",
                    "grey",
                    this.state.isLiked ? red : "grey"
                  ]}
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "500",
                  paddingHorizontal: 10
                }}
              >
                {this.state.product.price}€
              </Text>
            </View>

            <View style={{ marginBottom: 5 }}>
              <Text style={{ paddingHorizontal: 10, color: "grey" }}>
                {this.state.product.name}
              </Text>
            </View>

            <View style={{ marginBottom: 5 }}>
              <Text
                //ellipsizeMode="tail"
                //numberOfLines={6}
                style={{ paddingHorizontal: 10, color: "grey" }}
              >
                {this.state.product.description}
              </Text>
            </View>
            <View style={styles.lineStyle} />

            <View style={{ marginBottom: 5 }}>
              <Text style={{ paddingHorizontal: 10, marginBottom: 120 }}>
                USUARIO
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            width: width,
            position: "absolute",
            bottom: 0
          }}
        >
          <Button
            title="Chat"
            onPress={() =>
              this.props.navigation.navigate("ChatTabNavigator", {
                room: this.state.room,
                user: this.state.user,
                receiver: this.state.receiver,
                token: this.state.token
              })
            }
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10
  },
  button: {
    marginHorizontal: 2,
    width: width / 2 - 13,
    height: 42,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#fff"
  },
  lineStyle: {
    borderWidth: 1,
    borderColor: "#eeee",
    margin: 4
  }
});
