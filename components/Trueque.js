import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Share
} from "react-native";
import { connect } from "react-redux";
import { AsyncStorage, ScrollView } from "react-native";
import { Button, ButtonGroup, Header } from "react-native-elements";
import { addTag } from "../actions";
import Icon from "react-native-animated-icons";
import { RkStyleSheet } from "react-native-ui-kitten";
import axios from "axios";
import { API_BASE, API_KEY } from "../config";

const width = Dimensions.get("window").width;
class Trueque extends Component {
    constructor(props) {
        super(props);
        this.updateIndex = this.updateIndex.bind(this);
    }

    state = {
        user: "",
        token: "",
        selectedIndex: null
    };

    updateIndex = async selectedIndex => {
        this.setState({ selectedIndex });
        this.props.dispatch(addTag(modos[selectedIndex], "mode"));
      };

    static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam("receiver"),
        headerTitleStyle: { textAlign: "center", alignSelf: "center" },
        headerStyle: {
          backgroundColor: "white"
        }
    });

    _hacerTrueque(mi_nick) {
        let URL = `${API_BASE}/user/`;
        let id ="";
        console.log(mi_nick)
        axios
            .get(
                URL
              )
              .then(resp => { 
                resp.data.data.map(item => {
                    console.log(item.nick);
                    if(item.nick === mi_nick){
                        id = item.public_id;
                    }
                })
                console.log("PRODUCT_ID");
                console.log(this.props.producto);
                console.log("ID");
                console.log(id);
                URL = `${API_BASE}/producto/?=${this.props.producto}/venta/?=${id}`;
                
                axios
                .post(
                    URL
                )
                .then(res => { 
                    // console.log(resp);
                    console.log("Trueque realizado");
                })
                .catch(err => {
                    console.log(err);
                });
              })
              .catch(err => {
                console.log(err);
              });
      }

    render(){
        return (
            <View>
                <View style={styles.section}>
                    <Header
                        centerComponent={{ text: 'REPORTAR USUARIO', style: { color: '#fff', fontSize: 30, marginBottom:30  } }}
                        backgroundColor = "#1c7bc3"
                    />
                    <View style={styles.row}>
                        <Text style={styles.label}>Introduzca el usuario</Text>
                        <TextInput
                            style={styles.text_input}
                            onChangeText={(text) => this.setState({ user: text })}
                            value={this.state.user}
                        />
                    </View>
                </View>
                <View>
                    <Button
                        onPress = {() => this._hacerTrueque(this.state.user)}
                        title = "CONFIRMAR"
                        style={{marginLeft: 15, marginRight: 15}}
                    />
                </View>
            </View>
        );
    }
}export default connect()(Trueque);


const styles = RkStyleSheet.create(theme => ({
    root: {
      backgroundColor: theme.colors.screen.base
    },
    header: {
      backgroundColor: theme.colors.screen.neutral,
      alignItems: "center",
      justifyContent: "center",
      flex: 1
    },
    section: {
      marginVertical: 0
    },
    heading: {
      paddingBottom: 12.5
    },
    label: {
      color: "grey",
      marginRight: 10,
      marginVertical: 20
    },
    text_input: {
      height: 30,
      width: 300,
      borderColor: "white",
      borderWidth: 1
    },
    row: {
      flexDirection: "row",
      paddingHorizontal: 17.5,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: theme.colors.border.base,
      alignItems: "center"
    },
    row2: {
      flexDirection: "row",
      paddingHorizontal: 17.5,
      paddingTop: 17.5,
  
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: theme.colors.border.base,
      alignItems: "center"
    },
    button: {
      flex: 1,
      height: 100,
      width: 80
    },
    container: {
      flex: 1,
      padding: 30,
      justifyContent: "center",
      alignItems: "center"
    },
    textareaContainer: {
      height: 180,
      padding: 5,
      backgroundColor: "#F5FCFF"
    },
    textarea: {
      textAlignVertical: "top", // hack android
      height: 170,
      fontSize: 14,
      color: "#333"
    }
  }));
  