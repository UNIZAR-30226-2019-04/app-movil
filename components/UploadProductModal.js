import React, { Component } from "react";
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  Alert,
  StyleSheet,
  Dimensions
} from "react-native";
import { SearchBar } from "react-native-elements";
import { Platform, StatusBar, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button, Tooltip } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import UploadProduct from "./UploadProduct";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default class UploadProductModalClass extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    modalVisible: false,
    search: ""
  };

  updateSearch = search => {
    this.setState({ search });
  };
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    const { search } = this.state;

    return (
      <View style={{ marginTop: 0 }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => this.setModalVisible(false)}
        >
          <UploadProduct closeModal={() => this.setModalVisible(false)} />
          <Ionicons
            style={{
              position: "absolute",
              right: 0,
              marginRight: 20,
              marginLeft: 20,
              marginTop: 30
            }}
            onPress={() => this.setModalVisible(false)}
            name="md-close"
            size={38}
            color="grey"
          />
        </Modal>
        <View style={styles.buttonView}>
          <Button
            icon={<Icon name="plus-circle" size={20} color="white" />}
            title=" Subir producto"
            style={styles.floatingButton}
            onPress={() => this.setModalVisible(true)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  section: {
    flex: 1,
    marginVertical: 2,
    backgroundColor: "white",
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#fff"
  },

  floatingButton: {
    width: 160,
    height: 60
  },
  buttonView: {
    position: "absolute",
    bottom: 10,
    right: width / 2 - 80,
    backgroundColor: "blue",
    borderRadius: 20
  }
});
