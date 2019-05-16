import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Share
} from "react-native";

import { Video } from "expo";

import { AsyncStorage, ScrollView } from "react-native";
import { Rating, AirbnbRating, Button, Avatar } from "react-native-elements";
//import Icon from "react-native-vector-icons/FontAwesome";
import ModalDropdown from "react-native-modal-dropdown";
import Icon from "react-native-animated-icons";
import MapModal from "../components/mapModal";
import ComprarModal from "../components/ComprarModal";

import Carousel from "react-native-banner-carousel";
import axios from "axios";
import { API_BASE, API_KEY } from "../config";

const width = Dimensions.get("window").width;
let _this = null;

const BannerWidth = Dimensions.get("window").width;
const BannerHeight = 260;

export default class ProductDetails extends Component {
  state = {
    search: "",
    modalVisible: null,
    product: {},
    titulo: "",
    precioBase: 0,
    descripcion: "",
    fecha: "",
    multimedia: [],
    tipo: "",
    room: 1,
    user: "unzurdo@gmail.com",
    receiver: "alberto@gmail.com",
    token: "",
    isLiked: false,
    mapRegion: null,
    address: ""
  };
  onPressHeart = async product => {
    console.log("onPressHeart", product);
    this.setState({ isLiked: !this.state.isLiked });
    let token, user;
    try {
      user = await AsyncStorage.getItem("user");
      token = await AsyncStorage.getItem("token");
      console.log("User", user, token);
    } catch (error) {
      console.log(error);
    }
    user = "8e4de80f-d9bf-411c-a696-58e3481a1b36";
    token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NTc1ODg1NTEsInN1YiI6MTksImV4cCI6MTU1NzY3NDk1Nn0.rE3VWsRoamkEMPSM48kfnj1c5AfH572v2QjQzpoHxIA";

    let URL = `${API_BASE}/deseados/${user}`;
    if (!this.state.isLiked) {
      URL = `${API_BASE}/deseados/remove${user}`;
    }
    axios
      .post(
        URL,
        {
          producto_id: product
        },
        {}
      )
      .then(resp => {
        console.log(resp);
      })
      .catch(err => {
        console.log(err);
      });
  };

  _onShare() {
    try {
      const result = Share.share({
        message:
          "Telocam | Mira lo que he encontrado en Telocam!" +
          this.state.product.titulo
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  }

  _isLiked = () => {
    return this.state.isLiked;
  };

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
          <View style={{ marginRight: 15 }}>
            <TouchableOpacity onPress={() => _this._onShare()}>
              <Icon
                style={{ marginTop: 6, marginHorizontal: 5 }}
                name="share-variant"
                size={32}
                color="white"
              />
            </TouchableOpacity>
          </View>

          <ModalDropdown
            options={["Reportar anuncio"]}
            dropdownStyle={{ marginTop: -10, height: 40 }}
            renderRow={(a, b, c) => _this._renderRow(a, b, c)}
          >
            <Icon
              style={{ marginTop: 6, marginHorizontal: 5 }}
              name="ellipsis-v"
              iconFamily="FontAwesome"
              size={35}
              color="white"
            />
          </ModalDropdown>
        </View>
      )
    };
  };

  _method = () => {
    this.props.navigation.navigate("Chat", { seller: this.state.ussuario });
  };

