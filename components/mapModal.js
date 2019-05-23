import React, { Component } from "react";
import {
  Modal,
  TouchableHighlight,
  View,
  ScrollView,
  Alert,
  StyleSheet
} from "react-native";
import { SearchBar } from "react-native-elements";
import { Platform, StatusBar, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "react-native";
import { Constants, MapView, MapCallout } from "expo";
import { Dimensions, PixelRatio } from "react-native";
import { Avatar, Tooltip, Text } from "react-native-elements";

let updated = false;

RADIUS = 1000;

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
    },
    location: { coords: { latitude: 41.4816, longitude: -4.055685 } },

    radious: 0,
    markers: [],
    product: null
  };

  updateSearch = search => {
    this.setState({ search });
  };
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  componentDidMount() {
    let product = this.props.product;

    this.setState({
      mapRegion: this.props.mapRegion,
      radious: this.props.radious
      //markers: this.props.product
    });
    if (this.props.mapRegion !== null && this.props.mapRegion !== undefined) {
      let latlong = {
        latitude: this.props.mapRegion.latitude,
        longitude: this.props.mapRegion.longitude
      };
      this.setState({ LATLNG: latlong, product });
    }
    console.log("Mounted", product);
    if (product !== undefined && product !== null && product !== {}) {
      let marker = [
        {
          coordinate: {
            latitude: product.latitud,
            longitude: product.longitud
          }
        }
      ];
      this.setState({ markers: marker });
    }
  }

  componentDidUpdate() {
    let product = this.props.product;
    console.log("updated", this.state.markers, product);

    if (
      product !== undefined &&
      product !== null &&
      product !== {} &&
      this.state.markers.length < 1
    ) {
      console.log("updatedM", this.state.marker, product);

      let marker = [
        {
          coordinate: {
            latitude: product.latitud,
            longitude: product.longitud
          }
        }
      ];
      this.setState({ markers: marker });
    }

    if (this.props.mapRegion !== null && !updated) {
      updated = true;
      this.setState({ mapRegion: this.props.mapRegion });
      let latlong = {
        latitude: this.props.mapRegion.latitude,
        longitude: this.props.mapRegion.longitude
      };

      //this.setState({ LATLNG: latlong, product });
    }
  }

  showCallout = () => {
    this.pickUpMarker.showCallout();
  };
  render() {
    const { search } = this.state;
    const { width, height } = Dimensions.get("window");
    console.log("mapRegion", this.state.mapRegion);
    console.log("Markers", this.state.markers);

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
              key={"key1112".toString()}
              center={this.state.LATLNG}
              radius={RADIUS * this.props.radious}
              strokeWidth={2}
              strokeColor={"#1a66ff"}
              fillColor={"rgba(115, 134, 242, 0.45)"}
              //onRegionChangeComplete={this.onRegionChangeComplete.bind(this)}
            />

            {this.state.markers.map((marker, index) => {
              let product = this.state.product;
              let thumbnail = null;

              if (product !== null && product !== undefined) {
                console.log("Product:", product);
                for (let i = 0; i < product.multimedia.length; i++) {
                  if (!product.multimedia[i].tipo) {
                    thumbnail = product.multimedia[i];
                    break;
                  }
                }
              }

              return (
                <MapView.Marker {...marker} key={index}>
                  <View style={styles.marker}>
                    <Avatar
                      rounded
                      onPress={() => console.log("Works!")}
                      size="small"
                      containerStyle={{ marginHorizontal: 10 }}
                      source={{
                        uri:
                          thumbnail !== null
                            ? thumbnail.path
                            : "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"
                      }}
                    />
                    <MapView.Callout tooltip />
                  </View>
                </MapView.Marker>
              );
            })}
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
            {this.state.markers.map((marker, index) => {
              return (
                <MapView.Marker {...marker} key={index}>
                  <View style={styles.marker}>
                    <Avatar
                      rounded
                      onPress={() => console.log("Works!")}
                      size="small"
                      containerStyle={{ marginHorizontal: 10 }}
                      source={{
                        uri:
                          "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"
                      }}
                    />
                    <MapView.Callout tooltip />
                  </View>
                </MapView.Marker>
              );
            })}
            <MapView.Circle
              key={"key111".toString()}
              center={this.state.LATLNG}
              radius={RADIUS * this.props.radious}
              strokeWidth={2}
              strokeColor={"#1a66ff"}
              fillColor={"rgba(115, 134, 242, 0.45)"}
              //onRegionChangeComplete={this.onRegionChangeComplete.bind(this)}
            />
          </MapView>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  marker: {
    padding: 5,
    borderRadius: 5
  },
  text: {
    color: "white",
    fontWeight: "bold"
  },
  container: {
    flex: 1
  },
  sectionVertical: {
    flex: 1,
    marginVertical: 2,
    backgroundColor: "white",
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#fff"
  },
  section: {
    flex: 1,
    marginVertical: 2,
    backgroundColor: "white",
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#fff"
  },
  button: {
    width: 180
  },
  textStyle: {
    fontSize: 14,
    alignSelf: "center",
    padding: 2
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: "center",
    marginHorizontal: 10
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: "transparent",
    justifyContent: "center"
  },
  viewStyle: {
    width: 60,
    height: 100,
    backgroundColor: "#fff",
    padding: 2
  },
  headerViewStyle: {
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    backgroundColor: "#f5f5f5",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    position: "relative"
  },
  headerStyle: {
    fontSize: 20,
    fontWeight: "bold"
  },
  modalContainerViewStyle: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000080"
  },
  modalViewStyle: {
    width: 300,
    height: 380,
    backgroundColor: "#fff",
    padding: 20
  }
});
