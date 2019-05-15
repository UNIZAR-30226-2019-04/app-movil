import React, { Component } from "react";
import {
  View,
  ScrollView,
  FlatList,
  Text,
  StyleSheet,
  Field,
  TouchableHighlight,
  Dimensions,
  ActivityIndicator,
  RefreshControl
} from "react-native";
import { SearchBar, Button } from "react-native-elements";
import { Platform, StatusBar, TouchableOpacity } from "react-native";
import SearchModal from "../components/SearchModal";
import categories from "../assets/categorias.json";
import dummy_products from "../assets/dummy_products.json";
import Product from "../components/Product";
import ProductVertical from "../components/ProductVertical";
import UploadProductModal from "../components/UploadProductModal";
import { AsyncStorage } from "react-native";
import { connect } from "react-redux";
import { addTag } from "../actions";

import axios from "axios";
import { API_BASE } from "../config";
import { Font } from "expo";

import Icon from "react-native-vector-icons/FontAwesome";
import ProductHorizontal from "../components/ProductHorizontal";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
class Feed extends Component {
  constructor(props) {
    super(props);
    this.page = 0;
    this.state = {
      loading: false, // user list loading
      isRefreshing: false, //for pull to refresh
      data: [], //user list
      error: "",
      search: "",
      modalVisible: null,
      products: []
    };
  }

  componentDidMount = async () => {
    const { setParams } = this.props.navigation;
    const { state } = this.props.navigation;

    this.fetchItems(0);

    setParams({ modalVisible: false });

    setParams({
      setModalVisible: visible => {
        setParams({ modalVisible: visible });
      },

      isVisible: () => {
        return state.modalVisible === true;
      }
    });
  };

  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    if (state.params != undefined) {
      return {
        // Your custom header
        headerTitle: (
          <View>
            <SearchModal navigation={navigation} />
          </View>
        )
      };
    }
  };

  handleLoadMore = () => {
    console.log("handleLoadMore", this.page + 1);

    if (!this.state.loading) {
      this.page = this.page + 1; // increase page by 1
      this.fetchItems(this.page); // method for API call
    }
  };

  onRefresh() {
    console.log("onRefresh");
    this.setState({ isRefreshing: true }); // true isRefreshing flag for enable pull to refresh indicator
    const URL = `${API_BASE}/producto?number=20&page=0`;

    axios
      .get(URL)
      .then(res => {
        let productos = res.data.productos;
        console.log("Response  onRefresh productos", productos);

        this.setState({ isRefreshing: false, products: productos }); // false isRefreshing flag for disable pull to refresh indicator, and clear all data and store only first page data
      })
      .catch(error => {
        this.setState({
          isRefreshing: false,
          error: "Something just went wrong"
        }); // false isRefreshing flag for disable pull to refresh
      });
  }

  fetchItems = page => {
    const URL = `${API_BASE}/producto?number=20&page=${page}`;
    console.log(URL);

    axios
      .get(URL, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        productos = res.data.productos;
        console.log("State productos", this.state.products);

        console.log("Response productos", productos);

        this.setState({ products: this.state.products.concat(productos) });

        /*
        this.setState({
          products: [...this.state.products, ...productos]
        });
        */
      });
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
          thumbnail={{ uri: thumbnail.path }}
          titulo={item.titulo}
          precio={item.precioBase}
          deseado={item.deseado}
          descripcion={item.descripcion}
        />
      </TouchableHighlight>
    );
  };

  selectCategory = async name => {
    await this.props.dispatch(addTag(name, "category"));

    let { navigation } = this.props;
    navigation.navigate("SearchResults", { search: "" });
  };

  renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    if (!this.state.loading) return null;
    return (
      <View>
        <ActivityIndicator style={{ color: "#000" }} />
      </View>
    );
  };

  render() {
    const { search } = this.state;
    console.log(categories, this.state.products);
    const list_categories = Object.keys(categories).map(name => {
      return (
        <View
          key={name}
          style={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            margin: 10
          }}
        >
          <Icon
            onPress={async () => this.selectCategory(name)}
            name={categories[name].icon}
            size={36}
            color="grey"
          />
          <Text
            style={{
              width: 80,
              textAlignVertical: "center",
              textAlign: "center",
              fontFamily: "space-mono",
              fontSize: 10,
              color: "grey"
            }}
            numberOfLines={2}
          >
            {name}
          </Text>
        </View>
      );
    });
    let list_products = [];

    if (this.state.products !== undefined) {
      this.state.products.map(product => {
        let thumbnail = {};
        console.log("Product", product);
        for (let i = 0; i < product.multimedia.length; i++) {
          if (!product.multimedia[i].tipo) {
            thumbnail = product.multimedia[i];
            break;
          }
        }

        return (
          <View
            key={product.id}
            style={{
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              margin: 0
            }}
          >
            <TouchableHighlight onPress={() => this._method(product.id)}>
              <Product
                thumbnail={{ uri: thumbnail.path }}
                titulo={product.titulo}
                precio={product.precioBase}
                deseado={product.deseado}
              />
            </TouchableHighlight>
          </View>
        );
      });
    }

    if (this.state.loading && this.page === 0) {
      return (
        <View
          style={{
            width: "100%",
            height: "100%"
          }}
        >
          <ActivityIndicator style={{ color: "#000" }} />
        </View>
      );
    }

    const Header = (
      <View
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: "#F5F5F5",
          flex: 1
        }}
        contentContainerStyle={{ flex: 1 }} // important!
      >
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.section}
        >
          {list_categories}
        </ScrollView>

        <View style={styles.section}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "500",
              paddingHorizontal: 16,
              margin: 5,
              fontFamily: "space-mono"
            }}
          >
            Productos Destacados
          </Text>

          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.section}
          >
            {list_products}
          </ScrollView>
        </View>

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
            Productos cercanos
          </Text>
        </View>
      </View>
    );
    return (
      <View style={{ width: "100%", height: "100%" }}>
        <FlatList
          data={this.state.products}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          numColumns={2}
          style={{
            width: "100%"
          }}
          ListHeaderComponent={Header}
          ListFooterComponent={this.renderFooter.bind(this)}
          onEndReachedThreshold={0.1}
          onEndReached={this.handleLoadMore.bind(this)}
        />
        <UploadProductModal />
      </View>
    );
  }
}
export default connect()(Feed);

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
