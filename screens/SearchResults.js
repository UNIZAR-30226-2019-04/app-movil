import React, { Component } from "react";
import {
  View,
  ScrollView,
  FlatList,
  Text,
  StyleSheet,
  Field,
  TouchableHighlight,
  RefreshControl,
  Dimensions
} from "react-native";
import { Platform, StatusBar, TouchableOpacity } from "react-native";
import SearchModal from "../components/SearchModal";
import VisibleTags from "../containers/VisibleTags";
import ProductVertical from "../components/ProductVertical";
import FilterMap from "../components/FilterMap";
import { API_BASE, API_KEY } from "../config";

import UploadProductModal from "../components/UploadProductModal";
import { connect } from "react-redux";
import store from "../store";
import { Font, Permissions, Location } from "expo";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

class SearchResults extends Component {
  constructor(props) {
    super(props);

    this.deleteTag = this.deleteTag.bind(this);
  }

  state = {
    search: "",
    isRefreshing: false,
    modalVisible: false,
    products: [],
    tags: [],
    mapRegion: null,
    locationResult: null,
    hasLocationPermissions: false,
    distancia: 0
  };

  componentDidMount = async () => {
    const { setParams } = this.props.navigation;
    const { state } = this.props.navigation;

    this.fetchItems(0);
    this._getLocationAsync();

    first = false;
    setParams({
      modalVisible: false
    });

    this.getDistancia();
    setParams({
      setModalVisible: visible => {
        setParams({ modalVisible: visible });
      },

      isVisible: () => {
        return state.modalVisible === true;
      }
    });
  };

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    //console.log("_getLocationAsync", status);
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

    //this.getAddressFromCoordinates(lat, long);
    //this.fetchItems();
  };

  deleteTag = name => {
    let copy = [];
    this.setState(prevState => {
      copy = prevState.tags.filter(tag => tag.name !== name);
      //console.log(copy);

      return { tags: copy };
    });
  };

  getDistancia = () => {
    let tags = this.fetchTags();
    let distance;
    let list = tags.filter(tag => tag.ctype === "distance");
    if (list.length < 1) {
      distance = 100;
    } else {
      distance = list[0];
    }
    console.log("getDistancia", distance, tags);

    this.setState({ distancia: distance });
    return distance;
  };

  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    if (state.params != undefined) {
      //console.log("Params", state.params);
      return {
        // Your custom header
        headerTitle: (
          <View>
            <SearchModal navigation={navigation} search={state.params.search} />
          </View>
        )
      };
    }
  };

  updateState() {
    this.setState({ products: [] });
    this.fetchItems(0);
  }

  onRefresh() {
    //console.log("onRefresh");
    this.setState({ isRefreshing: true }); // true isRefreshing flag for enable pull to refresh indicator

    this.setState({ products: [] });
    this.fetchItems(0);

    //console.log("CURRENT TAGS: ", this.fetchTags());
    this.setState({ isRefreshing: false }); // true isRefreshing flag for enable pull to refresh indicator
  }
  fetchItems = page => {
    var URL = `${API_BASE}/producto`;
    let tags = this.fetchTags();
    let body = {};
    var first = true;
    tags.map(tag => {
      if (tag.ctype === "price" && tag.name !== null) {
        if (first) {
          URL = URL + `?preciomax=${tag.name}`;
          first = false;
        } else {
          URL = URL + `&preciomax=${tag.name}`;
        }
      } else if (tag.ctype === "category" && tag.name !== null) {
        if (first) {
          URL = URL + `?categorias=${tag.name}`;
          first = false;
        } else {
          URL = URL + `&categorias=${tag.name}`;
        }
      } else if (tag.ctype === "search" && tag.name !== null) {
        if (first) {
          URL = URL + `?textoBusqueda=${tag.name}`;
          first = false;
        } else {
          URL = URL + `&textoBusqueda=${tag.name}`;
        }
      } else if (tag.ctype === "distance" && tag.name !== null) {
        if (first) {
          URL = URL + `?radioUbicacion=${tag.name}`;
          first = false;
        } else {
          URL = URL + `&radioUbicacion=${tag.name}`;
        }
      } else if (tag.ctype === "mode" && tag.name !== null) {
        if (first) {
          URL = URL + `?tipo=${tag.name}`;
          first = false;
        } else {
          URL = URL + `&tipo=${tag.name}`;
        }
      }
    });

    let config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    axios
      .get(URL)
      .then(resp => {
        this.setState({
          products: resp.data.productos
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  fetchTags = () => {
    const { state } = this.props.navigation;

    /// GET TAGS FROM STORE (current state)
    let currentState = store.getState(store);
    //console.log("DISPATCH", currentState.tags);

    return (tags = currentState.tags);
  };

  onClick() {
    //console.log("navigation searchbar");
    let { navigation } = this.props;
    navigation.navigate("Settings");
  }

  showSearches = () => {
    //console.log(" searching");
    //this.setState({ search });
  };

  updateSearch = search => {
    //console.log(" searching");

    this.setState({ search });
  };

  _keyExtractor = (item, index) => {
    return item.id.toString();
  };

  _method = product => {
    this.props.navigation.navigate("ProductDetails", { product });
  };

  select = product => {
    //console.log("SELECTED", product);
    // this.setState({ modalVisible: false });
    this.props.navigation.navigate("ProductDetails", { product });
  };
  _renderItem = ({ item }) => {
    let { navigation } = this.props;
    //console.log("pressed");
    let thumbnail = {};
    for (let i = 0; i < item.multimedia.length; i++) {
      if (!item.multimedia[i].tipo) {
        //console.log(item.multimedia[i]);
        thumbnail = item.multimedia[i];
        break;
      }
    }
    return (
      <TouchableHighlight onPress={() => this._method(item.id)}>
        <ProductVertical
          navigation={navigation}
          thumbnail={thumbnail.path}
          titulo={item.titulo}
          precio={item.precioBase}
          deseado={item.deseado}
          descripcion={item.descripcion}
        />
      </TouchableHighlight>
    );
  };
  render() {
    let { navigation } = this.props;

    const { search } = this.state;

    const Header = (
      <View
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: "#F5F5F5",
          width: width
        }}
      >
        <VisibleTags />

        <View style={styles.section}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "500",
              paddingHorizontal: 16,
              fontFamily: "space-mono",
              margin: 5
            }}
          >
            Resultados de busqueda
          </Text>
        </View>
      </View>
    );
    ////console.log(this.state.products);
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.products}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          ListHeaderComponent={Header}
          numColumns={2}
          //ListFooterComponent={() => <FilterMap tags={this.state.tags} />}
          style={{
            flex: 1,
            flexDirection: "row",
            flexWrap: "wrap"
          }}
        />
        <View>
          <FilterMap
            tags={this.state.tags}
            mapRegion={this.state.mapRegion}
            radious={this.state.distancia}
            products={this.state.products}
            navigation={navigation !== undefined ? navigation : null}
            push={navigation.push}
            select={product => this.select(product)}
          />
        </View>
      </View>
    );
  }
}
export default connect()(SearchResults);

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#F5F5F5"
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

  floatingButton: {
    width: 160,
    height: 60,
    position: "absolute",
    bottom: 10,
    right: width / 2 - 80
  },

  scene: {
    flex: 1
  }
});
