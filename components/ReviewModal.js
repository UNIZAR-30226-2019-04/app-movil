import React, { Component } from "react";
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  Alert,
  StyleSheet,
  Dimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button, Tooltip } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import MakeReview from "./MakeReview";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default class ReviewtModalClass extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    user: "",
    modalVisible: false,
    search: ""
  };

  updateSearch = search => {
    this.setState({ search });
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
          <MakeReview closeModal={() => this.setModalVisible(false)} user={this.props.user} receiver={this.props.receiver} token={this.props.token} />
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
        <View style={styles.buttonView}>
          <Button
            title="Valorar Usuario"
            style={styles.floatingButton}
            onPress={() => this.setModalVisible(true)}
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
  },

  floatingButton: {
    width: 160,
    height: 60
  },
  buttonView: {
    position: "relative",
    right: width / 2 - 80,
    backgroundColor: "crimson",
    borderRadius: 20,
  }
});
