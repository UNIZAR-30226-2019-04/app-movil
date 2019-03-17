import React, { Component } from "react";
import { View, Text, StyleSheet, Button, Field } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import { SearchBar } from "react-native-elements";
import { Platform, StatusBar, TouchableOpacity } from "react-native";
import SearchModal from "../components/SearchModal";
export default class Feed extends Component {
  state = {
    search: "",
    modalVisible: null
  };

  componentDidMount() {
    const { setParams } = this.props.navigation;
    const { state } = this.props.navigation;

    setParams({ modalVisible: false });

    setParams({
      setModalVisible: visible => {
        setParams({ modalVisible: visible });
      },

      isVisible: () => {
        return state.modalVisible === true;
      }
    });
  }

  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    if (state.params != undefined) {
      return {
        // Your custom header
        headerTitle: (
          <View>
            <SearchModal />
          </View>
        )
      };
    }
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

  render() {
    const { search } = this.state;

    return (
      <View style={{ flex: 1, backgroundColor: "#F5F5F5" }}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>Feed</Text>
        </View>
      </View>
    );
  }
}
