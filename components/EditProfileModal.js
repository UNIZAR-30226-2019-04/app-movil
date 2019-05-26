import React, { Component } from "react";
import { Modal, Text, TouchableHighlight, View, Alert } from "react-native";
import { SearchBar } from "react-native-elements";
import { Platform, StatusBar, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button, Tooltip } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import ProfileSettings from "../components/profileSettings";

export default class EditProfileModal extends Component {
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
          <ProfileSettings
            profile={() => this.props.profile()}
            navigation={this.props.navigation}
          />
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

        <Button
          style={{ marginRight: 10, marginTop: 0 }}
          icon={<Icon name="edit" size={30} color="white" />}
          type="clear"
        />

        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}
          style={{
            //flexDirection: "row",
            height: 30,
            width: 50,
            marginTop: -40,

            backgroundColor: "transparent"

            //marginTop: Platform.OS == "ios" ? 20 : 0 // only for IOS to give StatusBar Space
          }}
        >
          <Text />
        </TouchableHighlight>
      </View>
    );
  }
}
