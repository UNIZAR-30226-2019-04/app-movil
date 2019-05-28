import React from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  TextInput,
  Text
} from "react-native";
import {
  RkText,
  RkTextInput,
  RkAvoidKeyboard,
  RkTheme,
  RkStyleSheet
} from "react-native-ui-kitten";
import { Avatar, Button, AirbnbRating } from "react-native-elements";
import Textarea from "react-native-textarea";
import UploadMultimedia from "./UploadMultimedia";
import CameraRollSelect from "./CameraRollSelect";
import TypePickerModal from "./TypePickerModal";
import UploadProductModal from "./UploadProductModal";
import CategoryPickerModal from "./CategoryPickerModal";
import { addTag } from "../actions";
import { Constants, MapView, Location, Permissions } from "expo";
import axios from "axios";
import { API_BASE, DEBUG, TOKEN } from "../config";
import { AsyncStorage } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import moment from "moment";
import DateTimePicker from "react-native-modal-datetime-picker";

let calendarDate = moment();

export default class MakeReview extends React.Component {
  static navigationOptions = {
    title: "Profile Settings".toUpperCase()
  };

  state = {
    rating: 0,
    titulo: "",
    description: ""
  };

  _valorar= async () => {
    let my_user = "";
    let token = "";
    try {
      my_user = await AsyncStorage.getItem("user");
      token = await AsyncStorage.getItem("token");
    } catch (error) {
      //console.log(error);
    }

    if(this.state.titulo === "") {
      this.setState({titulo: "Sin título"})
    }

    let URL = `${API_BASE}/valoracion/${my_user}`;
    let body = {
        titulo: this.state.titulo,
        descripcion: this.state.description,
        puntuacion: this.state.rating.value,
        puntuado: this.props.producto.vendedor
    };
  
    let config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }
    };

    console.log("-----------------URL--------------------");
    console.log(URL);
    console.log("-----------------USER----------------");
    console.log(my_user);
    console.log("----------------TOKEN-------------------");
    console.log(this.state.rating.value);
    console.log("-----------------VENDEDOR-------------------");
    console.log(this.props.producto.vendedor);

    axios
    .post(URL, JSON.stringify(body), config)
    .then(resp => {
      // //console.log(resp);
      console.log("Usuario Valorado");
      this.props.closeModal();
    })
    .catch(err => {
      //console.log(err);
    });
  }

  onTituloChanged = text => {
    this.setState({ titulo: text });
  };

  onDescriptionChanged = text => {
    this.setState({ description: text });
  };

  onRatingChanged = (rating) => { 
      this.setState ({ rating: {value : rating } }); //return rating; 
  };

  render = () => {
    ////console.log("Location", this.state.locationResult);
    return (
      <ScrollView style={styles.root} style={{ marginTop: 0 }}>
        <RkAvoidKeyboard>
          <View style={{ height: 100 }} />

          <View style={styles.section}>
            <View style={[styles.row, styles.heading]}>
              <RkText rkType="header6 primary">VALORA A ESTE USUARIO</RkText>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Título</Text>
              <TextInput
                style={styles.text_input}
                onChangeText={this.onTituloChanged}
                value={this.state.title}
              />
            </View>
            <View style={styles.row}>
              <Textarea
                containerStyle={styles.textareaContainer}
                style={styles.textarea}
                onChangeText={this.onDescriptionChanged}
                defaultValue={this.state.description}
                maxLength={1000}
                placeholder={"Descipción ..."}
                placeholderTextColor={"#c7c7c7"}
                underlineColorAndroid={"transparent"}
              />
            </View>
            </View>
        </RkAvoidKeyboard>
        <View>
        <AirbnbRating
            count={5}
            style={{ paddingHorizontal: 50 }}
            showRating={false}
            defaultRating={this.state.valoracion}
            size={16}
            onFinishRating={this.onRatingChanged}
        />
        </View>
        <View style={{marginTop: 10}}>
            <Button title="Confirmar" onPress={() => this._valorar()}/>
        </View>
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
