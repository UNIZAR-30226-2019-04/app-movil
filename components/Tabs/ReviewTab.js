import React, { Component } from "react";
import Review from "../Review";
import dummy_products from "../../assets/dummy_products.json";
import { View, FlatList, TouchableHighlight } from "react-native";

export default class ReviewTab extends Component {
  state = {
    products: []
  };

  componentDidMount() {
    this.fetchItems();
  }

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

  _keyExtractor = (item, index) => {
    return index.toString();
  };

  _method = product => {
    this.props.route.navigation.navigate("ProductDetails", { product });
  };
  _renderItem = ({ item }) => {
    console.log("pressed");
    return (
      <TouchableHighlight onPress={() => this._method(item)}>
        <Review
          imageUri={{ uri: item.multimedia[0].url }}
          name={item.name}
          description={item.description}
        />
      </TouchableHighlight>
    );
  };

  render() {
    console.log("Props", this.props);

    return (
      <View style={{ flex: 1, flexDirection: "row" }}>
        <FlatList
          data={this.state.products}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          numColumns={1}
          style={{
            flex: 1,
            flexDirection: "row",
            flexWrap: "wrap"
          }}
        />
      </View>
    );
  }
}
