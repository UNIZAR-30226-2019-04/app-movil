import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { Button } from "react-native-elements";

import { AsyncStorage } from "react-native";
import Icon from "react-native-animated-icons";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
let firtUpdate = true;

export default class SearchTags extends Component {
  state = {
    tags: []
  };

  componentDidMount() {
    this.fetchTags();
  }

  componentDidUpdate() {
    if (
      (this.state.tags !== this.props.tags && this.props.updated) ||
      firtUpdate
    ) {
      firtUpdate = false;
      this.fetchTags();
    }
  }
  deleteTag = async tagToDelete => {
    let copy = [];
    this.setState(prevState => {
      copy = prevState.tags.filter(tag => tag.name !== tagToDelete);
      return { tags: copy };
    });

    this.props.deleteTag(tagToDelete);
    try {
      let tags = await AsyncStorage.getItem("tags");
      if (tags == null) {
        tags = [];
      }
      tags = JSON.parse(tags);
      updated_tags = tags.filter(tag => tag.name !== tagToDelete);
      console.log("Updated tags", updated_tags, tags);
      await AsyncStorage.setItem("tags", JSON.stringify(updated_tags));
      //this.props.forceUpdate();
    } catch (error) {
      console.log(error);
    }
  };

  fetchTags() {
    let default_tags = this.props.tags;
    this.setState({ tags: default_tags });
  }
  render() {
    console.log("Props render", this.state.tags);

    const list_tags = Object.keys(this.state.tags).map(key => {
      let tag = this.state.tags[key];

      return (
        <View
          key={key}
          style={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            margin: 10
          }}
        >
          <Button
            title={
              tag.type === "price"
                ? tag.name + "€"
                : tag.type === "distance"
                ? tag.name + "km"
                : tag.name
            }
            onPress={() => this.deleteTag(tag.name)}
            style={{
              //width: 80,
              borderRadius: 200,
              borderWidth: 1,
              borderColor: "rgba(0,0,0,0.2)"
            }}
            icon={{
              name: "close",
              size: 20,
              color: "white"
            }}
            iconRight
            titleStyle={{
              textAlignVertical: "center",

              fontFamily: "space-mono",
              fontSize: 16,
              color: "white"
            }}
          />
        </View>
      );
    });

    let red = "rgba(245,60,60,0.8)";
    const custom_height = Dimensions.get("window").height / 10;
    return (
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.section}
      >
        {list_tags}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",

    width: Dimensions.get("window").width - 20,
    marginHorizontal: 10,

    borderWidth: 0.5,
    borderRadius: 12,
    borderColor: "#dddddd",
    marginBottom: 7
  },
  button: {
    marginHorizontal: 2,
    marginLeft: 10,
    height: 42,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#fff"
  }
});
