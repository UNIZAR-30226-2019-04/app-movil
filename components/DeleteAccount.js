import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { Button, ButtonGroup, Header, Input } from "react-native-elements";

import { RkStyleSheet } from "react-native-ui-kitten";
import axios from "axios";
import { API_BASE, API_KEY } from "../config";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

class DeleteAccount extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    email: "",
    password: "",
    token: "",
    selectedIndex: null,
    isPasswordValid: true,
    errorMsg: ""
  };

  onPasswordInputChanged = text => {
    this.setState({ password: text });
  };

  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("receiver"),
    headerTitleStyle: { textAlign: "center", alignSelf: "center" },
    headerStyle: {
      backgroundColor: "white"
    }
  });

  _deleteUser() {
    const { password } = this.state;
    const public_id = this.props.user;
    const token = this.props.token;
    console.log("_deleteUser", public_id, token);

    axios
      .post(
        `${API_BASE}/user/${public_id}/delete`,
        {
          password: password
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token
          }
        }
      )
      .then(resp => {
        console.log(resp.data);
        console.log("_deleteUser", resp.data);

        if (err.response.status !== 200) {
          this.setState({
            errorMsg: "Contraseña incorrecta.",
            isPasswordValid: false
          });
        }
        this.props.navigation.navigate("Welcome");
        //Aquí la parte de borrar
      })
      .catch(err => {
        console.log("Error: ", err.response.status);
      });
  }

  render() {
    return (
      <View>
        <View style={styles.section}>
          <Header
            centerComponent={{
              text: "BORRAR CUENTA",
              style: {
                color: "#fff",
                fontSize: 24,
                marginBottom: 20
              }
            }}
            backgroundColor="#0864AF"
          />
          <View style={styles.row}>
            <Input
              label="Introduzca su contraseña:"
              value={this.state.password}
              //rkType="right clear"
              secureTextEntry
              onChangeText={this.onPasswordInputChanged}
              errorMessage={
                this.state.isPasswordValid ? null : this.state.errorMsg
              }
            />
          </View>
          <Button
            containerStyle={{ height: 180, marginHorizontal: 30 }}
            style={styles.button}
            title="BORRAR"
            onPress={() => this._deleteUser()}
          />
        </View>
      </View>
    );
  }
}
export default DeleteAccount;

const styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base
  },
  padding: {
    padding: 20,
    height: 200
  },
  section: {
    backgroundColor: "#F5F5F5",
    height: height
  },
  reportButton: {
    width: width / 2 + 30,
    height: 90,
    borderRadius: 9,
    borderWidth: 4,
    borderColor: "red",
    marginTop: 35,
    marginBottom: 35,
    marginLeft: width / 4 - 15
  },
  row: {
    flexDirection: "row",
    paddingHorizontal: 17.5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border.base,
    alignItems: "center",
    marginTop: 50
  },
  button: {
    paddingVertical: 30,
    flex: 1,
    height: 30
  }
}));
