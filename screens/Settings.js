import React, { Component } from "react";
import { View, StyleSheet, Field } from "react-native";
import { Slider, Card } from "react-native-elements";
import { Picker, Divider, ScrollView } from "react-native";
import { RkText, RkStyleSheet } from "react-native-ui-kitten";
import { Avatar, Button, Text, ButtonGroup } from "react-native-elements";
import CategoryPickerModal from "../components/CategoryPickerModal";
import { connect } from "react-redux";
import { addTag } from "../actions";
import MapModal from "../components/mapModal";
import { Constants, MapView, Location, Permissions } from "expo";
import axios from "axios";
import { API_BASE, API_KEY } from "../config";

const dates = ["24h", "7d", "30d"];
const modos = ["Compra", "Trueque", "Subasta"];
import store from "../store";
class Settings extends Component {
  constructor() {
    super();

    this.updateIndex = this.updateIndex.bind(this);
    this.updateIndexM = this.updateIndexM.bind(this);
  }

  updateIndex = async selectedIndex => {
    this.setState({ selectedIndex });
    this.props.dispatch(addTag(dates[selectedIndex], "date"));
  };

  updateIndexM = async selectedIndexM => {
    this.setState({ selectedIndexM });
    this.props.dispatch(addTag(modos[selectedIndexM], "mode"));
  };

