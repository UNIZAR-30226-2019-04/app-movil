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
import { SearchBar, Button } from "react-native-elements";
import { Platform, StatusBar, TouchableOpacity } from "react-native";
import SearchModal from "../components/SearchModal";
import categories from "../assets/categorias.json";
import dummy_products from "../assets/dummy_products.json";
import VisibleTags from "../containers/VisibleTags";
import ProductVertical from "../components/ProductVertical";
import UploadProductModal from "../components/UploadProductModal";
import { AsyncStorage } from "react-native";
import { connect } from "react-redux";
import store from "../store";
import { API_BASE } from "../config";
import { Font } from "expo";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const default_tags = { "24h": { name: "24h" }, "1Km": { name: "1Km" } };
let first = true;
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
    old_tags: []
  };

  componentDidMount = async () => {
    const { setParams } = this.props.navigation;
    const { state } = this.props.navigation;

    this.setState({ old_tags: this.fetchTags() });
    this.fetchItems(0);

    first = false;
    setParams({
      modalVisible: false
    });

    setParams({
      setModalVisible: visible => {
        setParams({ modalVisible: visible });
      },

      isVisible: () => {
        return state.modalVisible === true;
      }
    });
  };

  deleteTag = name => {
    let copy = [];
    this.setState(prevState => {
      copy = prevState.tags.filter(tag => tag.name !== name);
      console.log(copy);

      return { tags: copy };
    });
  };

  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    if (state.params != undefined) {
      console.log("Params", state.params);
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
    console.log("onRefresh");
    this.setState({ isRefreshing: true }); // true isRefreshing flag for enable pull to refresh indicator

    this.setState({ products: [] });
    this.fetchItems(0);

    console.log("CURRENT TAGS: ", this.fetchTags());
    this.setState({ isRefreshing: false }); // true isRefreshing flag for enable pull to refresh indicator
  }
  fetchItems = page => {
    const URL = `${API_BASE}/producto?number=20&page=${page}`;
    axios
      .get(URL, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        productos = res.data.productos;

        this.fetchTags().map(tag => {
          productos = productos.filter(function(item) {
            if (tag.ctype === "price" && tag.name !== null) {
              return item.precioBase == tag.name;
            } else if (tag.ctype === "category" && tag.name !== null) {
              return item.categoria_nombre == tag.name;
            } else if (tag.ctype === "fecha" && tag.name !== null) {
              return item.fecha == tag.name;
            } else if (tag.ctype === "search" && tag.name !== null) {
              return item.titulo == tag.name;
            } else {
              return item.titulo == item.titulo;
            }
          });
        });

        this.setState({
          products: [...this.state.products, ...productos]
        });
      });
  };

  fetchTags = () => {
    const { state } = this.props.navigation;

    /// GET TAGS FROM STORE (current state)
    let currentState = store.getState(store);
    console.log("DISPATCH", currentState.tags);

    return (tags = currentState.tags);
  };

  onClick() {
    console.log("navigation searchbar");
    let { navigation } = this.props;
    navigation.navigate("Settings");
  }

  showSearches = () => {
    console.log(" searching");
    //this.setState({ search });
  };

  updateSearch = search => {
    console.log(" searching");

    this.setState({ search });
  };

  _keyExtractor = (item, index) => {
    return item.id.toString();
  };

  _method = product => {
    this.props.navigation.navigate("ProductDetails", { product });
  };
  _renderItem = ({ item }) => {
    let { navigation } = this.props;
    console.log("pressed");
    let thumbnail = {};
    for (let i = 0; i < item.multimedia.length; i++) {
      if (!item.multimedia[i].tipo) {
        console.log(item.multimedia[i]);
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
    const { search } = this.state;

    const Header = (
      <View
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: "#F5F5F5"
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
    //console.log(this.state.products);
    return (
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
        style={{
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap"
        }}
      />
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
