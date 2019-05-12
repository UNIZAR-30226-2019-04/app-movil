import React from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  TextInput,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image
} from "react-native";
import {
  RkText,
  RkTextInput,
  RkAvoidKeyboard,
  RkTheme,
  RkStyleSheet
} from "react-native-ui-kitten";
import { Avatar, Button } from "react-native-elements";
import Textarea from "react-native-textarea";
import UploadMultimedia from "./UploadMultimedia";
import CameraRollSelect from "./CameraRollSelect";
import TypePickerModal from "./TypePickerModal";
import UploadProductModal from "./UploadProductModal";
import CategoryPickerModal from "./CategoryPickerModal";
import { addTag } from "../actions";
import { Constants, MapView, Location, Permissions } from "expo";
import axios from "axios";
import { API_BASE } from "../config";
import { AsyncStorage } from "react-native";

export default class ProfileSettings extends React.Component {
  static navigationOptions = {
    title: "Profile Settings".toUpperCase()
  };

  state = {
    precioBase: 0,
    precioAux: 0,
    vendedor: "",
    fechaExp: "",
    latitud: "",
    longitud: "",
    multimedia: [],
    title: "",
    tipo: "",
    description: "",
    categoria: "",
    photos: [],
    radio_ubicacion: 0,
    mapRegion: null,
    hasLocationPermissions: false,
    locationResult: null
  };


  uploadProduct() {
    axios
    .post(
      `${API_BASE}/user/login`,
      {
        titulo: this.state.title,
        descripcion: this.state.description,
        precioBase: this.state.precioBase,
        categoria: this.state.categoria,
        tipo: this.state.tipo,
        radio_ubicacion: this.state.radio_ubicacion,
        latitud: this.state.latitud,
        longitud: this.state.longitud,
        fechaexpiracion: this.state.fechaExp
      },
      {}
    )
    .then(resp => {
      const token = resp.data.Authorization;
      const public_id = resp.data.public_id;
      console.log(resp.data);

      try {
        AsyncStorage.setItem("token", token);
        AsyncStorage.setItem("user", public_id);
        
      } catch (error) {
        console.log(error);
      }

      this.setState({ vendedor: public_id });
      // Add the following line:
      axios.defaults.headers.common["Authorization"] = token;
    })

    console.log("Titulo:",this.state.title);
    console.log("Precio:",this.state.precioBase);
    console.log("Latitud:",this.state.latitud);
    console.log("Longitud:",this.state.longitud);
    console.log("Tipo:",this.state.tipo);
    console.log("Descripcion:",this.state.description);
    console.log("Categoria:",this.state.categoria);
    console.log("Radio_ubicacion:",this.state.radio_ubicacion);
    console.log("Usuario:",this.state.vendedor);

    if (this.state.tipo == "normal"){
      this.uploadProductNormal();
    } else if (this.state.tipo == "trueque"){
      this.uploadProductTrueque();
    } else if (this.state.tipo == "subasta"){
      this.uploadProductSubasta()
    }
    this.reset_forms();
  }

  uploadProductNormal(){
    const { email, password } = this.state;
    axios
        .post(
          `${API_BASE}/user/producto/`,
          {
            titulo: this.state.title,
            descripcion: this.state.description,
            precioBase: this.state.precioBase,
            categoria: this.state.categoria,
            tipo: this.state.tipo,
            radio_ubicacion: this.state.radio_ubicacion,
            latitud: this.state.latitud,
            longitud: this.state.longitud,
            vendedor: this.state.vendedor
          },
          {}
        )

  }

  uploadProductSubasta(){
    const { email, password } = this.state;
    axios
        .post(
          `${API_BASE}/user/producto/`,
          {
            titulo: this.state.title,
            descripcion: this.state.description,
            precioBase: this.state.precioBase,
            categoria: this.state.categoria,
            tipo: this.state.tipo,
            radio_ubicacion: this.state.radio_ubicacion,
            latitud: this.state.latitud,
            longitud: this.state.longitud,
            fechaexpiracion: this.state.fechaExp,
            vendedor: this.state.vendedor
          },
          {}
        )

  }

  uploadProductNormal(){
    const { email, password } = this.state;
    axios
        .post(
          `${API_BASE}/user/producto/`,
          {
            titulo: this.state.title,
            descripcion: this.state.description,
            precioBase: this.state.precioBase,
            categoria: this.state.categoria,
            tipo: this.state.tipo,
            radio_ubicacion: this.state.radio_ubicacion,
            latitud: this.state.latitud,
            longitud: this.state.longitud,
            precioAux: this.state.precioAux,
            vendedor:this.state.vendedor
          },
          {}
        )
        
  }

  reset_forms(){
    this.setState({
      precioBase: 0,
      precioAux: 0,
      vendedor: "",
      fechaExp: "",
      latitud: "",
      longitud: "",
      multimedia: [],
      title: "",
      tipo: "",
      description: "",
      categoria: "",
      photos: [],
      mapRegion: null,
      hasLocationPermissions: false,
      locationResult: null
    });
    this.render();
  }

