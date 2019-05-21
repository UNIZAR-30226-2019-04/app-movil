import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Share
} from "react-native";
import { connect } from "react-redux";
import { Button, ButtonGroup, Header } from "react-native-elements";
import { addTag } from "../actions";
import Icon from "react-native-animated-icons";
import { RkStyleSheet } from "react-native-ui-kitten";
import axios from "axios";
import { API_BASE, API_KEY } from "../config";

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
    selectedIndex: null
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
        // console.log(resp);
        console.log("Usuario Reportado");
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <View style={styles.section}>
        <Header
          centerComponent={{
            text: "REPORTAR USUARIO",
            style: { color: "#fff", fontSize: 30, marginBottom: 20 }
          }}
          backgroundColor="crimson"
        />
        <Button
          onPress={() => this._reportUser("Usuario Malo", "Mala educación")}
          buttonStyle={styles.reportButton}
          type="clear"
          title={<Text style={{ color: "red" }}>Mala educación</Text>}
        />
        <Button
          onPress={() =>
            this._reportUser("Usuario Malo", "Producto en mal estado")
          }
          buttonStyle={styles.reportButton}
          type="clear"
          title={<Text style={{ color: "red" }}>Producto en mal estado</Text>}
        />
        <Button
          onPress={() => this._reportUser("Usuario Malo", "No me ha vendido")}
          buttonStyle={styles.reportButton}
          type="clear"
          title={<Text style={{ color: "red" }}>No me ha vendido</Text>}
        />
        <Button
          onPress={() => this._reportUser("Usuario Malo", "Malas intenciones")}
          buttonStyle={styles.reportButton}
          type="clear"
          title={<Text style={{ color: "red" }}>Malas intenciones</Text>}
        />
      </View>
    );
  }
}
export default connect()(Report);

const styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base
  },
  padding: {
    padding: 20,
    height: 200
  },
  section: {
    backgroundColor: "#F5F5F5"
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
  }
}));