  getAddressFromCoordinates(lat, long) {
    console.log(`latlng=${lat},${long}`);

    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${API_KEY}`,
        {},
        {}
      )
      .then(resp => {
        let address = resp.data.results[0].formatted_address;
        console.log("address", address);
        this.setState({ address });
      })
      .catch(err => {
        console.log(err);
      });
  }

  _renderRow(rowData, rowID, highlighted) {
    console.log(rowData, rowID, highlighted);
    return (
      <Button
        title={rowData}
        type="clear"
        //onPress={() => this.props.navigation.navigate("Welcome")}
        style={{ color: "black", width: 200 }}
      />
    );
  }
  componentDidMount = () => {
    _this = this;

    const { setParams } = this.props.navigation;
    const { state } = this.props.navigation;

    this.fetchProduct(state.params.product);
  };

  fetchProduct = async id => {
    const URL = `${API_BASE}/producto/${id}`;
    console.log(URL);

    const res = await axios.get(URL, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    const producto = res.data;
    console.log("Response producto", producto, id);
    this.setState({ product: producto });
    this.setState(producto);

    this.setState({ isLiked: producto.deseado });

    this.setState({
      mapRegion: {
        latitude: producto.latitud,
        longitude: producto.longitud,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    });

    this.getAddressFromCoordinates(producto.latitud, producto.longitud);
    console.log(producto);
  };

  renderPage(image, index) {
    return (
      <View key={index}>
        {!image.tipo ? (
          <Image
            style={{
              resizeMode: "cover",
              width: BannerWidth,
              height: BannerHeight,
              borderRadius: 12
            }}
            source={{ uri: image.path }}
          />
        ) : (
          []
        )}
        {image.tipo ? (
          <Video
            source={{
              uri: image.path
            }}
            rate={1.0}
            volume={1.0}
            isMuted={true}
            resizeMode="cover"
            shouldPlay
            isLooping
            style={{ width: BannerWidth, height: BannerHeight }}
          />
        ) : (
          []
        )}
      </View>
    );
  }
  render() {
    console.log("render", this.state);
    const width = Dimensions.get("window").width;
    let red = "rgba(245,60,60,0.8)";
    let light = "rgba(255,255,255,0.5)";

    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Carousel
              //autoplay
              //autoplayTimeout={5000}
              //loop
              index={0}
              pageSize={BannerWidth}
            >
              {this.state.multimedia !== undefined
                ? this.state.multimedia.map((image, index) =>
                    this.renderPage(image, index)
                  )
                : []}
            </Carousel>
          </View>
          <View style={{ flex: 2 }}>
            <View style={styles.lineStyle} />

            <View
              style={{
                marginHorizontal: 12,
                flex: 1,
                flexDirection: "row"
              }}
            >
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: "500",
                  paddingHorizontal: 10
                }}
              >
                {this.state.precioBase}€
              </Text>

              <TouchableOpacity
                style={{
                  height: 50,
                  width: 50
                }}
                onPress={() => this.onPressHeart(this.state.product.id)}
              >
                <Icon
                  style={{ marginHorizontal: 5 }}
                  name={this.state.isLiked ? "heart" : "heart-outline"}
                  isActive={true}
                  size={40}
                  color="grey"
                  colorInputRange={[0, 0.56, 1]}
                  colorOutputRange={[
                    "grey",
                    "grey",
                    this.state.isLiked ? red : "grey"
                  ]}
                />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 10 }}>
              <View style={{ marginBottom: 20, marginHorizontal: 10 }}>
                <Text
                  style={{
                    marginTop: -10,
                    paddingHorizontal: 10,
                    fontSize: 28,
                    fontWeight: "300"
                  }}
                >
                  {this.state.titulo}
                </Text>
              </View>

              <View style={{ marginBottom: 5, marginHorizontal: 10 }}>
                <Text
                  //ellipsizeMode="tail"
                  //numberOfLines={6}
                  style={{
                    paddingHorizontal: 10,
                    marginBottom: 5
                  }}
                >
                  {this.state.descripcion}
                </Text>
              </View>

              <View style={styles.lineStyle} />

              <View
                style={{
                  marginBottom: 0,
                  marginHorizontal: 10,
                  flex: 1,
                  flexDirection: "row"
                }}
              >
                <Text
                  style={{
                    paddingHorizontal: 30,
                    color: "grey",
                    marginVertical: 10
                  }}
                >
                  Publicado el dia {this.state.fecha}
                </Text>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "flex-end"
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "flex-end"
                    }}
                  >
                    <Icon
                      style={{ marginHorizontal: 0 }}
                      name={"eye"}
                      size={1}
                      color="#d3dae5"
                      style={{ fontSize: 1 }}
                    />
                    <Text
                      style={{
                        paddingHorizontal: 1,
                        color: "grey",
                        marginVertical: 10
                      }}
                    >
                      {this.state.visualizaciones}
                    </Text>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "flex-end"
                    }}
                  >
                    <Icon
                      style={{ marginHorizontal: 0 }}
                      name={"heart"}
                      size={1}
                      color="#d3dae5"
                      style={{ fontSize: 1 }}
                    />
                    <Text
                      style={{
                        paddingHorizontal: 1,
                        color: "grey",
                        marginVertical: 10
                      }}
                    >
                      {this.state.visualizaciones}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.lineStyle} />

              <View style={{ marginVertical: 10 }}>
                <Text
                  style={{
                    marginHorizontal: 20,
                    marginBottom: 10,
                    fontSize: 16,
                    fontWeight: "500"
                  }}
                >
                  {this.state.address}
                </Text>

                <MapModal mapRegion={this.state.mapRegion} radious={1} />
              </View>

              <View style={styles.lineStyle} />

              <View
                style={{
                  marginVertical: 10,
                  marginHorizontal: 10,
                  flex: 1,
                  flexDirection: "row",
                  paddingBottom: 70
                }}
              >
                <Avatar
                  rounded
                  onPress={() =>
                    this.props.navigation.navigate("Perfil", {
                      id: this.state.product.vendedor
                    })
                  }
                  size="medium"
                  containerStyle={{ marginHorizontal: 10 }}
                  source={{
                    uri:
                      "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"
                  }}
                  showEditButton
                />

                <View
                  style={{
                    flex: 1,
                    flexDirection: "column",
                    alignItems: "flex-start",
                    display: "flex"
                  }}
                >
                  <Text
                    style={{
                      paddingHorizontal: 10,
                      marginTop: 5
                    }}
                  >
                    USUARIO
                  </Text>

                  <AirbnbRating
                    count={5}
                    style={{ paddingHorizontal: 10 }}
                    //reviews={["Terrible", "Bad", "OK", "Good", "Very Good"]}
                    showRating={false}
                    defaultRating={this.state.valoracion}
                    size={16}
                    isDisabled={true}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            //width: width,
            position: "absolute",
            flex: 1,
            flexDirection: "row",
            bottom: 0
          }}
        >
          <ComprarModal />

          <Button
            title="Chat"
            titleStyle={{ margin: 10, width: width / 2 - 20 }}
            onPress={() =>
              this.props.navigation.navigate("ChatTabNavigator", {
                room: this.state.room,
                user: this.state.vendedor,
                receiver: this.state.receiver,
                token: this.state.token
              })
            }
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10
  },
  button: {
    marginHorizontal: 2,
    width: width / 2 - 13,
    height: 42,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#fff"
  },
  lineStyle: {
    borderWidth: 1,
    borderColor: "#eeee",
    margin: 4
  }
});
