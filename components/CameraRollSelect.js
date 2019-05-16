import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  Image
} from "react-native";
import ImageBrowser from "./ImageBrowser";
import { ImagePicker, Permissions } from "expo";

export default class CameraRollSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageBrowserOpen: false,
      photos: []
    };
  }
  imageBrowserCallback = callback => {
    callback
      .then(photos => {
        console.log(photos);
        this.setState({
          imageBrowserOpen: false,
          photos
        });
        this.props.saveImages(photos);
      })
      .catch(e => console.log(e));
  };

  renderImage(item, i) {
    return (
      <Image
        style={{ height: 100, width: 100, marginHorizontal: 2 }}
        source={{ uri: item.uri }}
        key={i}
      />
    );
  }

  _pickImage = async () => {
    console.log("result", this.state.photos);

    const permissions = Permissions.CAMERA_ROLL;
    const { status } = await Permissions.askAsync(permissions);

    console.log(`[ pickFromCamera ] ${permissions} access: ${status}`);
    if (status !== "granted") {
      return;
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3]
      });

      console.log(result);

      if (!result.cancelled) {
        //alert(result.uri);
        this.setState({ photos: [...this.state.photos, result] });
        this.props.saveImages(this.state.photos);
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Seleccionar Imágenes"
          onPress={() => this._pickImage()}
        />

        <ScrollView
          style={{ flex: 1, flexDirection: "row" }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {this.state.photos.map((item, i) => this.renderImage(item, i))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
