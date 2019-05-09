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

RADIUS = 100;

export default class MapModal extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    modalVisible: false,
    search: "",
    mapRegion: null,
    LATLNG: {
      latitude: 41.4816,
      longitude: -4.055685
    }
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
      let latlong = {
        latitude: this.props.mapRegion.latitude,
        longitude: this.props.mapRegion.longitude
      };
      this.setState({ LATLNG: latlong });
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
            showsUserLocation={true}
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
          >
            <MapView.Circle
              key={"key111".toString()}
              center={this.state.LATLNG}
              radius={RADIUS}
              strokeWidth={2}
              strokeColor={"#1a66ff"}
              fillColor={"rgba(230,238,255,0.5)"}
              //onRegionChangeComplete={this.onRegionChangeComplete.bind(this)}
            />
          </MapView>
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
            showsUserLocation={true}
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
          >
            <MapView.Circle
              key={"key111".toString()}
              center={this.state.LATLNG}
              radius={RADIUS}
              strokeWidth={2}
              strokeColor={"#1a66ff"}
              fillColor={"#b3cbff"}
              //onRegionChangeComplete={this.onRegionChangeComplete.bind(this)}
            />
          </MapView>
        </TouchableHighlight>
      </View>
    );
  }
}
