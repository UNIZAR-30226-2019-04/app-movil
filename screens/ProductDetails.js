import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Share,
  RefreshControl
} from "react-native";

import { Video } from "expo";

import { AsyncStorage, ScrollView } from "react-native";
import { Rating, AirbnbRating, Button, Avatar } from "react-native-elements";
//import Icon from "react-native-vector-icons/FontAwesome";
import ModalDropdown from "react-native-modal-dropdown";
import Icon from "react-native-animated-icons";
import MapModal from "../components/mapModal";
import ComprarModal from "../components/ComprarModal";
import SubastarModal from "../components/SubastarModal";
import ReportModal from "../components/ReportModal";
import ReviewModal from "../components/ReviewModal";
import TimerCountdown from "../components/TimerCountdown";
import Carousel from "react-native-banner-carousel";
import axios from "axios";
import { API_BASE, API_KEY, DEBUG, USER, TOKEN } from "../config";

const width = Dimensions.get("window").width;
let _this = null;

const BannerWidth = Dimensions.get("window").width;
const BannerHeight = 260;

export default class ProductDetails extends Component {
  state = {
    search: "",
    modalVisible: false,
    product: null,
    titulo: "",
    precioBase: 0,
    descripcion: "",
    fecha: "",
    multimedia: [],
    tipo: "",
    room: 1,
    user: "",
    token: "",
    receiver: "",
    isLiked: null,
    mapRegion: null,
    address: "",
    valoracion: 3,
    imagen_perfil: "",
    nick: "",
    vendedor: "",
    followed: false,
    timer: null,
    fechaexpiracion: "",
    isRefreshing: false,
    visualizaciones: 0,
    likes: 0
  };

  onRefresh() {
    console.log("onRefresh");
    const user = this.state.user;

    this.setState({ isRefreshing: true }); // true isRefreshing flag for enable pull to refresh indicator

    const { state } = this.props.navigation;
    //console.log("STATE PARAMS: ", state);
    this.setState({ isLiked: state.params.deseado });
    this.fetchProduct(state.params.product);

    this.setState({ isRefreshing: false }); // true isRefreshing flag for enable pull to refresh indicator
  }

