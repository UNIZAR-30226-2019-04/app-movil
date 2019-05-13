import React, { Component } from "react";
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  ScrollView,
  StyleSheet,
  Dimensions
} from "react-native";
import { SearchBar } from "react-native-elements";
import { Platform, StatusBar, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button, Tooltip } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import tipos from "../assets/tipos.json";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default class TypePickerModal extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    modalVisible: false,
    search: ""
  };

  updateSearch = search => {
    this.setState({ search });
  };
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  onSelect(type) {
    this.props.saveType(type);
    this.setModalVisible(false);
  }
  render() {
    const { search } = this.state;

    const list_types = Object.keys(tipos).map((name, index) => {
      return (
        <TouchableOpacity key={index} onPress={() => this.onSelect(name)}>
          <View
            key={name}
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              marginLeft: 50,

              marginVertical: 3
            }}
          >
            <Icon
              //onPress={() => navigation.openDrawer()}
              name={tipos[name].icon}
              size={36}
              color="grey"
            />
            <Text
              style={{
                marginHorizontal: 10,
                fontFamily: "space-mono",
                fontSize: 18,
                color: "grey"
              }}
            >
              {name}
            </Text>
          </View>
          <View style={styles.lineStyle} />
        </TouchableOpacity>
      );
    });

    return (
      <View style={{ marginTop: 0 }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => this.setModalVisible(false)}
        >
          <ScrollView
            showsHorizontalScrollIndicator={false}
            style={styles.section}
          >
            {list_types}
          </ScrollView>

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
        </Modal>

        <Button
          icon={<Icon name="plus-circle" size={20} color="white" />}
          title=" Elegir Tipo"
          style={styles.floatingButton}
          onPress={() => this.setModalVisible(true)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  section: {
    flex: 1,
    marginTop: 52,
    backgroundColor: "white",
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#fff"
  },

  floatingButton: {
    width: 160,
    height: 60
  },

  lineStyle: {
    height: 1,
    borderWidth: 0.3,
    borderColor: "grey",
    margin: 4,
    marginHorizontal: 24
  }
});
