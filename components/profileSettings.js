import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import {
  RkText,
  RkTextInput,
  RkAvoidKeyboard,
  RkTheme,
  RkStyleSheet
} from "react-native-ui-kitten";
import { Avatar, Button } from "react-native-elements";
import axios from "axios";
import { API_BASE, API_KEY } from "../config";
import { AsyncStorage } from "react-native";
import Textarea from "react-native-textarea";
import { Constants, MapView, Location, Permissions } from "expo";

export default class ProfileSettings extends React.Component {
  static navigationOptions = {
    title: "Profile Settings".toUpperCase()
  };

  state = {
    descripcion: "",
    cajas_productos: [],
    radio_ubicacion: 0,
    valoraciones_recibidas: [],
    valoraciones_hechas: [],
    deseados: [],
    latitud: null,
    productos_comprados: 0,
    nick: "",
    longitud: null,
    productos_vendidos: 0,

    nombre: "",
    apellidos: "",
    imagen_perfil: "",
    valoracion: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
    phone: null,
    localizacion: "",
    userID: 0,
    token: ""
  };

  getAddressFromCoordinates(lat, long) {
    console.log(`latlng=${lat},${long}`);
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${API_KEY}`,
        {},
        {}
      )
      .then(resp => {
        let localizacion = resp.data.results[0].formatted_address;
        console.log(localizacion);
        this.setState({ localizacion });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getCoordinatesFromAddress(location) {
    console.log(`address=${location}`);
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${API_KEY}`,
        {},
        {}
      )
      .then(resp => {
        let coords = resp.data.results[0].geometry.location;
        this.setState({
          latitud: coords.lat,
          longitud: coords.lng
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    console.log("_getLocationAsync", status);
    if (status !== "granted") {
      this.setState({
        locationResult: "Permiso para acceder a la localizacion fue rechazado"
      });
      return;
    } else {
      this.setState({ hasLocationPermissions: true });
    }

    let location = await Location.getCurrentPositionAsync({});
    //this.setState({ locationResult: JSON.stringify(location) });
    this.setState({ locationResult: location });

    // Center the map on the location we just fetched.
    let lat = location.coords.latitude;
    let long = location.coords.longitude;

    this.setState({
      latitud: lat,
      longitud: long
    });

    this.getAddressFromCoordinates(lat, long);
  };

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
    console.log(URL, user, token);

    const res = await axios.get(URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    });
    const perfil = res.data;
    this.setState(perfil);
    this.setState({ userID: user, token: token });

    if (perfil.latitud !== null) {
      this.getAddressFromCoordinates(perfil.latitud, perfil.longitud);
    }
  };

  updateProfile = async () => {
    console.log("GUARDAR");
    const user = this.state.userID;
    const token = this.state.token;

    const URL = `${API_BASE}/user/${user}`;
    console.log(URL, user, token);

    const res = await axios.put(URL, this.state, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    });
    const perfil = res.data;
    console.log("Response Update Perfil", perfil);
    this.setState(perfil);
  };

  changePassword = async () => {
    console.log("CHANGE PASSWORD");
  };

  componentDidMount() {
    this.fetchData();
  }

  onNombreInputChanged = text => {
    this.setState({ nombre: text });
  };

  onDescriptionChanged = text => {
    this.setState({ descripcion: text });
  };

  onApellidoInputChanged = text => {
    this.setState({ apellidos: text });
  };

  onEmailInputChanged = text => {
    this.setState({ email: text });
  };

  onLocationChanged = text => {
    this.setState({ localizacion: text });

    this.getCoordinatesFromAddress(text);
  };

  onPhoneInputChanged = text => {
    this.setState({ phone: text });
  };

  onPasswordInputChanged = text => {
    this.setState({ password: text });
  };

  onNewPasswordInputChanged = text => {
    this.setState({ newPassword: text });
  };

  onConfirmPasswordInputChanged = text => {
    this.setState({ confirmPassword: text });
  };

  render() {
    console.log(this.state);
    return (
      <ScrollView style={styles.root} style={{ marginTop: 0 }}>
        <RkAvoidKeyboard>
          <View style={styles.header}>
            <Avatar
              onPress={() => console.log("Works!")}
              size="large"
              containerStyle={{ flex: 1 }}
              source={{
                uri:
                  "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"
              }}
              showEditButton
            />
          </View>
          <View style={styles.section}>
            <View style={[styles.row, styles.heading]}>
              <RkText rkType="header6 primary">INFO</RkText>
            </View>
            <View style={styles.row}>
              <RkTextInput
                label="Nombre"
                value={this.state.nombre}
                rkType="right clear"
                onChangeText={this.onNombreInputChanged}
              />
            </View>
            <View style={styles.row}>
              <RkTextInput
                label="Apellido"
                value={this.state.apellidos}
                onChangeText={this.onApellidoInputChanged}
                rkType="right clear"
              />
            </View>

            <View style={styles.row}>
              <RkTextInput
                label="Localización"
                value={this.state.localizacion}
                onChangeText={this.onLocationChanged}
                rkType="right clear"
              />
            </View>
            <Textarea
              containerStyle={styles.textareaContainer}
              style={styles.textarea}
              onChangeText={this.onDescriptionChanged}
              defaultValue={this.state.descripcion}
              maxLength={120}
              placeholder={"Descipción ..."}
              placeholderTextColor={"#c7c7c7"}
              underlineColorAndroid={"transparent"}
            />

            <Button
              type="clear"
              containerStyle={{ height: 50, marginTop: 20 }}
              style={styles.button}
              title="GUARDAR"
              onPress={this.updateProfile}
            />
          </View>

          <View style={styles.section}>
            <View style={[styles.row, styles.heading]}>
              <RkText rkType="primary header6">CAMBIAR CONTRASEÑA</RkText>
            </View>
            <View style={styles.row}>
              <RkTextInput
                label="Antigua contraseña"
                value={this.state.password}
                rkType="right clear"
                secureTextEntry
                onChangeText={this.onPasswordInputChanged}
              />
            </View>
            <View style={styles.row}>
              <RkTextInput
                label="Nueva contraseña"
                value={this.state.newPassword}
                rkType="right clear"
                secureTextEntry
                onChangeText={this.onNewPasswordInputChanged}
              />
            </View>
            <View style={styles.row}>
              <RkTextInput
                label="Confirmar nueva contraseña"
                value={this.state.confirmPassword}
                rkType="right clear"
                secureTextEntry
                onChangeText={this.onConfirmPasswordInputChanged}
              />
            </View>
          </View>

          <Button
            type="clear"
            containerStyle={{ height: 100 }}
            style={styles.button}
            title="ENVIAR"
            onPress={this.changePassword()}
          />
        </RkAvoidKeyboard>
      </ScrollView>
    );
  }
}

const styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base
  },
  header: {
    backgroundColor: theme.colors.screen.neutral,
    paddingVertical: 25,
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  section: {
    marginVertical: 15
  },
  heading: {
    paddingBottom: 12.5
  },
  row: {
    flexDirection: "row",
    paddingHorizontal: 17.5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border.base,
    alignItems: "center"
  },
  button: {
    flex: 1,
    height: 100
  },
  textareaContainer: {
    height: 180,
    padding: 20,
    backgroundColor: "#F5FCFF"
  },
  textarea: {
    textAlignVertical: "top", // hack android
    height: 170,
    fontSize: 14,
    color: "#333"
  }
}));
