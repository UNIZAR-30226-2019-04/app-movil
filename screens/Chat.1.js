import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Field,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  SafeAreaView
} from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

import Icon from "@expo/vector-icons/Ionicons";
import { Input, Button } from "react-native-elements";
import axios from "axios";
import { API_BASE } from "../config";
import { AsyncStorage } from "react-native";
const keyboardVerticalOffset = Platform.OS === "ios" ? 60 : 0;

class Bubble extends React.PureComponent {
  render() {
    const text = this.props.text;
    return (
      <View style={[styles.balloon, { backgroundColor: "#1084ff" }]}>
        <Text style={{ paddingTop: 5, color: "white" }}>{item.text}</Text>
        <View style={[styles.arrowContainer, styles.arrowLeftContainer]}>
          <View style={styles.arrowLeft} />
        </View>
      </View>
    );
  }
}

// Tutorial https://blog.sendbird.com/react-native-chat-tutorial-implement-a-chat-screen
export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      user: "",
      room: "",
      receiver: "",
      token: "",
      conversaciones: []
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("receiver"),
    headerTitleStyle: { textAlign: "center", alignSelf: "center" },
    headerStyle: {
      backgroundColor: "white"
    }
  });

  fetchMessages = (room, token) => {
    console.log("Fetch", room, token);
    const URL = `${API_BASE}/chat/` + room;
    axios
      .get(URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        }
      })
      .then(response => {
        const conersaciones = response.data.data;
        this.setState({ conversaciones: conersaciones });
      });
  };

  componentWillMount() {
    const { navigation } = this.props;
    const user = navigation.getParam("user");
    const token = navigation.getParam("token");

    const room = navigation.getParam("room");
    const receiver = navigation.getParam("receiver");

    this.setState({ user: user, room: room, receiver: receiver, token: token });
    this.fetchMessages(room, token);
  }
  _keyExtractor = (item, index) => {
    return item.id.toString();
  };
  render() {
    const { input, user, receiver, room } = this.state;
    console.log(this.state.conversaciones);
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={keyboardVerticalOffset}
          style={styles.keyboardAvoidContainer}
          behavior="padding"
        >
          <FlatList
            data={this.state.conversaciones}
            extraData={this.state}
            renderItem={({ item, index }) => (
              <View style={[styles.balloon, { backgroundColor: "#1084ff" }]}>
                <Text style={{ paddingTop: 5, color: "white" }}>
                  {item.text}
                </Text>
                <View
                  style={[styles.arrowContainer, styles.arrowLeftContainer]}
                >
                  <View style={styles.arrowLeft} />
                </View>
              </View>
            )}
            keyExtractor={this._keyExtractor}
          />
          <Input
            style={{
              height: 40,
              width: "100%",
              backgroundColor: "#fff",
              paddingLeft: 10,
              justifySelf: "flex-end",
              color: "#fff"
            }}
            placeholder={"Enter text here"}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
const styles = {
  container: {
    flex: 1
  },
  keyboardAvoidContainer: {
    flex: 1,
    backgroundColor: ""
  },
  item: {
    marginVertical: moderateScale(7, 2),
    flexDirection: "row"
  },
  itemIn: {
    marginLeft: 20
  },
  itemOut: {
    alignSelf: "flex-end",
    marginRight: 20
  },
  balloon: {
    maxWidth: moderateScale(250, 2),
    paddingHorizontal: moderateScale(10, 2),
    paddingTop: moderateScale(5, 2),
    paddingBottom: moderateScale(7, 2),
    borderRadius: 20
  },
  arrowContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    flex: 1
  },
  arrowLeftContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-start"
  },

  arrowRightContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },

  arrowLeft: {
    left: moderateScale(-6, 0.5)
  },

  arrowRight: {
    right: moderateScale(-6, 0.5)
  }
};