  static navigationOptions = ({ navigation }) => {
    return {
      // Your custom header

      headerRight: (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginRight: 10
          }}
        >
          <Button
            title="Apply filter"
            titleStyle={{ color: "white" }}
            style={{ marginTop: -5 }}
            color="white"
            type="outline"
            onPress={() => {
              navigation.navigate("SearchResults", { search: "" });
            }}
          />
        </View>
      )
    };
  };

  fetchItems = () => {
    const { mapRegion, distancia } = this.state;
    let lat = mapRegion.latitude;
    let long = mapRegion.longitude;
    const URL = `${API_BASE}/producto?latitud=${lat}&longitud=${long}&radioUbicacion=${distancia}`;
    console.log(URL);

    axios
      .get(URL, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        productos = res.data.productos;
        console.log("Response productos settings", productos);
        this.setState({ productos });
      });
  };

  state = {
    value: 200,
    language: null,
    distancia: 100,
    selectedIndex: null,
    selectedIndexM: null,
    mapRegion: null,
    categoria: "",
    address: "",
    coords: null,
    productos: []
  };

  componentDidMount = async () => {
    this._getLocationAsync();
    let currentState = store.getState(store);

    let tags = currentState.tags;
    const price = tags.filter(tag => tag.type === "price");
    const category = tags.filter(tag => tag.type === "category");
    const date = tags.filter(tag => tag.type === "date");
    const distance = tags.filter(tag => tag.type === "distance");

    if (price.length > 0) {
      this.setState({ value: price[0].name });
    }
    if (category.length > 0) {
      this.setState({ category: category[0].name });
    }
    if (distance.length > 0) {
      this.setState({ distancia: distance[0].name });
    }
    if (date.length > 0) {
      for (let i = 0; i < dates.length; i++) {
        if (dates[i] === date[0]) {
          this.setState({ selectedIndex: i });
        }
      }
    }
  };

  getAddressFromCoordinates(lat, long) {
    console.log(`latlng=${lat},${long}`);

    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${API_KEY}`,
        {},
        {}
      )
      .then(resp => {
        let address = resp.data.results[0].formatted_address;
        console.log(address);
        this.setState({ address });
      })
      .catch(err => {
        console.log(err);
      });
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    console.log("_getLocationAsync", status);
    if (status !== "granted") {
      this.setState({
        locationResult: "Permiso para acceder a la localizacion fue rechazado"
      });
      return;
    } else {
      this.setState({ hasLocationPermissions: true });
    }

    let location = await Location.getCurrentPositionAsync({});
    //this.setState({ locationResult: JSON.stringify(location) });
    this.setState({ locationResult: location });

    // Center the map on the location we just fetched.
    let lat = location.coords.latitude;
    let long = location.coords.longitude;

    this.setState({
      mapRegion: {
        latitude: lat,
        longitude: long,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    });

    this.getAddressFromCoordinates(lat, long);
    this.fetchItems();
  };
  saveCategory = category => {
    this.setState({ categoria: category });
    this.props.dispatch(addTag(category, "category"));
  };

  setDistancia = async distancia => {
    this.setState({ distancia });
    this.props.dispatch(addTag(distancia, "distance"));
  };

  updateValue = async value => {
    this.setState({ value });
    this.props.dispatch(addTag(value, "price"));
  };

  stepFunction() {
    if (this.state.value < 50) {
      return 1;
    } else if (this.state.value < 500) {
      return 10;
    } else {
      return 50;
    }
  }

  stepFunctionDistance() {
    if (this.state.distancia < 15) {
      return 1;
    } else if (this.state.distancia < 45) {
      return 5;
    } else if (this.state.distancia < 90) {
      return 10;
    } else {
      return 50;
    }
  }
  render() {
    const buttons = ["24h", "7d", "30d"];
    const modos = ["Compra", "Trueque", "Subasta"];

    const { selectedIndex, selectedIndexM } = this.state;

    return (
      <ScrollView style={styles.section}>
        <View style={styles.row}>
          <RkText
            style={{ alignItems: "stretch", marginVertical: 10 }}
            rkType="header6 primary"
          >
            CATEGORÍA
          </RkText>
        </View>

        <View style={styles.row}>
          <CategoryPickerModal saveCategory={this.saveCategory} />
          <Text
            style={{
              marginHorizontal: 15,
              fontSize: 22,
              fontWeight: "500",
              marginTop: -20
            }}
          >
            {this.state.categoria}
          </Text>
        </View>

        <View style={[styles.lineStyle, { marginBottom: 0 }]} />

        <View style={[styles.row, styles.heading]}>
          <RkText
            style={{ flex: 1, alignItems: "stretch" }}
            rkType="header6 primary"
          >
            PRECIO
          </RkText>
          <View
            style={{ flex: 2, alignItems: "stretch", justifyContent: "center" }}
          >
            <Slider
              value={this.state.value}
              onValueChange={async value => {
                this.updateValue(value);
              }}
              maximumValue={2000}
              step={this.stepFunction()}
              thumbTintColor="#01579B"
            />
            <Text>Precio hasta: {this.state.value} €</Text>
          </View>
        </View>
        <View style={styles.lineStyle} />

        <View style={[styles.row, styles.heading]}>
          <RkText style={{ marginTop: 10 }} rkType="header6 primary">
            LOCALIZACIÓN
          </RkText>
        </View>
        <View>
          <Text
            style={{
              paddingHorizontal: 17.5,
              marginBottom: 15,
              fontSize: 16,
              fontWeight: "500"
            }}
          >
            {this.state.address !== "" ? this.state.address : "Madrid, España"}
          </Text>

          <MapModal
            mapRegion={this.state.mapRegion}
            radious={this.state.distancia}
            products={this.state.productos}
          />
        </View>

        <View
          style={{
            alignItems: "stretch",
            marginHorizontal: 30,
            justifyContent: "center"
          }}
        >
          <Slider
            value={this.state.distancia}
            onValueChange={async distancia => this.setDistancia(distancia)}
            maximumValue={300}
            step={this.stepFunctionDistance()}
            thumbTintColor="#01579B"
          />
          <Text>Distancia max: {this.state.distancia} km</Text>
        </View>

        {/*         <View style={styles.lineStyle} />

        <View style={[styles.row, styles.heading]}>
          <RkText style={{ marginTop: 20 }} rkType="header6 primary">
            FECHA PUBLCACIÓN
          </RkText>
        </View>

        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={{ height: 100 }}
        /> */}
        <View style={styles.lineStyle} />

        <View style={[styles.row, styles.heading]}>
          <RkText style={{ marginTop: 20 }} rkType="header6 primary">
            MÉTODO DE COMPRA
          </RkText>
        </View>

        <ButtonGroup
          onPress={this.updateIndexM}
          selectedIndex={selectedIndexM}
          buttons={modos}
          containerStyle={{ height: 100 }}
        />
      </ScrollView>
    );
  }
}

export default connect()(Settings);

const styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base
  },
  padding: {
    padding: 20,
    height: 200
  },
  header: {
    backgroundColor: theme.colors.screen.neutral,
    paddingVertical: 25,
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  section: {
    backgroundColor: "#F5F5F5"
  },
  heading: {
    paddingBottom: 12.5
  },
  row: {
    flexDirection: "row",
    paddingHorizontal: 17.5,
    alignItems: "center"
  },
  button: {
    marginHorizontal: 16,
    marginBottom: 32
  },

  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: Constants.statusBarHeight,
    backgroundColor: "#F5F5F5"
  },

  picker: {
    width: 200,
    height: 44,
    backgroundColor: "#FFF0E0",
    borderColor: "red",
    borderBottomWidth: 2,
    flex: 90
  },

  lineStyle: {
    borderWidth: 0.2,
    borderColor: "black",
    margin: 4
  },

  pickerItem: {
    height: 44,
    color: "red"
  }
}));
