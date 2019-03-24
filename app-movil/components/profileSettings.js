import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import {
  RkText,
  RkTextInput,
  RkAvoidKeyboard,
  RkTheme,
  RkStyleSheet
} from "react-native-ui-kitten";
import { Avatar, Button } from "react-native-elements";

export default class ProfileSettings extends React.Component {
  static navigationOptions = {
    title: "Profile Settings".toUpperCase()
  };

  user = {
    firstName: "Alberto",
    lastName: "Garcia",
    email: "alberto@gmail.com",
    country: "España",
    phone: "608014003",
    password: "password",
    newPassword: "new password",
    confirmPassword: "new password"
  };

  state = {
    firstName: this.user.firstName,
    lastName: this.user.lastName,
    email: this.user.email,
    country: this.user.country,
    phone: this.user.phone,
    password: this.user.password,
    newPassword: this.user.newPassword,
    confirmPassword: this.user.confirmPassword
  };

  onFirstNameInputChanged = text => {
    this.setState({ firstName: text });
  };

  onLastNameInputChanged = text => {
    this.setState({ lastName: text });
  };

  onEmailInputChanged = text => {
    this.setState({ email: text });
  };

  onCountryInputChanged = text => {
    this.setState({ country: text });
  };

  onPhoneInputChanged = text => {
    this.setState({ phone: text });
  };

  onPasswordInputChanged = text => {
    this.setState({ password: text });
  };

  onNewPasswordInputChanged = text => {
    this.setState({ newPassword: text });
  };

  onConfirmPasswordInputChanged = text => {
    this.setState({ confirmPassword: text });
  };

  render = () => (
    <ScrollView style={styles.root} style={{ marginTop: 0 }}>
      <RkAvoidKeyboard>
        <View style={styles.header}>
          <Avatar
            onPress={() => console.log("Works!")}
            size="large"
            containerStyle={{ flex: 1 }}
            source={{
              uri:
                "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"
            }}
            showEditButton
          />
        </View>
        <View style={styles.section}>
          <View style={[styles.row, styles.heading]}>
            <RkText rkType="header6 primary">INFO</RkText>
          </View>
          <View style={styles.row}>
            <RkTextInput
              label="First Name"
              value={this.state.firstName}
              rkType="right clear"
              onChangeText={this.onFirstNameInputChanged}
            />
          </View>
          <View style={styles.row}>
            <RkTextInput
              label="Last Name"
              value={this.state.lastName}
              onChangeText={this.onLastNameInputChanged}
              rkType="right clear"
            />
          </View>
          <View style={styles.row}>
            <RkTextInput
              label="Email"
              value={this.state.email}
              onChangeText={this.onEmailInputChanged}
              rkType="right clear"
            />
          </View>
          <View style={styles.row}>
            <RkTextInput
              label="Country"
              value={this.state.country}
              onChangeText={this.onCountryInputChanged}
              rkType="right clear"
            />
          </View>
          <View style={styles.row}>
            <RkTextInput
              label="Phone"
              value={this.state.phone}
              onChangeText={this.onPhoneInputChanged}
              rkType="right clear"
            />
          </View>
        </View>
        <View style={styles.section}>
          <View style={[styles.row, styles.heading]}>
            <RkText rkType="primary header6">CHANGE PASSWORD</RkText>
          </View>
          <View style={styles.row}>
            <RkTextInput
              label="Old Password"
              value={this.state.password}
              rkType="right clear"
              secureTextEntry
              onChangeText={this.onPasswordInputChanged}
            />
          </View>
          <View style={styles.row}>
            <RkTextInput
              label="New Password"
              value={this.state.newPassword}
              rkType="right clear"
              secureTextEntry
              onChangeText={this.onNewPasswordInputChanged}
            />
          </View>
          <View style={styles.row}>
            <RkTextInput
              label="Confirm Password"
              value={this.state.confirmPassword}
              rkType="right clear"
              secureTextEntry
              onChangeText={this.onConfirmPasswordInputChanged}
            />
          </View>
        </View>

        <Button
          type="clear"
          containerStyle={{ height: 100 }}
          style={styles.button}
          title="SAVE"
        />
      </RkAvoidKeyboard>
    </ScrollView>
  );
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
    borderColor: theme.colors.border.base,
    alignItems: "center"
  },
  button: {
    flex: 1,
    height: 100
  }
}));
