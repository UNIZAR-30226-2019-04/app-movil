import React, { Component } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { API_BASE } from "../config";
import axios from "axios";
import SocketIOClient from "socket.io-client/dist/socket.io";
import io from "socket.io-client/dist/socket.io";

export default class Settings extends Component {
  constructor(props) {
    super(props);
    // Creating the socket-client instance will automatically connect to the server.
    this.socket = SocketIOClient(`${API_BASE}/mychat`, {
      transports: ["websocket"]
    });
  }
  state = {
    messages: [],

    input: "",
    user: "",
    room: "",
    receiver: "",
    token: "",
    conversaciones: []
  };

  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("receiver"),
    headerTitleStyle: { textAlign: "center", alignSelf: "center" },
    headerStyle: {
      backgroundColor: "white"
    }
  });

  parseMsg(data) {
    const user = this.props.navigation.state.params.user;

    var res = {
      _id: data.id,
      text: data.text,
      createdAt: data.created_date,
      user: {
        _id: data.user === user ? 1 : 2,
        name: data.user === user ? "Me" : "Person",
        avatar: "https://placeimg.com/140/140/any"
      }
    };
    //this.feed.push(res);
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
        const messages = msg.map(m => this.parseMsg(m));
        this.setState({ messages: messages.reverse() });
      });
  };

  componentWillMount() {
    const { navigation } = this.props;
    const user = this.props.navigation.state.params.user;
    const token = navigation.state.params.token;

    const room = navigation.state.params.room;
    const receiver = navigation.state.params.receiver;
    console.log("Variables", user, room, receiver, token);
    this.setState({ user: user, room: room, receiver: receiver, token: token });

    this.fetchMessages(room, token);

    console.log("Params", this.props.navigation.state.params);
    this.socket.emit("JOINED", {
      room: navigation.getParam("room")
    });

    this.socket.on("MESSAGE", data => {
      console.log("MESSAGE", data);
      var msg = this.parseMsg(data);
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, msg)
      }));
    });
  }

  onSend(messages = []) {
    const { navigation } = this.props;

    const msg = messages[0];
    console.log("SEND_MESSAGE", messages[0]);

    this.socket.emit("SEND_MESSAGE", {
      user: navigation.getParam("user"),
      text: msg.text,
      conversacion: navigation.getParam("room"),
      room: navigation.getParam("room"),
      created_date: msg.createdAt
    });

    /*     this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    })); */
  }

  render() {
    return (
      <GiftedChat
        inverted={true}
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1
        }}
      />
    );
  }
}
