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
import SearchResults from "../screens/SearchResults";

import Icon from "react-native-animated-icons";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
let firtUpdate = true;

const SearchTags = ({ tags, deleteTag }) => {
  const list_tags = Object.keys(tags).map(key => {
    let tag = tags[key];

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
            tag.ctype === "price"
              ? tag.name + "€"
              : tag.ctype === "distance"
              ? tag.name + "km"
              : tag.name
          }
          onPress={() => deleteTag(tag.name)}
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
};

export default SearchTags;

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
