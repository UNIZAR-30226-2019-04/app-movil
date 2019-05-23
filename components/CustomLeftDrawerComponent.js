import React, { Component } from "react";
import { View, StyleSheet, SafeArea, ScrollView } from "react-native";
import { Avatar, Tooltip, Text } from "react-native-elements";
import axios from "axios";
import { API_BASE, DEBUG, USER, TOKEN } from "../config";
import { AsyncStorage } from "react-native";
import { DrawerItems } from "react-navigation";

export default class CustomLeftDrawerComponent extends Component {
  state = {
    profile: {},
    imagen_perfil: "http://34.90.77.95:10080/user/default.png"
  };

  componentDidMount() {
    this.fetchData();
  }
  fetchData = async () => {
    let token, user;
    try {
      user = await AsyncStorage.getItem("user");
      token = await AsyncStorage.getItem("token");
      console.log("User", user, token);
    } catch (error) {
      console.log(error);
    }
    if (DEBUG) {
      user = USER;
      token = TOKEN;
    }
    const URL = `${API_BASE}/user/${user}`;
    const res = await axios.get(URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    });
    const perfil = res.data;
    console.log("Response Drawer Perfil", perfil);
    this.setState({ profile: perfil, imagen_perfil: perfil.imagen_perfil });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            marginTop: 30,
            height: 100,
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Avatar
            rounded
            onPress={() => console.log("Works!")}
            size="large"
            containerStyle={{ marginHorizontal: 10 }}
            source={{
              uri: this.state.imagen_perfil
            }}
          />
        </View>

        <ScrollView>
          <DrawerItems {...this.props} />
        </ScrollView>
      </View>
    );
  }
}
