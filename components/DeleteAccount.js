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
    selectedIndex: null
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
    //Falta integrar con backend
    /*     
        const { email, password } = this.state;
        this.setState({ isLoading: true });
        // Simulate an API call
        LayoutAnimation.easeInEaseOut();
        this.setState({
        isLoading: false,
        isEmailValid: this.validateEmail(email) || this.emailInput.shake(),
        isPasswordValid: password.length >= 8 || this.passwordInput.shake()
        });

        axios
        .post(
            `${API_BASE}/user/login`,
            {
            email: email,
            password: password
            },
            {}
        )
        .then(resp => {
            const token = resp.data.Authorization;
            //const user = resp.data.user;
            const public_id = resp.data.public_id;
            console.log(resp.data);

            try {
            AsyncStorage.setItem("token", token);
            AsyncStorage.setItem("user", public_id);
            } catch (error) {
            console.log(error);
            }

            // Add the following line:
            axios.defaults.headers.common["Authorization"] = token;
            this.props.navigation.navigate("Dashboard");

            //Aquí la parte de borrar
        })
        .catch(err => {
            console.log("Error: ", err.response.status);
            if (err.response.status == 401 && this.state.isEmailValid) {
            this.setState({
                isFormErrorMsg: "Contraseña inválida.",
                isEmailValid: false
            });
            }

            try {
            AsyncStorage.removeItem("token" + "");
            AsyncStorage.removeItem("user" + "");
            } catch (error) {
            console.log(error);
            }
        });*/
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
              onChangeText={this.onPasswordInputChanged}
            />
          </View>
          <Button
            containerStyle={{ height: 160 }}
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
    alignItems: "center"
  },
  button: {
    paddingVertical: 30,
    flex: 1,
    height: 30
  }
}));

const styles2 = StyleSheet.create(theme => ({
  bottomView: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0
  }
}));
