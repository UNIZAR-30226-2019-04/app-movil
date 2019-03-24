import React, { Component } from "react";
import { View, ScrollView, Image } from "react-native";
import { Avatar, Tooltip, Text } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import EditProfileModal from "../components/EditProfileModal";
import { Picker, Divider, Dimensions } from "react-native";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";

import { RkText, RkStyleSheet, RkGallery } from "react-native-ui-kitten";
import { Rating, AirbnbRating, Button } from "react-native-elements";
import ModalDropdown from "react-native-modal-dropdown";

import TabsExample from "../components/Tabs/TabsExample";

let _this = null;

export default class Profile extends Component {
  componentDidMount() {
    _this = this;
  }

  static navigationOptions = ({ navigation }) => {
    return {
      // Your custom header

      headerRight: (
        <View
          style={{
            flex: 1,
            marginLeft: 10,
            flexDirection: "row",
            marginRight: 10
          }}
        >
          <EditProfileModal />

          <ModalDropdown
            options={["Log out", "option 2"]}
            dropdownStyle={{ marginTop: -10, height: 100 }}
            renderRow={(a, b, c) => _this._renderRow(a, b, c)}
          >
            <Icon
              style={{ marginTop: 6, marginHorizontal: 5 }}
              name="ellipsis-v"
              size={35}
              color="white"
            />
          </ModalDropdown>
        </View>
      )
    };
  };

  _renderRow(rowData, rowID, highlighted) {
    console.log(rowData, rowID, highlighted);
    return (
      <Button
        title={rowData}
        onPress={() => this.props.navigation.navigate("Welcome")}
        style={{ color: "black", width: 100 }}
      />
    );
  }
  state = {
    data: undefined,
    index: 0,
    routes: [
      { key: "first", title: "En Venta" },
      { key: "second", title: "Favoritos" },
      { key: "third", title: "Reviews" }
    ]
  };

  ratingCompleted(rating) {
    console.log("Rating is: " + rating);
  }

  constructor(props) {
    super(props);

    const id = this.props.navigation.getParam("id", 1);
    this.state.data = {
      firstName: "Alberto",
      lastName: "Garcia",
      photo:
        "http://cf.ltkcdn.net/socialnetworking/images/std/168796-281x281-girl-swear-icon.png",
      postCount: 7,
      followingCount: 111,
      followersCount: 99,
      images:
        "http://cf.ltkcdn.net/socialnetworking/images/std/168796-281x281-girl-swear-icon.png"
    };
  }
  formatNumber(num) {
    return num > 999 ? `${(num / 1000).toFixed(1)}k` : num;
  }

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

  _renderLabel = scene => {
    const label = scene.label;
    return <Text style={{ color: "black" }}>{label}</Text>;
  };

  render = () => (
    <ScrollView style={styles.root}>
      <View style={[styles.header, styles.bordered]}>
        <Avatar
          rounded
          onPress={() => console.log("Works!")}
          size="large"
          containerStyle={{ marginHorizontal: 10 }}
          source={{
            uri:
              "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"
          }}
        />
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            display: "flex"
          }}
        >
          <RkText style={{ fontSize: 20, fontWeight: "bold" }}>{`${
            this.state.data.firstName
          } ${this.state.data.lastName}`}</RkText>

          <AirbnbRating
            count={5}
            style={{ marginTop: -10 }}
            //reviews={["Terrible", "Bad", "OK", "Good", "Very Good"]}
            showRating={false}
            defaultRating={3}
            size={12}
            readonly
          />
        </View>
      </View>
      <TabView
        style={{ backgroundColor: "white", color: "red", fontWeight: "bold" }}
        navigationState={this.state}
        renderScene={SceneMap({
          first: TabsExample,
          second: TabsExample,
          third: TabsExample
        })}
        renderTabBar={this._renderTabBar}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get("window").width }}
      />
      {/*       <View style={styles.buttons}>
        <Button buttonStyle={styles.button} title="FOLLOW" type="outline" />
        <View style={styles.separator} />
        <Button buttonStyle={styles.button} title="MESSAGE" type="outline" />
      </View> */}
    </ScrollView>
  );
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
