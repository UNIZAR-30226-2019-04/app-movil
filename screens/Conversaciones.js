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
import { AsyncStorage, RefreshControl } from "react-native";

export default class Conversaciones extends Component {
  state = {
    conversaciones: [],
    user: "",
    token: "",
    isRefreshing: false
  };
  componentDidMount() {
    this.fetchData();
  }

  onRefresh() {
    console.log("onRefresh");
    const user = this.state.user;

    this.setState({ isRefreshing: true }); // true isRefreshing flag for enable pull to refresh indicator

    this.fetchData();

    this.setState({ isRefreshing: false }); // true isRefreshing flag for enable pull to refresh indicator
  }

  fetchData = async () => {
    let token, user;
    try {
      user = await AsyncStorage.getItem("user");
      token = await AsyncStorage.getItem("token");

      console.log("User", user, token);

      //user = "unzurdo@gmail.com";
      if (DEBUG) {
        user = "6addcd19-f185-4078-966e-e57cf870046c";
        token =
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTgyNzgzNzcsInN1YiI6NCwiaWF0IjoxNTU4MTkxOTcyfQ.5komhqF1kxibiUySym0l7x3pPNuqcFzoUG33815SX88";
      }

      this.setState({ user: user, token: token });
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
        //this.setState({ conversaciones });
        this.setState({ conversaciones: conversaciones });
      })
      .catch(err => console.log(err));
  };
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

  _checkUserEmail(conversacion) {
    if (conversacion.vendedor === this.state.user) {
      return conversacion.email_comprador;
    } else {
      return conversacion.email_vendedor;
    }
  }

  _checkUserImage(conversacion) {
    if (conversacion.vendedor === this.state.user) {
      return conversacion.imagen_comprador;
    } else {
      return conversacion.imagen_vendedor;
    }
  }
  render() {
    var user = this.state.user;

    return (
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this.onRefresh.bind(this)}
          />
        }
        data={this.state.conversaciones}
        extraData={this.state}
        horizontal={false}
        renderItem={({ item, index }) => (
          <ListItem
            title={this._checkUserEmail(item)}
            leftAvatar={{
              source: {
                uri:
                  this._checkUserImage(item) !== null
                    ? this._checkUserImage(item)
                    : ""
              }
            }}
            style={styles.container}
            onPress={() =>
              this.props.navigation.navigate("ChatTabNavigator", {
                room: item.id,
                user: this.state.user,
                receiver: this._checkUser(item),
                email_receiver: this._checkUserEmail(item),
                imagen_receiver: this._checkUserImage(item),

                comprador: this.state.email_comprador,
                token: this.state.token
              })
            }
          />
        )}
        keyExtractor={this._keyExtractor}
      />
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
