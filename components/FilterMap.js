import React, { Component } from "react";
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  Alert,
  StyleSheet,
  Dimensions,
  ScrollView
} from "react-native";
import { SearchBar } from "react-native-elements";
import { Platform, StatusBar, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";
import store from "../store";
import MapModalFilter from "../components/mapModalFilter";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import categories from "../assets/categorias.json";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const ROW_WIDTH = width - 60;

export default class FilterMap extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    modalVisible: false,
    selected: null,
    tags: [],
    products: [],
    markers: []
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  getMarkers(products) {
    console.log("getMarkers products", products);

    let markers = [];
    products.map((product, index) => {
      let marker = {
        coordinate: { latitude: product.latitud, longitude: product.longitud }
      };

      markers.push(marker);
      console.log("push", marker, products);
    });
    console.log("getMarkers", markers);
    this.setState({ markers });
  }
  componentDidMount() {
    let products = this.props.products;
    this.setState({ products });
    this.getMarkers(products);
    console.log("FilterMap", this.props.products);
  }

  componentDidUpdate() {
    if (this.state.products.length < 1 && this.props.products.length > 0) {
      let products = this.props.products;
      this.setState({ products });
      this.getMarkers(products);
      console.log("FilterMap", this.props.products);
    } else if (this.props.products !== this.state.products) {
      let products = this.props.products;
      this.setState({ products });
      this.getMarkers(products);
      console.log("FilterMap", this.props.products);
    }
  }
  _method = product => {
    console.log("ProductDetails", product);
    this.setModalVisible(false);
    this.props.navigation.navigate("ProductDetails", {
      product: product.id,
      deseado: product.deseado
    });
  };
  scrollToRow(itemIndex) {
    this._scrollView.scrollTo({
      x: itemIndex * ROW_WIDTH,
      y: 1,
      animated: true
    });
  }

  render() {
    let list_products = [];

    if (this.props.products.length > 0) {
      list_products = this.props.products.map(product => {
        let thumbnail = {};
        console.log("Product:", product);
        for (let i = 0; i < product.multimedia.length; i++) {
          if (!product.multimedia[i].tipo) {
            thumbnail = product.multimedia[i];
            break;
          }
        }

        let category = categories[product.categoria_nombre];
        console.log("category", category);
        return (
          <View
            key={product.id}
            style={{
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              margin: 0,
              flex: 1,
              zIndex: 12
            }}
          >
            <TouchableHighlight
              onPress={() => {
                //this.setModalVisible(false);
                this._method(product);
              }}
            >
              <Card style={{ width: 340, marginHorizontal: 10 }}>
                {/*                 <Card.Content>
                  <Title>{product.titulo}</Title>
                  <Paragraph>Card content</Paragraph>
                </Card.Content> */}
                <Card.Cover source={{ uri: thumbnail.path }} />
                <Card.Title
                  title={product.titulo}
                  subtitle={product.precioBase + "€"}
                  left={props => (
                    <Icon
                      {...props}
                      size={36}
                      color="grey"
                      name={category.icon}
                    />
                  )}
                />
              </Card>
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
          <Ionicons
            style={{
              position: "absolute",
              right: 0,
              marginRight: 20,
              marginLeft: 20,
              marginTop: 30
            }}
            onPress={() => this.setModalVisible(false)}
            name="md-close"
            size={38}
            color="grey"
          />

          <ScrollView
            ref={view => (this._scrollView = view)}
            style={{
              position: "absolute",
              width: width,
              height: 300,
              bottom: 0,
              backgroundColor: "#F5F5F5",
              flex: 1,
              zIndex: 10
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            {list_products}
          </ScrollView>

          <MapModalFilter
            style={{
              width: width,
              height: height,
              zIndex: -1
            }}
            mapRegion={this.props.mapRegion}
            radious={this.props.distancia}
            products={this.props.products}
            markers={this.state.markers}
            scrollToRow={index => this.scrollToRow(index)}
          />
        </Modal>
        <View
          style={{
            position: "absolute",
            right: 0,
            marginRight: 2,
            bottom: 0
          }}
        >
          <Icon
            style={{
              position: "absolute",
              right: 20,
              bottom: 20,
              marginRight: 2
              //marginTop: 30
            }}
            onPress={() => this.setModalVisible(true)}
            name="compass"
            borderRadius="10"
            backgroundColor="#007AFF"
            size={70}
            color="grey"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  section: {
    flex: 1,
    marginVertical: 2,
    backgroundColor: "white",
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#fff"
  },

  floatingButton: {
    width: 160,
    height: 60
  },
  buttonView: {
    position: "absolute",
    bottom: 10,
    right: width / 2 - 80,
    backgroundColor: "blue",
    borderRadius: 20
  }
});
