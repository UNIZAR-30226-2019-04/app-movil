import React, { Component } from "react";
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  ScrollView,
  Alert
} from "react-native";
import { SearchBar } from "react-native-elements";
import { Platform, StatusBar, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "react-native";

export default class SearchModal extends Component {
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
          <ScrollView style={{ backgroundColor: "#01579B" }}>
            <Ionicons
              style={{
                position: "absolute",
                right: 20,
                top: 20
              }}
              onPress={() => this.setModalVisible(false)}
              name="md-close"
              size={32}
              color="white"
            />
            <View style={{ margin: 52 }}>
              <SearchBar
                searchIcon={{ color: "white" }}
                inputStyle={{ color: "white" }}
                cancelIcon={{ color: "white" }}
                clearlIcon={{ color: "white" }}
                onClear={() => this.setModalVisible(false)}
                onCancel={() => this.setModalVisible(false)}
                placeholder="Type Here..."
                onChangeText={this.updateSearch}
                value={search}
                //returnKeyType="search"

                //onChangeText={this.updateSearch}
                //value={this.search}
                platform={Platform.OS}
                containerStyle={{
                  marginTop: 0,
                  backgroundColor: "transparent"
                }}
                //inputStyle={{ margin: 0, borderRadius: 100 }}
                //placeholderTextColor={"#g5g5g5"}
                lightTheme
                round
              />

              <View>
                <Text style={{ color: "white" }}>Hide Modal</Text>

                <TouchableHighlight
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                >
                  <Text style={{ color: "white" }}>Hide Modal</Text>
                </TouchableHighlight>
              </View>
            </View>
          </ScrollView>
        </Modal>

        <SearchBar
          placeholder="Buscar..."
          platform={Platform.OS}
          containerStyle={{
            height: 40,
            width: 270,
            marginTop: 4,
            backgroundColor: "transparent"
          }}
          searchIcon={{ color: "white" }}
          cancelIcon={{ color: "white" }}
          inputStyle={{ color: "white" }}
          clearlIcon={{ color: "white" }}
          lightTheme
          round
        />

        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}
          style={{
            //flexDirection: "row",
            height: 40,
            width: 270,
            marginTop: -40,
            marginBottom: 10,

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
