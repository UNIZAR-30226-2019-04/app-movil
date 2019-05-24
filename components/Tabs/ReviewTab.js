import React, { Component } from "react";
import Review from "../Review";
import dummy_products from "../../assets/dummy_products.json";
import { Text, View, FlatList, TouchableHighlight } from "react-native";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import { Picker, Divider, Dimensions } from "react-native";
import { RkText, RkStyleSheet, RkGallery } from "react-native-ui-kitten";

import YourReviews from "./YourReviews";
import MyReviews from "./MyReviews";


export default class ReviewTab extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    products: [],
    index: 0,
    routes: [
      { key: "first", title: "Recibidas", navigation: this.props.navigation },

      { key: "second", title: "Realizadas", navigation: this.props.navigation },
    ]
  };

  componentDidMount() {
    this.fetchItems();
  }

  fetchItems() {
    let user = this.props.user;

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

  _renderTabBar = props => {
    return (
      <TabBar
        {...props}
        //renderLabel={this._renderLabel}
        getLabelText={({ route }) => (
          <Text style={{ color: "black" }}>{route.title}</Text>
        )}
        indicatorStyle={styles.indicator}
        //renderIcon={this._renderIcon}
        style={styles.tabbar}
      />
    );
  };


  render() {
    //console.log("-----------REVIEWTAB-----------");
    //console.log(this.props.user);

    return (
      <View style={{ flex: 1, flexDirection: "row" }}>
        <TabView
          style={{ backgroundColor: "white", color: "red", fontWeight: "bold" }}
          navigationState={this.state}
          renderScene={SceneMap({
            first: () => <MyReviews user={this.props.user} />,
            second: () => <YourReviews user={this.props.user} />,
          })}
          renderTabBar={this._renderTabBar}
          onIndexChange={index => this.setState({ index })}
          initialLayout={{ width: Dimensions.get("window").width }}
        />
      </View>
    );
  }
}

const styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: "#F5F5F5"
  },
  tabbar: {
    backgroundColor: "#F5F5F5"
  },
  indicator: {
    backgroundColor: "#01579B"
  },
  header: {
    flex: 1,
    flexDirection: "row",
    //alignItems: "center",
    paddingTop: 25,
    paddingBottom: 17
  },
  userInfo: {
    flexDirection: "row",
    paddingVertical: 18,
    paddingHorizontal: 20
  },
  bordered: {
    borderBottomWidth: 1,
    borderColor: theme.colors.border.base
  },
  section: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 30
  },
  space: {
    marginBottom: 3
  },
  separator: {
    backgroundColor: theme.colors.border.base,
    alignSelf: "center",
    flexDirection: "row",
    flex: 0,
    width: 1,
    height: 42
  },
  buttons: {
    flex: 1,

    flexDirection: "row",
    paddingVertical: 2,
    justifyContent: "center"
  },
  button: {
    width: 180
  },
  scene: {
    flex: 1
  }
}));
