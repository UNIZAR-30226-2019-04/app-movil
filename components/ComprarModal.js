import React, { Component } from "react";
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  ScrollView,
  StyleSheet,
  Dimensions
} from "react-native";
import { SearchBar } from "react-native-elements";
import { Platform, StatusBar, TouchableOpacity, WebView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button, Tooltip } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import categories from "../assets/categorias.json";
import Comprar from "./Comprar";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default class ComprarModal extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    modalVisible: false,
    status: ""
  };

  handleResponse = data => {
    if (data.title == "success") {
      this.setState({ modalVisible: false, status: "Complete" });
    } else if (data.title == "cancel") {
      this.setState({ modalVisible: false, status: "Cancelled" });
    } else {
      return;
    }
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  render = () => {
    if (!this.props.trueque) {
      return (
        <View style={{ marginTop: 0 }}>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => this.setModalVisible(false)}
          >
            <Comprar closeModal={() => this.setModalVisible(false)} />

            <Ionicons
              style={{
                position: "absolute",
                right: 0,
                marginRight: 20,
                marginLeft: 20,
                marginTop: 60
              }}
              onPress={() => {
                console.log("Pressed");
                this.setModalVisible(false);
              }}
              name="md-close"
              size={38}
              color="grey"
            />
          </Modal>

          <Button
            title="Comprar"
            titleStyle={{
              margin: 10,
              width: width / 2 - 40
            }}
            buttonStyle={{
              backgroundColor: "mediumseagreen"
            }}
            onPress={() => this.setModalVisible(true)}
          />
        </View>
      );
    } else {
      return null;
    }
  };
}

const styles = StyleSheet.create({
  section: {
    flex: 1,
    marginTop: 52,
    backgroundColor: "white",
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#fff"
  },

  floatingButton: {
    width: 160,
    height: 60
  },

  lineStyle: {
    height: 1,
    borderWidth: 0.3,
    borderColor: "grey",
    margin: 4,
    marginHorizontal: 24
  }
});
