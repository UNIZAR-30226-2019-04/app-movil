import React, { Component } from "react";
import {
  Modal,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  ScrollView,
  StyleSheet,
  Dimensions
} from "react-native";
import {
  RkText,
  RkTextInput,
  RkAvoidKeyboard,
  RkTheme,
  RkStyleSheet
} from "react-native-ui-kitten";
import { SearchBar } from "react-native-elements";
import { Platform, StatusBar, TouchableOpacity, WebView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button, Tooltip } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default class SubastarModal extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    modalVisible: false,
    status: "",
    precioAux: 0
  };

  handleResponse = data => {
    if (data.title == "success") {
      this.setState({ modalVisible: false, status: "Complete" });
    } else if (data.title == "cancel") {
      this.setState({ modalVisible: false, status: "Cancelled" });
    } else {
      return;
    }
  };

  onPrecioTruequeChanged = text => {
    this.setState({ precioAux: text });
  };
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  render = () => {
    return (
      <View style={{ marginTop: 0 }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => this.setModalVisible(false)}
        >
          <View style={{ marginTop: 200 }}>
            <Text />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Precio actual: </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Pujar: </Text>
            <TextInput
              style={styles.text_input}
              keyboardType="numeric"
              onChangeText={this.onPrecioTruequeChanged}
              value={this.state.precioAux}
            />
          </View>

          <View style={{ flex: 1, marginHorizontal: 30 }}>
            <Button
              title="Pujar"
              titleStyle={{
                marginHorizontal: 10,
                margin: 10
              }}
              onPress={() => this.setModalVisible(false)}
            />
          </View>

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
          title="Pujar"
          titleStyle={{
            margin: 10,
            width: width / 2 - 40
          }}
          buttonStyle={{
            backgroundColor: "mediumseagreen"
          }}
          onPress={() => this.setModalVisible(true)}
        />
      </View>
    );
  };
}

const styles = RkStyleSheet.create(theme => ({
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
  },
  root: {
    backgroundColor: theme.colors.screen.base
  },
  header: {
    backgroundColor: theme.colors.screen.neutral,
    paddingVertical: 25,
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },

  heading: {
    paddingBottom: 12.5
  },
  label: {
    color: "grey",
    marginRight: 10,
    marginVertical: 20
  },
  text_input: {
    height: 30,
    width: 300,
    borderColor: "white",
    borderWidth: 1
  },
  row: {
    flexDirection: "row",
    paddingHorizontal: 37.5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border.base,
    alignItems: "center"
  },
  row2: {
    flexDirection: "row",
    paddingHorizontal: 37.5,
    paddingTop: 17.5,

    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border.base,
    alignItems: "center"
  },
  button: {
    flex: 1,
    height: 100
  },
  container: {
    flex: 1,
    padding: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  textareaContainer: {
    height: 180,
    padding: 5,
    backgroundColor: "#F5FCFF"
  },
  textarea: {
    textAlignVertical: "top", // hack android
    height: 170,
    fontSize: 14,
    color: "#333"
  }
}));
