import React, { Component } from "react";
import { View, StyleSheet, Button, Field } from "react-native";
import WelcomeScreen from "../screens/WelcomeScreen";
import DashboardScreen from "../screens/DashboardScreen";
import Feed from "../screens/Feed";
import Settings from "../screens/Settings";
import Profile from "../screens/Profile";
import Chat from "../screens/Chat";
import Conversaciones from "../screens/Conversaciones";
import Icon from "react-native-vector-icons/FontAwesome";
import ProductDetails from "../screens/ProductDetails";
import CustomLeftDrawerComponent from "../components/CustomLeftDrawerComponent";
import SearchResults from "../screens/SearchResults";

import {
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator,
  createStackNavigator
} from "react-navigation";
import { Constants } from "expo";

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
  },

  ProductDetails: {
    screen: ProductDetails,
    navigationOptions: ({ navigation }) => {
      return {
        headerStyle: {
          backgroundColor: "#01579B"
        },
        headerLeft: (
          <Icon
            onPress={() => navigation.pop()}
            name="arrow-left"
            style={{ marginLeft: 10 }}
            size={30}
            color="white"
          />
        )
      };
    }
  },
  SearchResults: {
    screen: SearchResults,
    navigationOptions: ({ navigation }) => {
      return {
        headerStyle: {
          backgroundColor: "#01579B"
        },
        headerLeft: (
          <Icon
            onPress={() => navigation.pop()}
            name="arrow-left"
            style={{ marginLeft: 10 }}
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
      const { state, goBack } = navigation;
      const params = state.params || {};
      return {
        headerStyle: {
          backgroundColor: "#01579B"
        },
        headerTitleStyle: {
          color: "white"
        },
        headerLeft: (
          <Icon
            //onPress={() => navigation.navigate("ConversacionesTabNavigator")}
            onPress={() => navigation.pop()}
            //onPress={() => goBack(params.go_back_key)}
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
    Home: {
      screen: DashboardStackNavigator
    },
    Perfil: {
      screen: ProfileStackNavigator
    },
    Chat: {
      screen: ChatStackNavigator
    }
  },
  {
    initialRouteName: "Home",
    contentComponent: CustomLeftDrawerComponent
    //drawerWidth: 300
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
