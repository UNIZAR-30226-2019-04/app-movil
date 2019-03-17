import React, { Component } from "react";
import { View, Text, StyleSheet, Button, Field } from "react-native";
import { SearchBar } from "react-native-elements";
import WelcomeScreen from "../screens/WelcomeScreen";
import DashboardScreen from "../screens/DashboardScreen";
import Feed from "../screens/Feed";
import Settings from "../screens/Settings";
import Profile from "../screens/Profile";
import Chat from "../screens/Chat";
import Conversaciones from "../screens/Conversaciones";
import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";

import {
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator,
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import { Constants } from "expo";

import SimpleForm from "../components/SimpleForm.js";

/*
Pantalla principal
*/
const DashboardStackNavigator = createStackNavigator({
  DashboardTabNavigator: {
    screen: Feed,
    navigationOptions: ({ navigation }) => {
      return {
        headerStyle: {
          backgroundColor: "#01579B"
        },
        headerLeft: (
          <Icon
            style={{ paddingLeft: 10 }}
            onPress={() => navigation.openDrawer()}
            name="bars"
            size={30}
            color="white"
          />
        ),
        headerRight: (
          <Icon
            style={{ paddingRight: 10 }}
            onPress={() => navigation.openDrawer()}
            name="cog"
            size={30}
            color="white"
            onPress={() => navigation.navigate("Settings")}
          />
        )
        // headerTitle: "Wallapop"
      };
    }
  },
  Settings: {
    screen: Settings,
    navigationOptions: ({ navigation }) => {
      return {
        headerStyle: {
          backgroundColor: "#01579B"
        },
        headerLeft: (
          <Icon
            onPress={() => navigation.navigate("DashboardTabNavigator")}
            name="arrow-left"
            style={{ marginLeft: 10 }}
            size={30}
            color="white"
          />
        )
      };
    }
  }
});

/*
 Sección Perfil / editar
*/
const ProfileStackNavigator = createStackNavigator({
  ProfileTabNavigator: {
    screen: Profile,
    navigationOptions: ({ navigation }) => {
      return {
        headerStyle: {
          backgroundColor: "#01579B"
        },
        headerLeft: (
          <Icon
            onPress={() => navigation.navigate("DashboardTabNavigator")}
            name="arrow-left"
            style={{ marginLeft: 10 }}
            size={30}
            color="white"
          />
        )
      };
    }
  }
});

/*
Sección Chat y Conversaciones
*/
const ChatStackNavigator = createStackNavigator({
  ConversacionesTabNavigator: {
    screen: Conversaciones,
    navigationOptions: ({ navigation }) => {
      return {
        headerStyle: {
          backgroundColor: "#01579B",
          headerTitle: "white"
        },
        headerTitleStyle: {
          color: "white"
        },
        headerLeft: (
          <Icon
            onPress={() => navigation.navigate("DashboardTabNavigator")}
            name="arrow-left"
            style={{ marginLeft: 10 }}
            size={30}
            color="white"
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
        headerStyle: {
          backgroundColor: "#01579B"
        },
        headerTitleStyle: {
          color: "white"
        },
        headerLeft: (
          <Icon
            onPress={() => navigation.navigate("ConversacionesTabNavigator")}
            name="arrow-left"
            style={{ marginLeft: 10 }}
            size={30}
            color="white"
          />
        )
      };
    }
  }
});

/*
 Navegación lateral
*/
const AppDrawerNavigator = createDrawerNavigator(
  {
    Dashboard: {
      screen: DashboardStackNavigator
    },
    Profile: {
      screen: ProfileStackNavigator
    },
    Chat: {
      screen: ChatStackNavigator
    }
  },
  {
    initialRouteName: "Dashboard",
    //contentComponent: DrawerScreen,
    drawerWidth: 300
  }
);

/*
 Juntar LogIn y navegación de l aapp
*/
const AppSwitchNavigator = createSwitchNavigator({
  // LogIn & Registration
  //Welcome: { screen: WelcomeScreen },
  Dashboard: { screen: AppDrawerNavigator }
});

// Exportar componente navegación
export default (AppContainer = createAppContainer(AppSwitchNavigator));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5"
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
