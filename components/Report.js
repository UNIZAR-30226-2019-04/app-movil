import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Share,
  Picker
} from "react-native";
import { connect } from "react-redux";
import { Button, ButtonGroup, Header } from "react-native-elements";
import { addTag } from "../actions";
import { RkStyleSheet, RkAvoidKeyboard, RkText } from "react-native-ui-kitten";
import axios from "axios";
import { API_BASE, API_KEY } from "../config";
import Textarea from "react-native-textarea";

const width = Dimensions.get("window").width;
class Report extends Component {
  constructor(props) {
    super(props);
    this.updateIndex = this.updateIndex.bind(this);
  }

  state = {
    user: "",
    receiver: "",
    token: "",
    selected: "",
    descripcion: ""
  };

  updateIndex = async selectedIndex => {
    this.setState({ selectedIndex });
    this.props.dispatch(addTag(modos[selectedIndex], "mode"));
  };

  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("receiver"),
    headerTitleStyle: { textAlign: "center", alignSelf: "center" },
    headerStyle: {
      backgroundColor: "white"
    }
  });

  _reportUser(descripcion, tipoReporte) {
    //Falta integrar con backend
    let URL = `${API_BASE}/report/`;

    let body = {
      descripcion: descripcion,
      tipoReporte: tipoReporte,
      reportado: this.props.user
    };

    let config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    axios
      .post(URL, JSON.stringify(body), config)
      .then(resp => {
        //console.log(resp);
        // console.log("Usuario Reportado");
      })
      .catch(err => {
        console.log(err);
      });
  }

  onDescriptionChanged = text => {
    this.setState({ descripcion: text });
  };

  render() {
    return (
      <ScrollView style={styles.root} style={{ marginTop: 0 }}>
        <RkAvoidKeyboard>
          <View style={{ height: 100 }} />

          <View style={styles.section}>
            <View style={[styles.row, styles.heading]}>
              <RkText rkType="header6 primary">REPORTA A ESTE USUARIO</RkText>
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
        <View style={{marginTop: 10}}>
          <Picker
            selectedValue={this.state.selected}
            style={{height: 50, width: 250}} 
            onValueChange={(itemValue) =>
              this.setState({selected: itemValue})
            }>
            <Picker.Item label="Mala educación" value="Mala educación" />
            <Picker.Item label="Producto en mal estado" value="Producto en mal estado" />
            <Picker.Item label="No me ha vendido" value="No me ha vendido" />
            <Picker.Item label="Contenido inapropiado" value="Contenido inapropiado" />
          </Picker>
          <Button 
            style = {{marginTop: 10}}
            title="CONFIRMAR" 
            onPress={() => this._reportUser(this.state.descripcion, this.state.selected)}
          />
        </View>
      </ScrollView>
    );
  }
}
export default connect()(Report);

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
