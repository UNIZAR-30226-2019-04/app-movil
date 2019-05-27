import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
  LayoutAnimation,
  UIManager,
  KeyboardAvoidingView
} from "react-native";
import { Font } from "expo";
import { Input, Button } from "react-native-elements";

import Icon from "react-native-vector-icons/FontAwesome";
import SimpleIcon from "react-native-vector-icons/SimpleLineIcons";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const BG_IMAGE = require("../assets/images/bg_screen3.jpg");

import axios from "axios";
import { API_BASE } from "../config";
import { AsyncStorage } from "react-native";

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const TabSelector = ({ selected }) => {
  return (
    <View style={styles.selectorContainer}>
      <View style={selected && styles.selected} />
    </View>
  );
};

TabSelector.propTypes = {
  selected: PropTypes.bool.isRequired
};

export default class LoginScreen2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      fontLoaded: false,
      selectedCategory: 0,
      isLoading: false,
      isEmailValid: true,
      isPasswordValid: true,
      isConfirmationValid: true,
      isFormValid: true,
      isFormErrorMsg: "",
      isFormErrorMsgPw: ""
    };

    this.selectCategory = this.selectCategory.bind(this);
    this.login = this.login.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  async componentDidMount() {
    await Font.loadAsync({
      georgia: require("../assets/fonts/Georgia.ttf"),
      regular: require("../assets/fonts/Montserrat-Regular.ttf"),
      light: require("../assets/fonts/Montserrat-Light.ttf")
    });

    this.setState({ fontLoaded: true });
  }

  selectCategory(selectedCategory) {
    LayoutAnimation.easeInEaseOut();
    this.setState({
      selectedCategory,
      isLoading: false
    });
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    response = re.test(email);
    if (!response) {
      this.setState({ isFormErrorMsg: "Introduzca un email valido" });
    }
    return response;
  }

  login() {
    const { email, password } = this.state;
    this.setState({ isLoading: true });
    // Simulate an API call
    LayoutAnimation.easeInEaseOut();
    this.setState({
      isLoading: false,
      isEmailValid: this.validateEmail(email) || this.emailInput.shake(),
      isPasswordValid: password.length >= 6 || this.passwordInput.shake()
    });

    if (this.validateEmail(email) && password.length >= 6) {
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
          //console.log(resp.data);

          try {
            AsyncStorage.setItem("token", token);
            AsyncStorage.setItem("user", public_id);
          } catch (error) {
            //console.log(error);
          }

          // Add the following line:
          axios.defaults.headers.common["Authorization"] = token;
          this.props.navigation.navigate("Dashboard");
        })
        .catch(err => {
          //console.log("Error: ", err.response.status);
          if (err.response.status == 401 && this.state.isEmailValid) {
            this.setState({
              isFormErrorMsg: "Email o contraseña no coinciden.",
              isEmailValid: false
            });
          }

          try {
            AsyncStorage.removeItem("token" + "");
            AsyncStorage.removeItem("user" + "");
          } catch (error) {
            //console.log(error);
          }
        });
    }
  }

  firstPass(password) {
    if (password.length < 6) {
      return false;
    } else {
      if (
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /[0-9]/.test(password)
      ) {
        return true;
      } else {
        this.setState({
          isFormErrorMsgPw:
            "Introduzca una contraseña valida, debe contener al menos 6 caracteres con letras, números y una mayúscula"
        });
        return false;
      }
    }
  }
  signUp() {
    const { email, password, passwordConfirmation, username } = this.state;
    this.setState({ isLoading: true });
    // Simulate an API call
    LayoutAnimation.easeInEaseOut();
    this.setState({
      isLoading: false,
      isEmailValid: this.validateEmail(email) || this.emailInput.shake(),
      isPasswordValid: this.firstPass(password) || this.passwordInput.shake(),
      isConfirmationValid:
        password == passwordConfirmation || this.confirmationInput.shake()
    });
    //console.log(email, username, password);
    if (
      this.validateEmail(email) &&
      this.firstPass(password) &&
      password == passwordConfirmation
    ) {
      axios
        .post(
          `${API_BASE}/user/`,
          {
            email: email,
            username: username,
            password: password
          },
          {}
        )
        .then(resp => {
          console.log(resp.data);
          const token = resp.data.Authorization;
          const user = resp.data.user;
          this.setState({ selectedCategory: 0 });
        })
        .catch(err => {
          console.log(err);
          this.setState({ selectedCategory: 0 });
        });
    }
  }

  render() {
    const {
      selectedCategory,
      isLoading,
      isEmailValid,
      isPasswordValid,
      isConfirmationValid,
      email,
      username,
      password,
      passwordConfirmation
    } = this.state;
    const isLoginPage = selectedCategory === 0;
    const isSignUpPage = selectedCategory === 1;
    return (
      <View style={styles.container}>
        <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
          {this.state.fontLoaded ? (
            <View>
              <KeyboardAvoidingView
                contentContainerStyle={styles.loginContainer}
                behavior="position"
              >
                <View style={styles.titleContainer}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.titleText}>TELOCAM</Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    backgroundColor: "transparent"
                  }}
                >
                  <Button
                    id="loginButton"
                    style={{ backgroundColor: "transparent" }}
                    disabled={isLoading}
                    clear
                    activeOpacity={0.7}
                    onPress={() => this.selectCategory(0)}
                    containerStyle={{ flex: 1 }}
                    titleStyle={[
                      styles.categoryText,
                      isLoginPage && styles.selectedCategoryText
                    ]}
                    title={"Login"}
                  />
                  <Button
                    style={{ backgroundColor: "transparent" }}
                    disabled={isLoading}
                    clear
                    activeOpacity={0.7}
                    onPress={() => this.selectCategory(1)}
                    containerStyle={{ flex: 1 }}
                    titleStyle={[
                      styles.categoryText,
                      isSignUpPage && styles.selectedCategoryText
                    ]}
                    title={"Sign up"}
                  />
                </View>
                <View style={styles.rowSelector}>
                  <TabSelector selected={isLoginPage} />
                  <TabSelector selected={isSignUpPage} />
                </View>
                <View style={styles.formContainer}>
                  {isSignUpPage && (
                    <Input
                      leftIcon={
                        <Icon
                          name="user-o"
                          color="rgba(0, 0, 0, 0.38)"
                          size={25}
                          style={{ backgroundColor: "transparent" }}
                        />
                      }
                      value={username}
                      keyboardAppearance="light"
                      autoFocus={false}
                      autoCapitalize="none"
                      autoCorrect={false}
                      keyboardType="email-address"
                      returnKeyType="next"
                      inputStyle={{ marginLeft: 10 }}
                      placeholder={"Usuario"}
                      containerStyle={{
                        borderBottomColor: "rgba(0, 0, 0, 0.38)"
                      }}
                      ref={input => (this.emailInput = input)}
                      onSubmitEditing={() => this.emailInput.focus()}
                      onChangeText={username => this.setState({ username })}
                    />
                  )}
                  <Input
                    leftIcon={
                      <Icon
                        name="envelope-o"
                        color="rgba(0, 0, 0, 0.38)"
                        size={25}
                        style={{ backgroundColor: "transparent" }}
                      />
                    }
                    value={email}
                    keyboardAppearance="light"
                    autoFocus={false}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    returnKeyType="next"
                    inputStyle={{ marginLeft: 10 }}
                    placeholder={"Email"}
                    containerStyle={{
                      marginTop: 16,
                      borderBottomColor: "rgba(0, 0, 0, 0.38)"
                    }}
                    ref={input => (this.emailInput = input)}
                    onSubmitEditing={() => this.passwordInput.focus()}
                    onChangeText={email => this.setState({ email })}
                    errorMessage={
                      isEmailValid ? null : this.state.isFormErrorMsg
                    }
                  />

                  <Input
                    leftIcon={
                      <SimpleIcon
                        name="lock"
                        color="rgba(0, 0, 0, 0.38)"
                        size={25}
                        style={{ backgroundColor: "transparent" }}
                      />
                    }
                    value={password}
                    keyboardAppearance="light"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    returnKeyType={isSignUpPage ? "next" : "done"}
                    blurOnSubmit={true}
                    containerStyle={{
                      marginTop: 16,
                      borderBottomColor: "rgba(0, 0, 0, 0.38)"
                    }}
                    inputStyle={{ marginLeft: 10 }}
                    placeholder={"Contraseña"}
                    ref={input => (this.passwordInput = input)}
                    onSubmitEditing={() =>
                      isSignUpPage
                        ? this.confirmationInput.focus()
                        : this.login()
                    }
                    onChangeText={password => this.setState({ password })}
                    errorMessage={
                      isPasswordValid ? null : this.state.isFormErrorMsgPw
                    }
                  />
                  {isSignUpPage && (
                    <Input
                      icon={
                        <SimpleIcon
                          name="lock"
                          color="rgba(0, 0, 0, 0.38)"
                          size={25}
                          style={{ backgroundColor: "transparent" }}
                        />
                      }
                      value={passwordConfirmation}
                      secureTextEntry={true}
                      keyboardAppearance="light"
                      autoCapitalize="none"
                      autoCorrect={false}
                      keyboardType="default"
                      returnKeyType={"done"}
                      blurOnSubmit={true}
                      containerStyle={{
                        marginTop: 16,
                        borderBottomColor: "rgba(0, 0, 0, 0.38)"
                      }}
                      inputStyle={{ marginLeft: 10 }}
                      placeholder={"Confirmar contraseña"}
                      ref={input => (this.confirmationInput = input)}
                      onSubmitEditing={this.signUp}
                      onChangeText={passwordConfirmation =>
                        this.setState({ passwordConfirmation })
                      }
                      errorMessage={
                        isConfirmationValid
                          ? null
                          : "Por favor, vuelve a introducir la misma contraseña"
                      }
                    />
                  )}
                  <Button
                    buttonStyle={styles.loginButton}
                    containerStyle={{ marginTop: 32, flex: 0 }}
                    activeOpacity={0.8}
                    title={isLoginPage ? "LOGIN" : "SIGN UP"}
                    onPress={isLoginPage ? this.login : this.signUp}
                    titleStyle={styles.loginTextButton}
                    loading={isLoading}
                    disabled={isLoading}
                  />
                </View>
              </KeyboardAvoidingView>
              <View style={styles.helpContainer}>
                <Button
                  title={"¿Necesita ayuda?"}
                  titleStyle={{ color: "white" }}
                  buttonStyle={{ backgroundColor: "transparent" }}
                  underlayColor="transparent"
                  onPress={() => {}} //console.log("Account created")}
                />
              </View>
            </View>
          ) : (
            <Text>Cargando...</Text>
          )}
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rowSelector: {
    height: 20,
    flexDirection: "row",
    alignItems: "center"
  },
  selectorContainer: {
    flex: 1,
    alignItems: "center"
  },
  selected: {
    position: "absolute",
    borderRadius: 50,
    height: 0,
    width: 0,
    top: -5,
    borderRightWidth: 70,
    borderBottomWidth: 70,
    borderColor: "white",
    backgroundColor: "white"
  },
  loginContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  loginTextButton: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold"
  },
  loginButton: {
    backgroundColor: "#3399FF",
    borderRadius: 10,
    height: 50,
    width: 200
  },
  titleContainer: {
    height: 150,
    backgroundColor: "transparent",
    justifyContent: "center"
  },
  formContainer: {
    backgroundColor: "white",
    width: SCREEN_WIDTH - 30,
    borderRadius: 10,
    paddingTop: 32,
    paddingBottom: 32,
    alignItems: "center"
  },
  loginText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white"
  },
  bgImage: {
    flex: 1,
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "stretch"
  },
  categoryText: {
    textAlign: "center",
    color: "white",
    fontSize: 24,
    fontFamily: "light",
    backgroundColor: "transparent",
    opacity: 0.54
  },
  selectedCategoryText: {
    opacity: 1
  },
  titleText: {
    color: "white",
    fontSize: 30,
    fontFamily: "regular"
  },
  helpContainer: {
    height: 64,
    alignItems: "center",
    justifyContent: "center"
  }
});
