import React, { Component } from "react";
import { View, ScrollView, Image } from "react-native";
import { Avatar } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import EditProfileModal from "../components/EditProfileModal";

import { RkText, RkStyleSheet, RkGallery } from "react-native-ui-kitten";

import { Button } from "react-native-elements";

export default class Profile extends Component {
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
          <Button
            icon={<Icon name="ellipsis-v" size={35} color="white" />}
            type="clear"
          />
        </View>
      )
    };
  };

  state = {
    data: undefined
  };

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
  render = () => (
    <ScrollView style={styles.root}>
      <View style={[styles.header, styles.bordered]}>
        <Avatar
          onPress={() => console.log("Works!")}
          size="large"
          containerStyle={{ flex: 1, marginLeft: 10 }}
          source={{
            uri:
              "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"
          }}
        />
        <RkText style={{ fontSize: 20, fontWeight: "bold", flex: 2 }}>{`${
          this.state.data.firstName
        } ${this.state.data.lastName}`}</RkText>
      </View>
      <View style={[styles.userInfo, styles.bordered]}>
        <View style={styles.section}>
          <RkText rkType="header3" style={styles.space}>
            {this.state.data.postCount}
          </RkText>
          <RkText rkType="secondary1 hintColor">Posts</RkText>
        </View>
        <View style={styles.section}>
          <RkText rkType="header3" style={styles.space}>
            {this.formatNumber(this.state.data.followersCount)}
          </RkText>
          <RkText rkType="secondary1 hintColor">Followers</RkText>
        </View>
        <View style={styles.section}>
          <RkText rkType="header3" style={styles.space}>
            {this.state.data.followingCount}
          </RkText>
          <RkText rkType="secondary1 hintColor">Following</RkText>
        </View>
      </View>
      <View style={styles.buttons}>
        <Button buttonStyle={styles.button} title="FOLLOW" type="outline" />
        <View style={styles.separator} />
        <Button buttonStyle={styles.button} title="MESSAGE" type="outline" />
      </View>
    </ScrollView>
  );
}

const styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base
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
    paddingVertical: 18
  },
  bordered: {
    borderBottomWidth: 1,
    borderColor: theme.colors.border.base
  },
  section: {
    flex: 1,
    alignItems: "center"
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
  }
}));
