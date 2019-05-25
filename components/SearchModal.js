import React, { Component } from "react";
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  ScrollView,
  StyleSheet,
  Alert
} from "react-native";
import { SearchBar } from "react-native-elements";
import { Platform, StatusBar, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { addTag } from "../actions";
import { API_BASE, DEBUG, USER, TOKEN } from "../config";
import axios from "axios";

class SearchModal extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    modalVisible: false,
    search: "",
    products: []
  };

  updateSearch = search => {
    this.setState({ search });
    this.queryResults(search);
  };
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  clearSearch() {
    this.setState({ search: "" });
  }

  componentDidMount() {
    if (this.props.search !== undefined) {
      this.setState({ search: this.props.search });
    }
  }

  queryResults(text) {
    //console.log("onRefresh");
    this.setState({ isRefreshing: true }); // true isRefreshing flag for enable pull to refresh indicator
    const URL = `${API_BASE}/producto?textoBusqueda=${text}&number=20&page=0`;

    axios
      .get(URL)
      .then(res => {
        let productos = res.data.productos;
        this.setState({ products: productos });

        console.log("Query productos", text, productos);
      })
      .catch(error => {
        console.log(error);
      });
  }

  _method(search) {
    this.setModalVisible(!this.state.modalVisible);
    if (search == null) {
      search = this.state.search;
    }
    //console.log("Search ", this.state.search);
    this.props.dispatch(addTag(search, "search"));
    this.props.navigation.navigate("SearchResults", {
      search: search
    });
  }
  render() {
    const { search } = this.state;
    //console.log("Navigation", this.props);

    let list_products = [];

    if (this.state.products.length > 0) {
      list_products = this.state.products.map(product => {
        return (
          <View
            key={product.id}
            style={{
              margin: 0
            }}
          >
            <TouchableHighlight onPress={() => this._method(product.titulo)}>
              <Text
                style={{
                  color: "white",
                  fontFamily: "space-mono",
                  fontSize: 20,
                  fontWeight: "500"
                }}
              >
                {product.titulo}
              </Text>
            </TouchableHighlight>
          </View>
        );
      });
    }

    return (
      <View style={{ marginTop: 0 }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => this.setModalVisible(false)}
        >
          <ScrollView style={{ backgroundColor: "#01579B" }}>
            <View style={{ margin: 52 }}>
              <SearchBar
                searchIcon={{ color: "white" }}
                inputStyle={{ color: "white" }}
                cancelIcon={{ color: "white" }}
                clearlIcon={{ color: "white" }}
                onClear={() => this.clearSearch}
                onCancel={() => this.setModalVisible(false)}
                placeholder="Buscar..."
                onChangeText={this.updateSearch}
                value={search}
                returnKeyType="search"
                //value={this.search}
                platform={Platform.OS}
                containerStyle={{
                  marginTop: 0,
                  backgroundColor: "transparent"
                }}
                //inputStyle={{ margin: 0, borderRadius: 100 }}
                //placeholderTextColor={"#g5g5g5"}
                lightTheme
                round
              />
              <Ionicons
                style={{
                  position: "absolute",
                  right: -30,
                  top: 15
                }}
                onPress={() => this.setModalVisible(false)}
                name="md-close"
                size={32}
                color="white"
              />

              {this.state.search !== "" ? (
                <ScrollView>
                  <TouchableHighlight onPress={() => this._method(null)}>
                    <View>
                      <Text
                        style={{
                          color: "white",
                          fontFamily: "space-mono",
                          fontSize: 20,
                          fontWeight: "500"
                        }}
                      >
                        Buscar: "{this.state.search}"
                      </Text>
                      <View style={[styles.lineStyle, { marginBottom: 0 }]} />
                    </View>
                  </TouchableHighlight>

                  {list_products}
                </ScrollView>
              ) : (
                []
              )}
            </View>
          </ScrollView>
        </Modal>

        <SearchBar
          placeholder="Buscar..."
          platform={Platform.OS}
          containerStyle={{
            height: 40,
            width: 270,
            marginTop: 4,
            backgroundColor: "transparent"
          }}
          value={search}
          searchIcon={{ color: "white" }}
          cancelIcon={{ color: "white" }}
          inputStyle={{ color: "white" }}
          clearlIcon={{ color: "white" }}
          lightTheme
          round
        />

        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}
          style={{
            //flexDirection: "row",
            height: 40,
            width: 270,
            marginTop: -40,
            marginBottom: 10,

            backgroundColor: "transparent"

            //marginTop: Platform.OS == "ios" ? 20 : 0 // only for IOS to give StatusBar Space
          }}
        >
          <Text />
        </TouchableHighlight>
      </View>
    );
  }
}
export default connect()(SearchModal);

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#F5F5F5"
  },

  button: {
    width: 180
  },

  scene: {
    flex: 1
  },
  lineStyle: {
    borderWidth: 0.2,
    borderColor: "white",
    margin: 4
  }
});
