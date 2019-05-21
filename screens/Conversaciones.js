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
import { API_BASE, DEBUG } from "../config";
import { AsyncStorage } from "react-native";

export default class Conversaciones extends Component {
  state = {
    conversaciones: [],
    user: "",
    token: ""
  };
  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    let token, user;
    try {
      user = AsyncStorage.getItem("user");
      token = AsyncStorage.getItem("token");

      console.log("User", user, token);

      //user = "unzurdo@gmail.com";
      if (DEBUG) {
        user = "6addcd19-f185-4078-966e-e57cf870046c";
        token =
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTgyNzgzNzcsInN1YiI6NCwiaWF0IjoxNTU4MTkxOTcyfQ.5komhqF1kxibiUySym0l7x3pPNuqcFzoUG33815SX88";
      }
      if (user !== null) {
        this.setState({ user: user, token: token });
      }
    } catch (error) {
      console.log(error);
    }
    const URL = `${API_BASE}/conversacion/all/` + user;
    axios
      .get(URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        }
      })
      .then(res => {
        const conversaciones = res.data.data;
        console.log("Conversaciones response", conversaciones);
        this.setState({ conversaciones: conversaciones });
      })
      .catch(err => console.log(err));
  }
  _keyExtractor = (item, index) => {
    //console.log(item);
    return item.id.toString();
  };
  _checkUser(item) {
    console.log("Conversaciones", this.state.conversaciones);
    if (item.vendedor === this.state.user) {
      return item.comprador;
    } else {
      return item.vendedor;
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
              leftAvatar={{
                source: {
                  uri:
                    "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"
                }
              }}
              style={{ marginVertical: 3 }}
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
    backgroundColor: "#F5F5F5"
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  }
});
