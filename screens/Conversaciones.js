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
    conversaciones: [
      {
        id: 1,
        seller: 2,
        seller_email: "albertoynono@gmail.com",
        buyer_email: "albert111.garcia@gmail.com",
        buyer: 2,
        reated_date: "2019-02-15 15:26:52"
      },
      {
        id: 2,
        buyer: 1,
        buyer_email: "albertoynono@gmail.com",
        seller_email: "albert111.garcia@gmail.com",
        seller: 2,
        created_date: "2019-02-15 15:26:52"
      }
    ],
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

      //user = "unzurdo@gmail.com";
      user = "8e4de80f-d9bf-411c-a696-58e3481a1b36";
      token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NTc1ODg1NTEsInN1YiI6MTksImV4cCI6MTU1NzY3NDk1Nn0.rE3VWsRoamkEMPSM48kfnj1c5AfH572v2QjQzpoHxIA";

      if (user !== null) {
        this.setState({ user: user, token: token });
      }
    } catch (error) {
      console.log(error);
    }
    const URL = `${API_BASE}/conversacion/all/` + user;
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
