import React, { Component } from "react";
import Review from "../Review";
import dummy_products from "../../assets/dummy_products.json";
import { View, FlatList, TouchableHighlight } from "react-native";
import axios from "axios";
import { API_BASE, API_KEY } from "../../config";

export default class MyReviews extends Component {
  state = {
    products: [],
    visto: 0
  };

  componentDidMount() {
    if(this.state.visto != 1 && this.props.user != null){
      this.state.visto = 1;
      this.fetchItems();
    }
  }

  fetchItems() {
    let user = this.props.user;
    console.log(user);
    let URL = `${API_BASE}/user/${user}`; 
    axios
        .get(
            URL
        )
        .then(res => {
            var list = [];
            Object.keys(res.data.valoraciones_hechas).map(name => {
              list.push(name);
            });
            this.setState({
              products: [...this.state.products, ...list]
            });
            
        })
        .catch(err => {
            console.log(err);
        });
  }

  _keyExtractor = (item, index) => {
    return index.toString();
  };

  _method = product => {
    this.props.route.navigation.navigate("ProductDetails", { product });
  };
  _renderItem = ({ item }) => {
    //console.log("pressed");
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
    //console.log("Props", this.props);

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
