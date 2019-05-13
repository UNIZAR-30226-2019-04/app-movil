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
import { AsyncStorage } from "react-native";
import { connect } from "react-redux";
import { addTag } from "../actions";

class SearchModal extends Component {
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

  clearSearch() {
    this.setState({ search: "" });
  }

  componentDidMount() {
    if (this.props.search !== undefined) {
      this.setState({ search: this.props.search });
    }
  }
  render() {
    const { search } = this.state;
    console.log("Navigation", this.props);
    return (
      <View style={{ marginTop: 0 }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => this.setModalVisible(false)}
        >
          <ScrollView style={{ backgroundColor: "#01579B" }}>
            <View style={{ margin: 52 }}>
              <SearchBar
                searchIcon={{ color: "white" }}
                inputStyle={{ color: "white" }}
                cancelIcon={{ color: "white" }}
                clearlIcon={{ color: "white" }}
                onClear={() => this.clearSearch}
                onCancel={() => this.setModalVisible(false)}
                placeholder="Buscar..."
                onChangeText={this.updateSearch}
                value={search}
                returnKeyType="search"
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
              <Ionicons
                style={{
                  position: "absolute",
                  right: -30,
                  top: 15
                }}
                onPress={() => this.setModalVisible(false)}
                name="md-close"
                size={32}
                color="white"
              />

              {this.state.search !== "" ? (
                <TouchableHighlight
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                    console.log("Search ", this.state.search);
                    this.props.dispatch(addTag(this.state.search, "search"));
                    this.props.navigation.navigate("SearchResults", {
                      search: this.state.search
                    });
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontFamily: "space-mono",
                      fontSize: 20,
                      fontWeight: "500"
                    }}
                  >
                    Buscar: "{this.state.search}"
                  </Text>
                </TouchableHighlight>
              ) : (
                []
              )}
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
          value={search}
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
export default connect()(SearchModal);