import React from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Modal, WebView } from "react-native";

import {
    RkText,
    RkTextInput,
    RkAvoidKeyboard,
    RkTheme,
    RkStyleSheet
  } from "react-native-ui-kitten";

const width = Dimensions.get("window").width;

export default class Comprar extends React.Component {
    state = {
        showModal: false,
        status: "Pending"
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
                        source={{ uri: "http://localhost:3000" }}
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