  onPressHeart = async product => {
    //console.log("onPressHeart", product);

    let user = this.state.user;
    let token = this.state.token;
    let URL = `${API_BASE}/deseados/${user}`;
    if (this.state.isLiked) {
      console.log("isLiked", user, token);

      URL = `${API_BASE}/deseados/${user}/remove`;
    } else {
      console.log("DisLiked", user, token);
    }
    this.setState({ isLiked: !this.state.isLiked });

    //console.log(URL);
    axios
      .post(
        URL,
        {
          producto_id: product
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token
          }
        }
      )
      .then(resp => {
        console.log(resp.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  _reportUser() {
    console.log("REPORT");
    this.setState({ modalVisible: true });
  }

  _onShare() {
    try {
      const result = Share.share({
        message:
          "Telocam | Mira lo que he encontrado en Telocam!, " +
          this.state.product.titulo +
          " \n Descubre más aqui: https://telocam.com/#/ProductPage?idProd=" +
          this.state.product.id
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
    this.props.navigation.navigate("Chat", { seller: this.state.vendedor });
  };

  getAddressFromCoordinates(lat, long) {
    //console.log(`latlng=${lat},${long}`);

    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${API_KEY}`,
        {},
        {}
      )
      .then(resp => {
        let address = resp.data.results[0].formatted_address;
        //console.log("address", address);
        this.setState({ address });
      })
      .catch(err => {
        //console.log(err);
      });
  }

  _renderRow(rowData, rowID, highlighted) {
    //console.log(rowData, rowID, highlighted);
    return (
      /*       <Button
        title={rowData}
        type="clear"
        onPress={() => _this._reportUser()}
        style={{ color: "black", width: 200 }}
      /> */
      <ReportModal user={this.state.user} />
    );
  }
  componentDidMount = async () => {
    _this = this;

    const { setParams } = this.props.navigation;
    const { state } = this.props.navigation;
    //console.log("STATE PARAMS: ", state);
    this.setState({ isLiked: state.params.deseado });
    this.fetchProduct(state.params.product);
  };

  fetchUser = async user => {
    const URL = `${API_BASE}/user/${user}`;
    //console.log("fetchUser", URL);
    const res = await axios.get(URL, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    const perfil = res.data;
    //console.log("Response Seller Perfil", perfil);
    this.setState({
      valoracion: perfil.valoracion,
      nick: perfil.nick,
      imagen_perfil: perfil.imagen_perfil
    });
    this.setState({ seller_profile: perfil });
  };

  fetchProduct = async id => {
    let token, user;
    try {
      user = await AsyncStorage.getItem("user");
      token = await AsyncStorage.getItem("token");
      //console.log("User", user, token);
    } catch (error) {
      //console.log(error);
    }
    if (DEBUG) {
      user = USER;
      token = TOKEN;
    }
    this.setState({ user, token });

    const URL = `${API_BASE}/producto/${id}`;
    //console.log(URL);

    const res = await axios.get(URL, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    const producto = res.data;
    if (producto.precioAux === null) {
      producto.precioAux = producto.precioBase;
    }
    this.fetchUser(producto.vendedor);

    console.log("Response producto", producto, id);
    this.setState({ product: producto });
    this.setState({ vendedor: producto.vendedor });
    this.setState(producto);

    //this.setState({ isLiked: producto.deseado });

    this.setState({
      mapRegion: {
        latitude: producto.latitud,
        longitude: producto.longitud,
        latitudeDelta: 5.0922,
        longitudeDelta: 5.0421
      }
    });

    this.getAddressFromCoordinates(producto.latitud, producto.longitud);
    //console.log(producto);
  };

  followUser() {
    if (this.state.followed) {
      //console.log("UnfollowUser", this.state.vendedor);
      axios
        .post(
          `${API_BASE}/seguir/${this.state.user}/remove`,
          {
            seguido: this.state.vendedor
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: this.state.token
            }
          }
        )
        .then(res => {
          //console.log("Siguiendo usuario", this.state.nick, res.data);
          if (res.data.status === "success") {
            this.setState({ followed: false });
          }
        })
        .catch(err => console.log("Error following user", err));
    } else {
      //console.log("followUser", this.state.vendedor);

      axios
        .post(
          `${API_BASE}/seguir/${this.state.user}`,
          {
            seguido: this.state.vendedor
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: this.state.token
            }
          }
        )
        .then(res => {
          //console.log("Siguiendo usuario", this.state.nick, res.data);
          if (res.data.status === "success") {
            this.setState({ followed: true });
          }
        })
        .catch(err => console.log("Error following user", err));
    }
  }

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
    //console.log("render", this.state);
    const width = Dimensions.get("window").width;
    let red = "rgba(245,60,60,0.8)";
    //console.log("TIPO");
    //console.log(this.state.tipo);
    //console.log("TRUEQUE");
    let trueque = this.state.tipo == "trueque";
    //console.log(trueque);
    return (
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this.onRefresh.bind(this)}
          />
        }
      >
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
                {this.state.precioAux}€
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
                {this.state.tipo !== "subasta" ? (
                  <Text
                    style={{
                      paddingHorizontal: 30,
                      color: "grey",
                      marginVertical: 10
                    }}
                  >
                    Publicado el dia {this.state.fecha}
                  </Text>
                ) : this.state.fechaexpiracion !== null ? (
                  <View style={{ flex: 2 }}>
                    <Text
                    style={{
                      paddingHorizontal: 30,
                      color: "grey",
                      marginVertical: 10
                    }}
                    
                  >
                    Fecha de finalización: {this.state.fechaexpiracion}
                  </Text>
                  </View>
                ) : (
                  []
                )}
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
                      {this.state.likes}
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

                <MapModal
                  mapRegion={this.state.mapRegion}
                  radious={1}
                  product={this.state.product}
                />
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
                    this.props.navigation.navigate("ProfileTabNavigator", {
                      vendedor: this.state.vendedor
                    })
                  }
                  size="medium"
                  containerStyle={{ marginHorizontal: 10 }}
                  source={{
                    uri: this.state.imagen_perfil
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
                  <View style={{ flex: 1, flexDirection: "row" }}>
                    <View style={{ width: "50%" }}>
                      <Text
                        style={{
                          paddingHorizontal: 10,
                          marginTop: 5,
                          fontSize: 20,
                          fontWeight: "bold"
                        }}
                      >
                        {this.state.nick}
                      </Text>

                      <AirbnbRating
                        count={5}
                        style={{ paddingHorizontal: 10 }}
                        showRating={false}
                        defaultRating={this.state.valoracion}
                        size={16}
                        isDisabled={true}
                      />
                    </View>
                    <View style={{ width: "30%" }}>
                      {this.state.followed ? (
                        <Button
                          title="Dejar de seguir"
                          style={{ width: 150 }}
                          backgroundColor={"grey"}
                          onPress={() => this.followUser()}
                        />
                      ) : (
                        <Button
                          title="Seguir"
                          backgroundColor={"#blue"}
                          onPress={() => this.followUser()}
                        />
                      )}
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/*         <View
          style={{
            //width: width,
            height: 100,
            position: "relative",
            flex: 1,
            flexDirection: "row",
            left: 110,
            bottom: 20
          }}
        >
          <ReviewModal
            user={this.state.user}
            receiver={this.state.receiver}
            token={this.state.token}
          />
        </View> */}

        <View
          style={{
            //width: width,
            position: "absolute",
            flex: 1,
            flexDirection: "row",
            bottom: 0
          }}
        >
          {this.state.tipo === "normal" ? (
            <ComprarModal user={this.state.user} product={this.state.product} />
          ) : this.state.tipo === "subasta" ? (
            <SubastarModal
              product={this.state.product}
              user={this.state.user}
              token={this.state.token}
            />
          ) : (
            []
          )}

          {this.state.tipo !== "trueque" ? (
            <Button
              title="Chat"
              titleStyle={{ margin: 10, width: width / 2 - 20, marginTop: 10 }}
              onPress={() => {
                if (this.state.user === this.state.vendedor) return;
                this.props.navigation.navigate("ChatTabNavigator", {
                  room: this.state.room,
                  user: this.state.vendedor,
                  receiver: this.state.product.vendedor,
                  token: this.state.token
                });
              }}
            />
          ) : (
            <Button
              title="Chat"
              titleStyle={{ margin: 10, width: width, marginTop: 10 }}
              onPress={() => {
                if (this.state.user === this.state.vendedor) return;

                this.props.navigation.navigate("ChatTabNavigator", {
                  room: this.state.room,
                  user: this.state.vendedor,
                  receiver: this.state.product.vendedor,
                  token: this.state.token
                });
              }}
            />
          )}
        </View>

        {/*         <View
          style={{
            //width: width,
            position: "absolute",
            flex: 1,
            flexDirection: "row",
            bottom: 0
          }}
        >
          <ComprarModal trueque={trueque} />

          <Button
            title="Chat"
            titleStyle={{ margin: 10, width: width / 2 - 20 }}
            onPress={() =>
              this.props.navigation.navigate("ChatTabNavigator", {
                room: this.state.room,
                user: this.state.vendedor,
                receiver: this.state.product.vendedor,
                token: this.state.token
              })
            }
          />
        </View> */}
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
  },
  reportButton: {
    marginVertical: 30,
    marginHorizontal: width / 2 - 50,
    width: width / 2 - 13,
    height: 30
  }
});
