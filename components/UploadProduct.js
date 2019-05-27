import React from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  TextInput,
  Text,
  Dimensions
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
import LocationPickerModal from "./LocationPickerModal";
import { addTag } from "../actions";
import { Constants, MapView, Location, Permissions } from "expo";
import axios from "axios";
import { API_BASE, DEBUG, API_KEY } from "../config";
import { AsyncStorage } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import moment from "moment";
import DateTimePicker from "react-native-modal-datetime-picker";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

let calendarDate = moment();

export default class UploadProduct extends React.Component {
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
    locationResult: null,
    fechaexpiracion: null,
    markedDate: {},
    isDateTimePickerVisible: false,
    titleColor: 'white',
    descriptionColor: 'white',
    precioColor: 'white',
    radioColor: 'white',
    tipoColor: 'white',
    categoriaColor: 'white',
    truequeColor: 'white',
    subastaColor: 'white',
    locationType: "",
    locationColor: 'white',
    locationString: ""
  };

  handleDatePicked = time => {
    var time2 = moment(time).format("hh:mm:a");

    let list = time2.split(":");

    // %H:%M:%S'
    let hour = parseInt(list[0]);
    if (list[2] === "pm") hour = hour + 12;

    let instant = hour + ":" + list[1] + ":" + "00";

    let fecha = this.state.fechaexpiracion;

    list = fecha.split("-");
    fecha = list[2] + "/" + list[1] + "/" + list[0];

    fecha = fecha + " " + instant;
    this.setState({ fechaexpiracion: fecha });
    //console.log("A date has been picked: ", time, time2);

    this.setState({ isDateTimePickerVisible: false });
  };
  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    //console.log("Close picked: ");

    this.setState({ isDateTimePickerVisible: false });
  };

  onDayPress(date) {
    //console.log("DateCalendar", date);

    var fechaexpiracion = date.day + "-" + date.month + "-" + date.year;
    this.setState({ fechaexpiracion: date.dateString });
    var markedDate = {
      [date.dateString]: { selected: true }
    };
    this.setState({ markedDate });
    //console.log("markedDate", markedDate);
    //console.log("fechaexpiracion", date.dateString);
    this.setState({ isDateTimePickerVisible: true });
  }

  fetchData = async () => {
    let token, user;
    try {
      user = await AsyncStorage.getItem("user");
      token = await AsyncStorage.getItem("token");
    } catch (error) {
      //console.log(error);
    }
    if (DEBUG) {
      user = "8e4de80f-d9bf-411c-a696-58e3481a1b36";
      token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NTc1ODg1NTEsInN1YiI6MTksImV4cCI6MTU1NzY3NDk1Nn0.rE3VWsRoamkEMPSM48kfnj1c5AfH572v2QjQzpoHxIA";
    }
    //console.log("User", user, token);
    this.setState({ vendedor: user });
  };

  uploadProduct() {
    let algoMal = false;
    if(this.state.title === ""){
      this.setState({titleColor: 'crimson'});
      algoMal = true;
    }  
    if(this.state.description === ""){
      this.setState({descriptionColor: 'crimson'});
      algoMal = true;
    } 
    if (this.state.precioBase === 0) {
      this.setState({precioColor: 'crimson'});
      algoMal = true;
    } 
    if (this.state.radio_ubicacion === 0) {
      this.setState({radioColor: 'crimson'});
      algoMal = true;
    } 
    if (this.state.tipo === "") {
      this.setState({tipoColor: 'crimson'});
      algoMal = true;
    } 
    if (this.state.categoria === "") {
      this.setState({categoriaColor: 'crimson'});
      algoMal = true;
    } 
    if (this.state.tipo === "trueque" && (this.state.precioAux === 0 || this.state.precioAux < this.state.precioBase)) {
      console.log("----------BASE----------");
      console.log(this.state.precioBase);
      console.log("-------------AUX--------");
      console.log(this.state.precioAux);
      this.setState({truequeColor: 'crimson'});
      algoMal = true;
    } 

    if (this.state.tipo === "subasta" && this.state.fechaexpiracion === null) {
      this.setState({subastaColor: 'crimson'});
      algoMal = true;
    }

    if (this.state.latitud === "" || this.state.longitud === ""){
      this.setState({locationColor: 'crimson'});
      algoMal = true;
    }


    if (this.state.latitud === null || this.state.longitud === null){
      this.setState({locationColor: 'crimson'});
      algoMal = true;
    }
    
    if(!algoMal) {
      if (this.state.tipo == "normal") {
        this.uploadProductNormal();
      } else if (this.state.tipo == "trueque") {
        this.uploadProductTrueque();
      } else if (this.state.tipo == "subasta") {
        this.uploadProductSubasta();
      }
    }

    // Añadido para simplificar test
    return algoMal;
  }

  uploadProductNormal() {
    axios
      .post(
        `${API_BASE}/producto/`,
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
      .then(res => {
        //console.log("Product Uploaded:", res.data);
        this.uploadImageAsync(res.data.id);
      });
  }

  uploadProductSubasta() {
    axios
      .post(
        `${API_BASE}/producto/`,
        {
          titulo: this.state.title,
          descripcion: this.state.description,
          precioBase: this.state.precioBase,
          categoria: this.state.categoria,
          tipo: this.state.tipo,
          radio_ubicacion: this.state.radio_ubicacion,
          latitud: this.state.latitud,
          longitud: this.state.longitud,
          fechaexpiracion: this.state.fechaexpiracion,
          vendedor: this.state.vendedor
        },
        {}
      )
      .then(res => {
        //console.log("Product Uploaded:", res.data);
        this.uploadImageAsync(res.data.id);
      })
      .catch(err => console.log(err));
  }

  uploadProductTrueque() {
    axios
      .post(
        `${API_BASE}/producto/`,
        {
          titulo: this.state.title,
          descripcion: this.state.description,
          precioBase: this.state.precioBase,
          categoria: this.state.categoria,
          tipo: this.state.tipo,
          radio_ubicacion: this.state.radio_ubicacion,
          latitud: this.state.latitud,
          longitud: this.state.longitud,
          vendedor: this.state.vendedor,
          precioAux: this.state.precioAux
        },
        {}
      )
      .then(res => {
        //console.log("Product Uploaded:", res.data);
        this.uploadImageAsync(res.data.id);
      })
      .catch(err => console.log(err));
  }

  reset_forms() {
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
      locationResult: null,
      isDateTimePickerVisible: false
    });
    this.render();
  }

  componentDidMount() {
    this._getLocationAsync();
    this.fetchData();
  }

  getCoordinatesFromAddress(location) {
    //console.log(`address=${location}`);
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
        //console.log(err);
      });
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
    //console.log("Save Images", photos);
  };

  uploadImageAsync = async product_id => {
    let photos = this.state.photos;
    //console.log("uploadImageAsync", this.state.photos);

    for (let i = 0; i < this.state.photos.length; i++) {
      let uri = this.state.photos[i].uri;
      //console.log(uri, product_id);
      let apiUrl = `${API_BASE}/multimedia/${product_id}`;

      // Note:
      // Uncomment this if you want to experiment with local server
      //
      // if (Constants.isDevice) {
      //   apiUrl = `https://your-ngrok-subdomain.ngrok.io/upload`;
      // } else {
      //   apiUrl = `http://localhost:3000/upload`
      // }

      //let uriParts = uri.split(".");
      //let fileType = uriParts[uriParts.length - 1];
      let fileType = "jpg";

      let formData = new FormData();
      formData.append("file", {
        uri,
        name: `photo.${fileType}`,
        //filename: "imageName.png",
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

      fetch(apiUrl, options)
        .then(res => {})//console.log(res))
        .catch(error => {
          console.log(error);
        });

      this.props.closeModal();
    }
  };

  onTitleChanged = text => {
    this.setState({ title: text });
    if(text !== ""){
      this.setState({titleColor: 'white'});
    } else {
      this.setState({titleColor: 'crimson'});
    }
  };

  setProfileLocation = () => {
    let URL = `${API_BASE}/user/${this.state.vendedor}`

    axios.get(URL).then(res =>{
      this.setState({latitud: res.data.latitud, longitud: res.data.longitud});
    }).catch(err =>{
      console.log(err);
    })
  }

  saveCategory = category => {
    //console.log("saveCategory", category);
    this.setState({ categoria: category });
    this.setState({ categoriaColor: 'white' });
  };

  saveLocation = category => {
    //console.log("saveCategory", category);
    this.setState({ locationType: category });
    this.setState({ locationColor: 'white' });
  };

  saveType = type => {
    //console.log("saveType", type);
    if (type == "Normal") {
      this.setState({ tipo: "normal" });
    } else if (type == "Trueque") {
      this.setState({ tipo: "trueque" });
    } else if (type == "Subasta") {
      this.setState({ tipo: "subasta" });
    }
    this.setState({tipoColor: 'white'});
  };

  onDescriptionChanged = text => {
    this.setState({ description: text });
    if(text !== ""){
      this.setState({desctiptionColor: 'white'});
    } else {
      this.setState({descriptionColor: 'crimson'});
    }
  };

  onPrecioChanged = text => {
    this.setState({ precioBase: text });
    if(text !== ""){
      this.setState({precioColor: 'white'});
    } else {
      this.setState({precioColor: 'crimson'});
    }
  };

  onPrecioTruequeChanged = text => {
    this.setState({ precioAux: text });
    if(text !== ""){
      this.setState({truequeColor: 'white'});
    } else {
      this.setState({truequeColor: 'crimson'});
    }
  };

  onLocationChanged = text => {
    this.setState({ locationString: text });
    this.getCoordinatesFromAddress(text);
    if(text !== ""){
      this.setState({locationColor: 'white'});
    } else {
      this.setState({locationColor: 'crimson'});
    }
  };

  onRadioUbicacionChanged = text => {
    this.setState({ radio_ubicacion: text });
    if(text !== ""){
      this.setState({radioColor: 'white'});
    } else {
      this.setState({radioColor: 'crimson'});
    }
  };

  validTitulo= async () => {
    if(this.state.title !== ""){
      return 'white';
    } else {
      return 'crimson';
    }
  }

  render = () => {
    ////console.log("Location", this.state.locationResult);
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
                style={[styles.text_input, {borderColor: this.state.titleColor}]}
                onChangeText={this.onTitleChanged}
                value={this.state.title}
              />
            </View>
            <View style={styles.row}>
              <Textarea
                containerStyle={styles.textareaContainer}
                style={[styles.textarea, {borderColor: this.state.descriptionColor}]}
                onChangeText={this.onDescriptionChanged}
                defaultValue={this.state.description}
                maxLength={1000}
                placeholder={"Descipción ..."}
                placeholderTextColor={"#c7c7c7"}
                underlineColorAndroid={"transparent"}
              />
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Precio</Text>
              <TextInput
                style={[styles.text_input,{borderColor: this.state.precioColor}]}
                keyboardType="numeric"
                onChangeText={this.onPrecioChanged}
                value={this.state.precioBase}
              />
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Radio de tu ubicación</Text>
              <TextInput
                style={[styles.text_input,{borderColor: this.state.precioColor, width: width/2 + 10}]}
                keyboardType="numeric"
                onChangeText={this.onRadioUbicacionChanged}
                value={this.state.radio_ubicacion}
              />
            </View>

            <View style={styles.row2}>
              <TypePickerModal saveType={this.saveType} />
              <Text style={{ marginHorizontal: 5 }}>{this.state.tipo}</Text>
              <Text style={{ marginHorizontal: 5, color: this.state.tipoColor }}>Campo Requerido</Text>
            </View>

            {this.state.tipo === "subasta" ? (
              <View style={styles.row2}>
                <CalendarList
                  // Enable horizontal scrolling, default = false
                  markedDates={this.state.markedDate}
                  horizontal={true}
                  minDate={new Date()}
                  onDayPress={day => this.onDayPress(day)}
                  // Enable paging on horizontal, default = false
                  pagingEnabled={true}
                  // Set custom calendarWidth.
                  calendarWidth={320}
                />

                <DateTimePicker
                  isVisible={this.state.isDateTimePickerVisible}
                  onConfirm={this.handleDatePicked}
                  onCancel={this.hideDateTimePicker}
                  mode={"time"}
                  is24Hour={true}
                  minimumDate={new Date()}
                />
                <Text style={{color: this.state.subastaColor, marginHorizontal: 10}}>Requerido</Text>
              </View>
            ) : (
              []
            )}

            {this.state.tipo === "trueque" ? (
              <View style={styles.row}>
                <Text style={styles.label}>Precio máx. del trueque</Text>
                <TextInput
                  style={[styles.text_input, {borderColor: this.state.truequeColor, width: width/2}]}
                  keyboardType="numeric"
                  onChangeText={this.onPrecioTruequeChanged}
                  value={this.state.precioAux}
                />
              </View>
            ) : (
              []
            )}
            <View style={styles.row2}>
              <CategoryPickerModal saveCategory={this.saveCategory} />
              <Text style={{ marginHorizontal: 5 }}> {this.state.categoria} </Text>
              <Text style={{ marginHorizontal: 5, color: this.state.categoriaColor }}>Campo Requerido</Text>
            </View>

            <View style={styles.row2}>
              <LocationPickerModal saveLocation={this.saveLocation} />
              <Text style={{ marginHorizontal: 5 }}> {this.state.locationType} </Text>
              <Text style={{ marginHorizontal: 5, color: this.state.locationColor }}>Campo Requerido</Text>
            </View>

          {this.state.locationType === "Mapa" ? (
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
          ) : (
            []
          )}

          {this.state.locationType === "Direccion" ? (
            <View style={styles.row}>
              <Text style={styles.label}>Localización</Text>
              <TextInput
                  style={[styles.text_input, {borderColor: this.state.truequeColor, width: width/2}]}
                  onChangeText={this.onLocationChanged}
                  value={this.state.locationString}
                />
            </View>
          ) : (
            []
          )}
            
          {this.state.locationType === "Perfil" ? (
            <View style={styles.row}>
              {this.setProfileLocation()}
            </View>
          ) : (
            []
          )}

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
              onPress={() => this.uploadProduct()}
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
    width: width,
    flexDirection: "row",
    paddingHorizontal: 17.5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border.base,
    alignItems: "center"
  },
  row2: {
    width: width,
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
