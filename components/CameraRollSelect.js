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
        source={{ uri: item.file }}
        key={i}
      />
    );
  }
  render() {
    if (this.state.imageBrowserOpen) {
      return <ImageBrowser max={4} callback={this.imageBrowserCallback} />;
    }
    return (
      <View style={styles.container}>
        <Button
          title="Seleccionar Imágenes"
          onPress={() => this.setState({ imageBrowserOpen: true })}
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