  componentDidMount() {
    this._getLocationAsync();
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        locationResult: "Permission to access location was denied"
      });
    } else {
      this.setState({ hasLocationPermissions: true });
    }

    let location = await Location.getCurrentPositionAsync({});
    //this.setState({ locationResult: JSON.stringify(location) });
    this.setState({ locationResult: location });

    // Center the map on the location we just fetched.
    this.setState({
      mapRegion: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      latitud: location.coords.latitude,
      longitud: location.coords.longitude
    });
  };

  saveImages = photos => {
    this.setState({ photos: photos });
    console.log("Save Images", photos);
  };

  uploadImageAsync = async uri => {
    let apiUrl = "https://file-upload-example-backend-dkhqoilqqn.now.sh/upload";

    // Note:
    // Uncomment this if you want to experiment with local server
    //
    // if (Constants.isDevice) {
    //   apiUrl = `https://your-ngrok-subdomain.ngrok.io/upload`;
    // } else {
    //   apiUrl = `http://localhost:3000/upload`
    // }

    let uriParts = uri.split(".");
    let fileType = uriParts[uriParts.length - 1];

    let formData = new FormData();
    formData.append("photo", {
      uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`
    });

    let options = {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data"
      }
    };

    return fetch(apiUrl, options);
  };

  onTitleChanged = text => {
    this.setState({ title: text });
  };

  saveCategory = category => {
    console.log("saveCategory", category);
    this.setState({ categoria: category });
  };

  saveType = type => {
    console.log("saveType",type);
    if (type == "Normal"){
      this.setState({ tipo: "normal" });
    }else if (type == "Trueque"){
      this.setState({ tipo: "trueque" });
    }else if (type == "Subasta"){
      this.setState({ tipo: "subasta" });
    }
  };

  onDescriptionChanged = text => {
    this.setState({ description: text });
  };

  onPrecioChanged = text => {
    this.setState({ precioBase: text });
  };

  onPrecioTruequeChanged = text => {
    this.setState({ precioAux: text });
  };

  onRadioUbicacionChanged = text => {
    this.setState({ radio_ubicacion: text });
  };

  render = () => {
    console.log("Location", this.state.locationResult);
    let image = {};
    image.location =
      "https://photos5.appleinsider.com/gallery/30510-50255-all-three-goals-apple-watch-xl.jpg";
    return (
      <ScrollView style={styles.root} style={{ marginTop: 0 }}>
        <RkAvoidKeyboard>
          <View style={{ height: 100 }} />

          <View style={styles.section}>
            <View style={[styles.row, styles.heading]}>
              <RkText rkType="header6 primary">INFO</RkText>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Título</Text>
              <TextInput
                style={styles.text_input}
                onChangeText={this.onTitleChanged}
                value={this.state.title}
              />
            </View>
            <View style={styles.row}>
              <Textarea
                containerStyle={styles.textareaContainer}
                style={styles.textarea}
                onChangeText={this.onDescriptionChanged}
                defaultValue={this.state.description}
                maxLength={120}
                placeholder={"Descipción ..."}
                placeholderTextColor={"#c7c7c7"}
                underlineColorAndroid={"transparent"}
              />
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Precio</Text>
              <TextInput
                style={styles.text_input}
                keyboardType="numeric"
                onChangeText={this.onPrecioChanged}
                value={this.state.precioBase}
              />
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Radio de tu ubicación</Text>
              <TextInput
                style={styles.text_input}
                keyboardType="numeric"
                onChangeText={this.onRadioUbicacionChanged}
                value={this.state.precioAux}
              />
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Precio máx. del trueque</Text>
              <TextInput
                style={styles.text_input}
                keyboardType="numeric"
                onChangeText={this.onPrecioTruequeChanged}
                value={this.state.precioAux}
              />
            </View>


            <View style={styles.row2}>
              <TypePickerModal saveType={this.saveType} />
              <Text style={{ marginHorizontal: 5 }}>
                {this.state.tipo}
              </Text>
            </View>

            <View style={styles.row2}>
              <CategoryPickerModal saveCategory={this.saveCategory} />
              <Text style={{ marginHorizontal: 5 }}>
                {this.state.categoria}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Localización</Text>
              {this.state.locationResult !== null ? (
                <Text style={styles.label}>
                  ({this.state.locationResult.coords.latitude},
                  {this.state.locationResult.coords.longitude})
                </Text>
              ) : (
                []
              )}
            </View>

            <View style={styles.section}>
              <View style={[styles.row, styles.heading]}>
                <RkText rkType="primary header6">Multímedia</RkText>
              </View>
            </View>

            <CameraRollSelect saveImages={this.saveImages} />

            <Button
              type="clear"
              containerStyle={{ height: 100, marginTop: 100 }}
              style={styles.button}
              title="SUBIR"
              onPress={ () => this.uploadProduct()}
            />
          </View>
        </RkAvoidKeyboard>
      </ScrollView>
    );
  };
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
  label: {
    color: "grey",
    marginRight: 10,
    marginVertical: 20
  },
  text_input: {
    height: 30,
    width: 300,
    borderColor: "white",
    borderWidth: 1
  },
  row: {
    flexDirection: "row",
    paddingHorizontal: 17.5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border.base,
    alignItems: "center"
  },
  row2: {
    flexDirection: "row",
    paddingHorizontal: 17.5,
    paddingTop: 17.5,

    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border.base,
    alignItems: "center"
  },
  button: {
    flex: 1,
    height: 100
  },
  container: {
    flex: 1,
    padding: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  textareaContainer: {
    height: 180,
    padding: 5,
    backgroundColor: "#F5FCFF"
  },
  textarea: {
    textAlignVertical: "top", // hack android
    height: 170,
    fontSize: 14,
    color: "#333"
  }
}));
