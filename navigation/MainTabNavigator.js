import React, { Component } from "react";
import { View, Text, StyleSheet, Button, Field } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import { SearchBar } from "react-native-elements";
import WelcomeScreen from "../screens/WelcomeScreen";
import DashboardScreen from "../screens/DashboardScreen";
import Feed from "../screens/Feed";
import Settings from "../screens/Settings";
import Profile from "../screens/Profile";
import Chat from "../screens/Chat";
import Conversaciones from "../screens/Conversaciones";

import {
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator,
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import { Constants } from "expo";

import SimpleForm from "../components/SimpleForm.js";

const DashboardStackNavigator = createStackNavigator({
  DashboardTabNavigator: {
    screen: Feed,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Icon
            style={{ paddingLeft: 10 }}
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            size={30}
          />
        ),
        headerRight: (
          <Icon
            style={{ paddingRight: 10 }}
            onPress={() => navigation.openDrawer()}
            name="md-settings"
            size={30}
            onPress={() => navigation.navigate("Settings")}
          />
        ),
        headerTitle: "Wallapop"
      };
    }
  },
  Settings: { screen: Settings }
});

const ProfileStackNavigator = createStackNavigator({
  ProfileTabNavigator: {
    screen: Profile,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Button
            title={" Back"}
            onPress={() => navigation.navigate("Dashboard")}
          />
        )
      };
    }
  }
});

const ChatStackNavigator = createStackNavigator({
  ConversacionesTabNavigator: {
    screen: Conversaciones,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Button
            title={" Back"}
            onPress={() => navigation.navigate("Dashboard")}
          />
        ),
        headerTitle: "Conversaciones"
      };
    }
  },
  ChatTabNavigator: {
    screen: Chat,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Button
            title={" Back"}
            onPress={() => navigation.navigate("ConversacionesTabNavigator")}
          />
        )
      };
    }
  }
});

const AppDrawerNavigator = createDrawerNavigator({
  Dashboard: {
    screen: DashboardStackNavigator
  },
  Profile: {
    screen: ProfileStackNavigator
  },
  Chat: {
    screen: ChatStackNavigator
  }
});

const AppSwitchNavigator = createSwitchNavigator({
  Welcome: { screen: WelcomeScreen },
  Dashboard: { screen: AppDrawerNavigator }
});

export default (AppContainer = createAppContainer(AppSwitchNavigator));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    backgroundColor: "#e1e8ee"
  }
});
