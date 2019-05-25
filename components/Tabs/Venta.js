import React, { Component } from "react";
import ProductHorizontal from "../ProductHorizontal";
import ProductHorizontal2 from "../ProductHorizontal2";
import TruequeModal from "../TruequeModal";
import axios from "axios";
import { API_BASE, DEBUG, USER, TOKEN } from "../../config";
import { AsyncStorage } from "react-native";

import {
  View,
  ScrollView,
  FlatList,
  Text,
  StyleSheet,
  Dimensions,
  Button,
  Field,
  TouchableHighlight
} from "react-native";
export default class Venta extends Component {
  state = {
    products: [],
    user: "",
    token: ""
  };

  componentDidMount = () => {
    this.fetchItems();
  };

  fetchItems = () => {
    //console.log("VENTA", this.props);
    let user = this.props.user;

    this.setState({ user });
    const URL = `${API_BASE}/user/${user}/products`;
    //console.log(URL);

    axios
      .get(URL, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        productos = res.data.cajas_productos;
        //console.log("Response productos", productos);
        this.setState({ products: productos });
      });
  };

  _keyExtractor = (item, index) => {
    return index.toString();
  };

  _method = product => {
    this.props.route.navigation.navigate("ProductDetails", { product });
  };

  render() {
    let list_products = [];

    if (this.state.products !== undefined && this.state.products.length > 0) {
      list_products = this.state.products.map(product => {
        let thumbnail = {};
        //console.log("Product:", product);
        for (let i = 0; i < product.multimedia.length; i++) {
          if (!product.multimedia[i].tipo) {
            thumbnail = product.multimedia[i];
            break;
          }
        }
        let { navigation } = this.props;

        if (product.tipo != "trueque") {
          return (
            <View
              key={product.id}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                margin: 0
              }}
            >
              <TouchableHighlight onPress={() => this._method(product.id)}>
                <ProductHorizontal
                  navigation={navigation}
                  thumbnail={thumbnail.path}
                  titulo={product.titulo}
                  precio={product.precioBase}
                  deseado={product.deseado}
                  descripcion={product.descripcion}
                />
              </TouchableHighlight>
            </View>
          );
        } else {
          return (
            <View
              key={product.id}
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-evenly",
                alignItems: "center",
                margin: 10
              }}
            >
              <TouchableHighlight onPress={() => this._method(product.id)}>
                <ProductHorizontal2
                  navigation={navigation}
                  thumbnail={thumbnail.path}
                  titulo={product.titulo}
                  precio={product.precioBase}
                  deseado={product.deseado}
                  descripcion={product.descripcion}
                />
              </TouchableHighlight>
              <TruequeModal producto={product.id} />
            </View>
          );
        }
      });
    }

    return (
      <ScrollView
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        style={styles.section}
      >
        {list_products}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#F5F5F5"
  },
  sectionVertical: {
    marginVertical: 2,
    backgroundColor: "white",
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#fff"
  },
  section: {
    marginVertical: 2,
    backgroundColor: "white",
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#fff"
  },

  scene: {
    flex: 1
  }
});
