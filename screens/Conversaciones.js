import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Field,
  FlatList,
  ScrollView
} from "react-native";
import { ListItem } from "react-native-elements";

import Icon from "@expo/vector-icons/Ionicons";
import axios from "axios";
import { API_BASE } from "../config";
import { AsyncStorage } from "react-native";

export default class Conversaciones extends Component {
  state = {
    conversaciones: [],
    user: "",
    token: ""
  };
  componentWillMount() {
    this.fetchData();
  }

  fetchData = async () => {
    let token, user;
    try {
      user = await AsyncStorage.getItem("user");
      token = await AsyncStorage.getItem("token");

      console.log("User", user, token);

      user = "unzurdo@gmail.com";
      if (user !== null) {
        this.setState({ user: user, token: token });
      }
    } catch (error) {
      console.log(error);
    }
    const URL = `${API_BASE}/chat/all/` + this.state.user;
    const res = await axios.get(URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    });
    const conversaciones = res.data.data;
    console.log("Conversaciones", conversaciones);
    this.setState({ conversaciones: conversaciones });
  };
  _keyExtractor = (item, index) => {
    //console.log(item);
    return item.id.toString();
  };
  _checkUser(item) {
    if (item.seller_email === this.state.user) {
      return item.buyer_email;
    } else {
      return item.seller_email;
    }
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <FlatList
          data={this.state.conversaciones}
          extraData={this.state}
          horizontal={false}
          renderItem={({ item, index }) => (
            <ListItem
              title={this._checkUser(item)}
              leftIcon={{ name: "av-timer" }}
              style={{
                height: 52,
                backgroundColor: "grey",
                borderRadius: 1
              }}
              onPress={() =>
                this.props.navigation.navigate("ChatTabNavigator", {
                  room: item.id,
                  user: this.state.user,
                  receiver: this._checkUser(item),
                  token: this.state.token
                })
              }
            />
          )}
          keyExtractor={this._keyExtractor}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  }
});
