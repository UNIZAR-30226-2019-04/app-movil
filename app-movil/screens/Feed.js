import React, { Component } from "react";
import {
  View,
  ScrollView,
  FlatList,
  Text,
  StyleSheet,
  Button,
  Field,
  TouchableHighlight
} from "react-native";
import { SearchBar } from "react-native-elements";
import { Platform, StatusBar, TouchableOpacity } from "react-native";
import SearchModal from "../components/SearchModal";
import categories from "../assets/categorias.json";
import dummy_products from "../assets/dummy_products.json";
import Product from "../components/Product";
import ProductVertical from "../components/ProductVertical";
import { Font } from "expo";

import Icon from "react-native-vector-icons/FontAwesome";

export default class Feed extends Component {
  state = {
    search: "",
    modalVisible: null,
    products: []
  };

  componentDidMount() {
    const { setParams } = this.props.navigation;
    const { state } = this.props.navigation;

    this.fetchItems();

    setParams({ modalVisible: false });

    setParams({
      setModalVisible: visible => {
        setParams({ modalVisible: visible });
      },

      isVisible: () => {
        return state.modalVisible === true;
      }
    });
  }

  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    if (state.params != undefined) {
      return {
        // Your custom header
        headerTitle: (
          <View>
            <SearchModal />
          </View>
        )
      };
    }
  };

  fetchItems() {
    var list = [];
    Object.keys(dummy_products).map(name => {
      var newelement = dummy_products[name];
      list.push(newelement);
    });
    this.setState({
      products: [...this.state.products, ...list]
    });
  }
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
    console.log("pressed");
    return (
      <TouchableHighlight onPress={() => this._method(item)}>
        <ProductVertical
          imageUri={{ uri: item.url }}
          name={item.name}
          price={item.price}
          description={item.description}
        />
      </TouchableHighlight>
    );
  };
  render() {
    const { search } = this.state;

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
            //onPress={() => navigation.openDrawer()}
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

    const list_products = Object.keys(dummy_products).map(name => {
      let product = dummy_products[name];
      return (
        <View
          key={name}
          style={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            margin: 0
          }}
        >
          <TouchableHighlight onPress={() => this._method(product)}>
            <Product
              imageUri={{ uri: product.url }}
              name={product.name}
              price={product.price}
            />
          </TouchableHighlight>
        </View>
      );
    });

    console.log(this.state.products);
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: "#F5F5F5"
        }}
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

          <View style={{ flex: 1, flexDirection: "row" }}>
            <FlatList
              data={this.state.products}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
              numColumns={2}
              style={{
                flex: 1,
                flexDirection: "row",
                flexWrap: "wrap"
              }}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

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
  scene: {
    flex: 1
  }
});
