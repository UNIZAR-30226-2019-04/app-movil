import React, { Component } from "react";
import ProductHorizontal from "../ProductHorizontal";
import axios from "axios";
import { API_BASE } from "../../config";

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
export default class TabsExample extends Component {
  state = {
    products: [],
    user: "",
    token: ""
  };

  componentDidMount = async () => {
    let token, user;
    try {
      user = await AsyncStorage.getItem("user");
      token = await AsyncStorage.getItem("token");
      console.log("User", user, token);
    } catch (error) {
      console.log(error);
    }
    user = "8e4de80f-d9bf-411c-a696-58e3481a1b36";
    token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NTc1ODg1NTEsInN1YiI6MTksImV4cCI6MTU1NzY3NDk1Nn0.rE3VWsRoamkEMPSM48kfnj1c5AfH572v2QjQzpoHxIA";

    this.setState({ user, token });
    this.fetchItems();
  };

  fetchItems = page => {
    const user = this.state.user;
    const URL = `${API_BASE}/producto?usuario=${user}`;
    console.log(URL);

    axios
      .get(URL, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        productos = res.data.productos;
        console.log("Response productos", productos);
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

    if (this.state.products.length > 0) {
      list_products = this.state.products.map(product => {
        let thumbnail = {};
        console.log("Product:", product);
        for (let i = 0; i < product.multimedia.length; i++) {
          if (!product.multimedia[i].tipo) {
            thumbnail = product.multimedia[i];
            break;
          }
        }
        let { navigation } = this.props;

        return (
          <View
            key={product.id}
            style={{
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
