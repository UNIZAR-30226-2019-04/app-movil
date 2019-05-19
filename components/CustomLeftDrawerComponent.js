import React, { Component } from "react";
import { View, StyleSheet, SafeArea, ScrollView } from "react-native";
import { Avatar, Tooltip, Text } from "react-native-elements";
import axios from "axios";
import { API_BASE } from "../config";
import { AsyncStorage } from "react-native";
import { DrawerItems } from "react-navigation";

export default class CustomLeftDrawerComponent extends Component {
  state = {
    profile: {},
    imagen_perfil: ""
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
    user = "8e4de80f-d9bf-411c-a696-58e3481a1b36";
    token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NTc1ODg1NTEsInN1YiI6MTksImV4cCI6MTU1NzY3NDk1Nn0.rE3VWsRoamkEMPSM48kfnj1c5AfH572v2QjQzpoHxIA";
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
