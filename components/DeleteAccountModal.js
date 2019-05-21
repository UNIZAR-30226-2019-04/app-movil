import React, { Component } from "react";
import { Modal, View, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button, Tooltip } from "react-native-elements";
import DeleteAccount from "./DeleteAccount";

import { RkStyleSheet } from "react-native-ui-kitten";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default class DeleteAccountModalClass extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    modalVisible: false,
    search: ""
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    const { search } = this.state;

    return (
      <View style={{ marginTop: 0 }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => this.setModalVisible(false)}
        >
          <DeleteAccount
            closeModal={() => this.setModalVisible(false)}
            user={this.props.user}
            token={this.props.token}
          />
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
        <View style={[styles.row, styles.section]}>
          <Button
            type="clear"
            containerStyle={{ height: 40 }}
            style={styles.button2}
            title="Borrar Cuenta"
            onPress={() => this.setModalVisible(true)}
          />
        </View>
      </View>
    );
  }
}

const styles = RkStyleSheet.create(theme => ({
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
  section: {
    marginVertical: 15
  },
  heading: {
    paddingBottom: 12.5
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border.base,
    alignItems: "center"
  },
  button: {
    flex: 1,
    height: 100
  },
  button2: {
    flex: 1,
    height: 50
  }
}));
