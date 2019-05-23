import React from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Modal, WebView } from "react-native";

import {
    RkText,
    RkTextInput,
    RkAvoidKeyboard,
    RkTheme,
    RkStyleSheet
  } from "react-native-ui-kitten";
  import { API_BASE } from "../config";
  import axios from "axios";
const width = Dimensions.get("window").width;

export default class Comprar extends React.Component {
    state = {
        showModal: false,
        status: "Pending",
        id: "",
        link: ""
    };
    handleResponse = data => {
        if (data.title === "success") {
            this.setState({ showModal: false, status: "Complete" });
        } else if (data.title === "cancel") {
            this.setState({ showModal: false, status: "Cancelled" });
        } else {
            return;
        }
    };

    componentDidMount = async () =>{
        console.log("-----------PRODUCT-----------");
        console.log(this.props.product.id);
        console.log("-----------USER-----------");
        console.log(this.props.user);
        let URL = `${API_BASE}/paypal/compra_producto/${this.props.product}/${this.props.user}`;
        axios
            .post(URL, {}, {})
            .then(resp => {
                console.log("----------ID-----------");
                console.log(resp.id);
                console.log("----------LINK-----------");
                console.log(resp.link);
                this.setState({ id: resp.id });
                this.setState({ link: resp.link });
            })
            .catch(err => {
                console.log(err);
            });
    };

    render() {
        return (
            <View style={styles.root} style={{ marginTop: 0 }} >
            <RkAvoidKeyboard>
                <View style={styles.header}>
                <Modal
                    visible={this.state.showModal}
                    onRequestClose={() => this.setState({ showModal: false })}
                >
                    <WebView
                        source={{ uri: this.state.link }}
                        onNavigationStateChange={data =>
                            this.handleResponse(data)
                        }
                        injectedJavaScript={`document.f1.submit()`}
                    />
                </Modal>
                <View style={styles.section}>
                    <View style={[styles.heading]} style={{marginTop: 150, marginLeft: 25}}>
                        <TouchableOpacity style={styles.button}
                            onPress={() => this.setState({ showModal: true })}
                        >
                            <RkText rkType="header6 primary" style={{fontSize: 45, marginLeft: 5}}>Pay with Paypal</RkText>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.row} style={{marginLeft: width/3 - 15 , marginTop: 600}}>
                <RkText>Payment Status: {this.state.status}</RkText>
            </View>
            </RkAvoidKeyboard>
            </View>
        );
    }
}


const styles = RkStyleSheet.create(theme => ({
    root: {
      backgroundColor: theme.colors.screen.base
    },
    header: {
      backgroundColor: theme.colors.screen.neutral,
      paddingVertical: 25,
      alignItems: "center",
      justifyContent: "center",
      flex: 1
    },
    section: {
      marginVertical: 15
    },
    heading: {
      paddingBottom: 12.5
    },
    row: {
      flexDirection: "row",
      paddingHorizontal: 17.5,
      borderBottomWidth: StyleSheet.hairlineWidth,
      alignItems: "center"
    },
    button: { 
        backgroundColor: 'white', 
        width: 300, 
        height: 100,
        borderColor: 'black'
    }
  }));