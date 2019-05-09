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
import { Constants, MapView } from "expo";
import { Dimensions, PixelRatio } from "react-native";

let updated = false;
export default class MapModal extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    modalVisible: false,
    search: "",
    mapRegion: null
  };

  updateSearch = search => {
    this.setState({ search });
  };
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  componentDidMount() {
    this.setState({ mapRegion: this.props.mapRegion });
  }

  componentDidUpdate() {
    console.log("updated", this.props.mapRegion);

    if (this.props.mapRegion !== null && !updated) {
      updated = true;
      this.setState({ mapRegion: this.props.mapRegion });
    }
  }
  render() {
    const { search } = this.state;
    const { width, height } = Dimensions.get("window");
    console.log("mapRegion", this.state.mapRegion);
    return (
      <View style={{ marginTop: 0 }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => this.setModalVisible(false)}
        >
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: 41.4816,
              longitude: -4.055685,
              latitudeDelta: 5.0922,
              longitudeDelta: 5.0421
            }}
            region={
              this.state.mapRegion !== null
                ? this.state.mapRegion
                : {
                    latitude: 41.4816,
                    longitude: -4.055685,
                    latitudeDelta: 5.0922,
                    longitudeDelta: 5.0421
                  }
            }
          />
        </Modal>

        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}
          style={{
            //flexDirection: "row",
            height: 200,
            width: width,

            backgroundColor: "transparent"

            //marginTop: Platform.OS == "ios" ? 20 : 0 // only for IOS to give StatusBar Space
          }}
        >
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: 41.4816,
              longitude: -4.055685,
              latitudeDelta: 5.0922,
              longitudeDelta: 5.0421
            }}
            region={
              this.state.mapRegion !== null
                ? this.state.mapRegion
                : {
                    latitude: 41.4816,
                    longitude: -4.055685,
                    latitudeDelta: 5.0922,
                    longitudeDelta: 5.0421
                  }
            }
          />
        </TouchableHighlight>
      </View>
    );
  }
}
