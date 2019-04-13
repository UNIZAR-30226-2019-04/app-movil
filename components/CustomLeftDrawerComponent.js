import React, { Component } from "react";
import { View, StyleSheet, SafeArea, ScrollView } from "react-native";
import { Avatar, Tooltip, Text } from "react-native-elements";

import { DrawerItems } from "react-navigation";

export default class CustomLeftDrawerComponent extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            marginTop: 30,
            height: 100,
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
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
        </View>

        <ScrollView>
          <DrawerItems {...this.props} />
        </ScrollView>
      </View>
    );
  }
}
