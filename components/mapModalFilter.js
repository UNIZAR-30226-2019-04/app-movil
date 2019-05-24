import React, { Component } from "react";
import {
  Modal,
  TouchableHighlight,
  View,
  ScrollView,
  Alert,
  StyleSheet,
  Dimensions
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { Button } from "react-native";
import { Constants, MapView, MapCallout } from "expo";
import { Avatar, Tooltip, Text } from "react-native-elements";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
let updated = false;

RADIUS = 1000;

export default class MapModalFilter extends Component {
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

    radious: 1,
    markers: []
  };

  updateSearch = search => {
    this.setState({ search });
  };
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  componentDidMount() {
    this.setState({
      mapRegion: this.props.mapRegion,
      radious: this.props.radious
    });
  }

  componentDidUpdate() {
    //console.log("updated", this.props.mapRegion);

    if (this.state.markers.length < 1 && this.props.markers.length > 0) {
      this.setState({ markers: this.props.markers });
      this.setState({ products: this.props.products });

      //console.log("componentDidUpdate map", this.props.products);
    }
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

  onPressedmarker(marker, index) {
    //console.log("OnPressedMarker", marker, index);
    this.props.scrollToRow(index);
  }
  showCallout = () => {
    this.pickUpMarker.showCallout();
  };
  render() {
    const { search } = this.state;
    const { width, height } = Dimensions.get("window");
    //console.log("mapModalFilter", this.state);
    return (
      <MapView
        style={{
          width: width,
          height: height,
          zIndex: -1
        }}
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
          let thumbnail = {};
          if (this.state.products !== undefined) {
            let product = this.state.products[index];

            //console.log("Product:", product);
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
                  onPress={() => this.onPressedmarker(marker, index)}
                  size="small"
                  containerStyle={{ marginHorizontal: 10 }}
                  source={{
                    uri: thumbnail.path
                  }}
                />
                <MapView.Callout tooltip />
              </View>
            </MapView.Marker>
          );
        })}
      </MapView>
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
