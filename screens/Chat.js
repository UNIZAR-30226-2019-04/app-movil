import React, { Component } from "react";
import { View, Platform } from "react-native";

import { GiftedChat } from "react-native-gifted-chat";
import { API_BASE, DEBUG } from "../config";
import axios from "axios";
import SocketIOClient from "socket.io-client/dist/socket.io";
import KeyboardSpacer from "react-native-keyboard-spacer";

import { AsyncStorage } from "react-native";

export default class Settings extends Component {
  constructor(props) {
    super(props);
    // Creating the socket-client instance will automatically connect to the server.
    this.socket = SocketIOClient("http://34.90.77.95:5000/mychat", {
      transports: ["websocket"]
    });
  }
  state = {
    messages: [],
    input: "",
    room: 0,
    receiver: "",
    user: "",
    email_receiver: "",
    imagen_receiver: "",
    token:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTgyNzgzNzcsInN1YiI6NCwiaWF0IjoxNTU4MTkxOTcyfQ.5komhqF1kxibiUySym0l7x3pPNuqcFzoUG33815SX88"
  };

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.email_receiver,
    headerTitleStyle: { textAlign: "center", alignSelf: "center" },
    headerStyle: {
      backgroundColor: "white"
    }
  });

  parseMsg(data) {
    //const user = this.props.navigation.state.params.user;
    const user = this.state.user;

    var res = {
      _id: data.id,
      text: data.texto,
      createdAt: data.fecha,
      user: {
        _id: data.usuario === user ? 1 : 2,
        name: data.usuario === user ? "Me" : "Person",
        avatar: this.props.navigation.state.params.imagen_receiver
      }
    };

    console.log(res);
    return res;
  }

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
        const msg = response.data.data;
        console.log("fetchMessages", response.data.data);
        const messages = msg.map(m => this.parseMsg(m));
        this.setState({ messages: messages.reverse() });
      });
  };

  fetchRoomId(buyer, seller) {
    console.log("--> Fetch", buyer, seller);
    const URL = `${API_BASE}/conversacion/`;
    axios
      .post(URL, {
        email_vendedor: "email_vendedor",
        email_comprador: "email_comprador",
        comprador: buyer,
        vendedor: seller
      })
      .then(response => {
        const id = response.data.id;
        console.log("fetchRoomId", id);
        this.setState({ room: id });
        console.log("connected!");
        this.socket.emit("JOINED", {
          room: id
        });
        this.fetchMessages(id, this.state.token);
      })
      .catch(error => {
        console.log("fetchRoomId ERROR: ", error);
      });
  }

  componentDidMount = async () => {
    let token, user;
    try {
      user = await AsyncStorage.getItem("user");
      token = await AsyncStorage.getItem("token");

      console.log("User", user, token);

      if (DEBUG) user = "6addcd19-f185-4078-966e-e57cf870046c";
      if (user !== null) {
        this.setState({ user: user, token: token });
      }
    } catch (error) {
      console.log(error);
    }
    const receiver = this.props.navigation.state.params.receiver;

    const email_receiver = this.props.navigation.state.params.email_receiver;
    const imagen_receiver = this.props.navigation.state.params.imagen_receiver;

    this.setState({
      email_receiver,
      imagen_receiver,
      receiver
    });

    this.props.navigation.setParams({
      email_receiver
    });

    this.fetchRoomId(user, receiver);

    const { navigation } = this.props;

    //const receiver = navigation.state.params.receiver;
    console.log("Variables", user, receiver, token);
    this.setState({ user: user, receiver: receiver, token: token });
    console.log("Params", this.props.navigation.state.params);

    this.socket.on("MESSAGE", data => {
      console.log("MESSAGE", data);
      var msg = this.parseMsg(data);
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, msg)
      }));
    });
  };

  onSend(messages = []) {
    const { navigation } = this.props;

    const msg = messages[0];
    console.log("SEND_MESSAGE", messages[0], this.state.room);

    this.socket.emit("SEND_MESSAGE", {
      //usuario: navigation.getParam("user"),
      usuario: this.state.user,
      texto: msg.text,
      conversacion: this.state.room,
      room: this.state.room,
      fecha: msg.createdAt
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <GiftedChat
          //locale={strings.getLanguage()}
          keyboardShouldPersistTaps="never"
          inverted={true}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1
          }}
        />
        <KeyboardSpacer style={{ marginVertical: 20 }} />
      </View>
    );
  }
}
