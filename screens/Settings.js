import React, { Component } from "react";
import { View, StyleSheet, Field } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import { SearchBar } from "react-native-elements";
import { Slider, Card } from "react-native-elements";
import { Picker, Divider } from "react-native";
import {
  RkText,
  RkTextInput,
  RkAvoidKeyboard,
  RkTheme,
  RkStyleSheet
} from "react-native-ui-kitten";
import { Avatar, Button, Text, ButtonGroup } from "react-native-elements";
import { Constants, MapView } from "expo";

import MapModal from "../components/mapModal";
export default class Settings extends Component {
  constructor() {
    super();

    this.updateIndex = this.updateIndex.bind(this);
  }

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex });
  }

  static navigationOptions = ({ navigation }) => {
    return {
      // Your custom header

      headerRight: (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginRight: 10
          }}
        >
          <Button
            title="Apply filter"
            titleStyle={{ color: "white" }}
            color="white"
            type="outline"
          />
        </View>
      )
    };
  };

  user = {
    firstName: "Alberto",
    lastName: "Garcia",
    email: "alberto@gmail.com",
    country: "España",
    phone: "608014003",
    password: "password",
    newPassword: "new password",
    confirmPassword: "new password"
  };

  state = {
    firstName: this.user.firstName,
    lastName: this.user.lastName,
    email: this.user.email,
    country: this.user.country,
    phone: this.user.phone,
    password: this.user.password,
    newPassword: this.user.newPassword,
    confirmPassword: this.user.confirmPassword,
    value: 0,
    language: null,
    distancia: 0,
    selectedIndex: null
  };

  stepFunction() {
    if (this.state.value < 50) {
      return 1;
    } else if (this.state.value < 500) {
      return 10;
    } else {
      return 50;
    }
  }
  render() {
    const buttons = ["24h", "7d", "30d"];
    const { selectedIndex } = this.state;

    return (
      <View style={styles.section}>
        <View style={{ flexDirection: "column" }}>
          <RkText
            style={{ margin: 20, marginBottom: 30 }}
            rkType="header6 primary"
          >
            CATEGORIAS
          </RkText>

          <Picker
            mode="dropdown"
            selectedValue={this.state.language}
            style={{
              height: 50,
              width: 200,
              marginLeft: 20,
              marginTop: -30,
              marginBottom: 10
            }}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ language: itemValue })
            }
          >
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>
        </View>

        <View style={[styles.lineStyle, { marginBottom: 20 }]} />

        <View style={[styles.row, styles.heading]}>
          <RkText
            style={{ flex: 1, alignItems: "stretch" }}
            rkType="header6 primary"
          >
            PRECIO
          </RkText>
          <View
            style={{ flex: 2, alignItems: "stretch", justifyContent: "center" }}
          >
            <Slider
              value={this.state.value}
              onValueChange={value => this.setState({ value })}
              maximumValue={2000}
              step={this.stepFunction()}
              thumbTintColor="#01579B"
            />
            <Text>Precio hasta: {this.state.value} €</Text>
          </View>
        </View>
        <View style={styles.lineStyle} />

        <View style={[styles.row, styles.heading]}>
          <RkText style={{ marginTop: 10 }} rkType="header6 primary">
            LOCALIZACIÓN
          </RkText>
        </View>
        <View>
          <Text style={{ paddingHorizontal: 17.5, marginBottom: 10 }}>
            Pablo Neruda Nº11 3ºZ
          </Text>

          <MapModal />
        </View>

        <View
          style={{
            alignItems: "stretch",
            marginHorizontal: 30,
            justifyContent: "center"
          }}
        >
          <Slider
            value={this.state.distancia}
            onValueChange={distancia => this.setState({ distancia })}
            maximumValue={200}
            step={1}
            thumbTintColor="#01579B"
          />
          <Text>Distancia max: {this.state.distancia} km</Text>
        </View>

        <View style={styles.lineStyle} />

        <View style={[styles.row, styles.heading]}>
          <RkText style={{ marginTop: 10 }} rkType="header6 primary">
            FECHA PUBLCACIÖN
          </RkText>
        </View>

        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={{ height: 100 }}
        />
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
    backgroundColor: "#F5F5F5"
  },
  heading: {
    paddingBottom: 12.5
  },
  row: {
    flexDirection: "row",
    paddingHorizontal: 17.5,
    alignItems: "center"
  },
  button: {
    marginHorizontal: 16,
    marginBottom: 32
  },

  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: Constants.statusBarHeight,
    backgroundColor: "#F5F5F5"
  },

  picker: {
    width: 200,
    height: 44,
    backgroundColor: "#FFF0E0",
    borderColor: "red",
    borderBottomWidth: 2,
    flex: 90
  },

  lineStyle: {
    borderWidth: 0.2,
    borderColor: "black",
    margin: 4
  },

  pickerItem: {
    height: 44,
    color: "red"
  }
}));
