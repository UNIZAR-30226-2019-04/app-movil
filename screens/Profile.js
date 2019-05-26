import React, { Component } from "react";
import { View, ScrollView, Image } from "react-native";
import { Avatar, Tooltip, Text } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import EditProfileModal from "../components/EditProfileModal";
import { Picker, Divider, Dimensions } from "react-native";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import { ScrollableTabView } from "@valdio/react-native-scrollable-tabview";

import { RkText, RkStyleSheet, RkGallery } from "react-native-ui-kitten";
import { Rating, AirbnbRating, Button } from "react-native-elements";
import ModalDropdown from "react-native-modal-dropdown";
import ReviewTab from "../components/Tabs/ReviewTab";
import Comprados from "../components/Tabs/Comprados";
import Venta from "../components/Tabs/Venta";
import Favoritos from "../components/Tabs/Favoritos";

import axios from "axios";
import { API_BASE, DEBUG, USER, TOKEN } from "../config";
import { AsyncStorage } from "react-native";
import UploadProductModal from "../components/UploadProductModal";

let _this = null;

export default class Profile extends Component {
  constructor(props) {
    super(props);
    let isUser = false;
  }

  componentDidMount() {
    _this = this;
    this.fetchData();
    const { params = {} } = this.props.navigation.state;

    if (params.vendedor !== undefined) {
      //console.log(" - DIFFERENT USER - ");
      this.setState({ isUser: false, user: params.vendedor });
    }
    //this.props.navigation.setParams({ seller: this.state.seller });
    if (DEBUG) {
      this.state.user = USER;
    }
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    //console.log(" state.params ", params);
    let isUser = true;
    if (params.vendedor !== undefined) {
      //console.log(" - DIFFERENT USER  navigationOptions- ");
      this.isUser = false;
      isUser = false;
    }

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
          {isUser ? (
            <EditProfileModal
              navigation={navigation}
              profile={() => {
                this._perfil;
              }}
            />
          ) : (
            []
          )}

          <ModalDropdown
            options={["Log out"]}
            dropdownStyle={{ marginTop: -10, height: 43 }}
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
    //console.log(rowData, rowID, highlighted);
    return (
      <Button
        title={rowData}
        onPress={() => this.props.navigation.navigate("Welcome")}
        style={{ color: "black", width: 100 }}
      />
    );
  }

  state = {
    isUser: true,
    user: null,
    descripcion: "",
    cajas_productos: [],
    radio_ubicacion: 0,
    valoraciones_recibidas: [],
    valoraciones_hechas: [],
    deseados: [],
    latitud: null,
    productos_comprados: 0,
    nick: "",
    longitud: null,
    productos_vendidos: 0,
    imagen_perfil: "http://34.90.77.95:10080/user/default.png",
    data: undefined,
    productos_comprados: 0,
    productos_vendidos: 0,
    nombre: "",
    apellidos: "",
    valoracion: "",
    profile: {},
    index: 0,
    routes: [
      { key: "first", title: "En Venta" },

      { key: "second", title: "Comprados" },
      { key: "third", title: "Favoritos" },

      { key: "fourth", title: "Reviews" }
    ]
  };

  ratingCompleted(rating) {
    //console.log("Rating is: " + rating);
  }

  _perfil() {
    return this.state.profile;
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

  componentDidUpdate = async () => {
    let my_user, token, user;
    const { state } = this.props.navigation;
    try {
      my_user = await AsyncStorage.getItem("user");
      token = await AsyncStorage.getItem("token");
    } catch (error) {
      //console.log(error);
    }
    if (DEBUG) {
      token = TOKEN;
      user = USER;
    }

    if (state.params === undefined) {
      user = my_user;
    } else {
      user = state.params.vendedor;
    }
    if (this.state.user !== user) {
      this.fetchData();
    }
  };
  fetchData = async () => {
    let my_user, token, user;
    const { state } = this.props.navigation;
    try {
      my_user = await AsyncStorage.getItem("user");
      token = await AsyncStorage.getItem("token");
    } catch (error) {
      //console.log(error);
    }
    if (DEBUG) {
      token = TOKEN;
      user = USER;
    }

    if (state.params === undefined) {
      user = my_user;
    } else {
      user = state.params.vendedor;
    }

    this.setState({ user });
    //console.log("Perfil", user);
    const URL = `${API_BASE}/user/${user}`;
    //console.log(URL, user, token);

    const res = await axios.get(URL, {
      headers: {
        "Content-Type": "application/json"
        //Authorization: token
      }
    });
    const perfil = res.data;
    //console.log("Response Perfil", perfil);
    this.setState(perfil);
    this.setState({ profile: perfil });
  };

  _renderLabel = scene => {
    const label = scene.label;
    return <Text style={{ color: "black" }}>{label}</Text>;
  };

  render = () => (
    <View>
      {/*       <View
        style={{
          position: "absolute",
          top: 50
        }}
      >
        <UploadProductModal />
      </View> */}

      <ScrollView style={styles.root}>
        <View style={[styles.header, styles.bordered]}>
          <Avatar
            rounded
            //onPress={() => //console.log("Works!")}
            size="large"
            containerStyle={{ marginHorizontal: 10 }}
            source={{
              uri: this.state.imagen_perfil
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
              this.state.nick
            }`}</RkText>

            <AirbnbRating
              count={5}
              style={{ marginTop: -10 }}
              //reviews={["Terrible", "Bad", "OK", "Good", "Very Good"]}
              showRating={false}
              defaultRating={this.state.valoracion}
              size={12}
              isDisabled={true}
            />

            <RkText style={{ fontSize: 12, fontWeight: "300" }}>
              {` Comprados: ${this.state.productos_comprados}   Vendidos: ${
                this.state.productos_vendidos
              }`}
            </RkText>

            <RkText style={{ fontSize: 12, fontWeight: "400", marginTop: 19 }}>
              {this.state.descripcion}
            </RkText>
          </View>
        </View>
        <TabView
          style={{ backgroundColor: "white", color: "red", fontWeight: "bold" }}
          navigationState={this.state}
          renderScene={SceneMap({
            first: () => (
              <Venta
                user={this.state.user}
                navigation={this.props.navigation}
              />
            ),
            second: () => (
              <Comprados
                user={this.state.user}
                navigation={this.props.navigation}
              />
            ),
            third: () => (
              <Favoritos
                user={this.state.user}
                navigation={this.props.navigation}
              />
            ),
            fourth: () => (
              <ReviewTab
                user={this.state.user}
                navigation={this.props.navigation}
              />
            )
          })}
          renderTabBar={this._renderTabBar}
          onIndexChange={index => this.setState({ index })}
          initialLayout={{ width: Dimensions.get("window").width }}
        />
      </ScrollView>
    </View>
  );
}

const styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: "#F5F5F5",
    marginBottom: 30
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
