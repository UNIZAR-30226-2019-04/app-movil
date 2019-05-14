import React, { Component } from "react";
import {
  View,
  ScrollView,
  FlatList,
  Text,
  StyleSheet,
  Field,
  TouchableHighlight,
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

import { Font } from "expo";

import Icon from "react-native-vector-icons/FontAwesome";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const default_tags = { "24h": { name: "24h" }, "1Km": { name: "1Km" } };
let first = true;
class SearchResults extends Component {
  state = {
    search: "",
    modalVisible: false,
    products: [],
    tags: [],
    updated: false
  };

  componentDidMount = async () => {
    const { setParams } = this.props.navigation;
    const { state } = this.props.navigation;

    this.fetchTags();
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

  updated() {
    if (this.state.uppdated) {
      this.setState({ updated: false });
      return true;
    }
    return false;
  }

  deleteTag = name => {
    let copy = [];
    console.log("tagToDelete");

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

  fetchTags = () => {
    const { state } = this.props.navigation;

    /// GET TAGS FROM STORE (current state)
    let currentState = store.getState(store);
    console.log("DISPATCH", currentState.tags);

    let tags = currentState.tags;
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
    console.log("pressed");
    return (
      <TouchableHighlight onPress={() => this._method(item)}>
        <ProductVertical
          imageUri={{ uri: item.multimedia[0].url }}
          name={item.name}
          price={item.price}
          description={item.description}
        />
      </TouchableHighlight>
    );
  };
  render() {
    const { search } = this.state;

    //console.log(this.state.products);
    return (
      <View>
        <ScrollView
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

        <UploadProductModal />
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
