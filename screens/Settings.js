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
import categories from "../assets/categorias.json";
import CategoryPickerModal from "../components/CategoryPickerModal";
import { AsyncStorage } from "react-native";

import MapModal from "../components/mapModal";

const dates = ["24h", "7d", "30d"];
export default class Settings extends Component {
  constructor() {
    super();

    this.updateIndex = this.updateIndex.bind(this);
  }

  updateIndex = async selectedIndex => {
    this.setState({ selectedIndex });
    this.addTag(dates[selectedIndex], "date");
  };

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
            style={{ marginTop: -5 }}
            color="white"
            type="outline"
            onPress={() => {
              navigation.navigate("SearchResults", { search: "" });
            }}
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
    selectedIndex: null,
    categoria: ""
  };

  componentDidMount = async () => {
    let tags = [];
    try {
      tags = await AsyncStorage.getItem("tags");
      if (tags != null) {
        tags = JSON.parse(tags);
        console.log("tags", tags);

        const price = tags.filter(tag => tag.type === "price");
        const category = tags.filter(tag => tag.type === "category");
        const date = tags.filter(tag => tag.type === "date");
        const distance = tags.filter(tag => tag.type === "distance");

        if (price.length > 0) {
          this.setState({ value: price[0].name });
        }
        if (category.length > 0) {
          this.setState({ category: category[0].name });
        }
        if (distance.length > 0) {
          this.setState({ distancia: distance[0].name });
        }
        if (date.length > 0) {
          for (let i = 0; i < dates.length; i++) {
            if (dates[i] === date[0]) {
              this.setState({ selectedIndex: i });
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  saveCategory = async category => {
    this.setState({ categoria: category });
    this.addTag(category, "category");
  };

  setDistancia = async distancia => {
    this.setState({ distancia });
    this.addTag(distancia, "distance");
  };

  updateValue = async value => {
    this.setState({ value });

    this.addTag(value, "price");
  };

  addTag = async (name, type) => {
    try {
      let tags = await AsyncStorage.getItem("tags");
      if (tags == null) {
        tags = [];
      }
      tags = JSON.parse(tags);
      if (type === "price" || type == "distance") {
        console.log("TAGS", tags);
        let index = 0;
        const match = tags.filter((tag, i) => {
          index = i;
          return tag.type === "price" || tag.type == "distance";
        });
        if (match.length > 0) {
          tags[index].name = name;
          const tag = tags[index];
          console.log("match", index, match, tag.name, name);
        } else {
          tags.push({ name: name, type: type });
        }
      } else {
        tags.push({ name: name, type: type });
      }
      await AsyncStorage.setItem("tags", JSON.stringify(tags));
      console.log("addTag", name, type);
    } catch (error) {
      console.log(error);
    }
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
        <View style={styles.row}>
          <RkText
            style={{ alignItems: "stretch", marginVertical: 10 }}
            rkType="header6 primary"
          >
            CATEGORÍA
          </RkText>
        </View>

        <View style={styles.row}>
          <CategoryPickerModal saveCategory={this.saveCategory} />
          <Text
            style={{
              marginHorizontal: 15,
              fontSize: 22,
              fontWeight: "500",
              marginTop: -20
            }}
          >
            {this.state.categoria}
          </Text>
        </View>

        <View style={[styles.lineStyle, { marginBottom: 0 }]} />

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
              onValueChange={async value => {
                this.updateValue(value);
              }}
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
          <Text
            style={{
              paddingHorizontal: 17.5,
              marginBottom: 15,
              fontSize: 16,
              fontWeight: "500"
            }}
          >
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
            onValueChange={async distancia => this.setDistancia(distancia)}
            maximumValue={200}
            step={1}
            thumbTintColor="#01579B"
          />
          <Text>Distancia max: {this.state.distancia} km</Text>
        </View>

        <View style={styles.lineStyle} />

        <View style={[styles.row, styles.heading]}>
          <RkText style={{ marginTop: 20 }} rkType="header6 primary">
            FECHA PUBLCACIÓN
          </RkText>
        </View>

        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={{ height: 100 }}
        />
        <View style={styles.padding} />
      </View>
    );
  }
}

const styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base
  },
  padding: {
    padding: 20,
    height: 200
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
