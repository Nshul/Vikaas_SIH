import React, { Component } from 'react';
import ImagePicker from 'react-native-image-picker';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Alert,
  Button,
} from 'react-native';
import axios from 'axios';
import { submitComplaint } from '../config.json';
import MyHeader from './Common/Header';

// More info on all the options is below in the API Reference... just some common use cases shown here
const options = {
  title: 'Upload Image',
  cancelButtonTitle: 'Cancel',
  takePhotoButtonTitle: 'Take Photo...',
  chooseFromLibraryButtonTitle: 'Choose from Library...',
  returnBase64Image: true,
  returnIsVertical: false,
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00b5ec',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center',
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  signupButton: {
    backgroundColor: '#FF4DFF',
  },
  signUpText: {
    color: 'white',
  },
  headingText: {
    color: 'white',
    fontSize: 30,
  },
});

export default class submitProb extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      latitude: null,
      longitude: null,
      error: null,
      imageSource: null,
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(`Position ${position}`);
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 50000, maximumAge: 1000 }
    );
  }

  chooseImage = () => {
    ImagePicker.showImagePicker(options, response => {
      console.log(`Inside submit prblem ${response.uri}`);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          imageSource: source,
          imageFile: 'data:image/png;base64,' + response.data,
          imageName: response.name,
          imageData: response.data,
        });
      }
    });
  };

  submitProblem = () => {
    const photo = 'data:image/jpeg;base64,' + this.state.imageData;
    axios
      .post(submitComplaint, {
        picture: this.state.imageData,
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        description: this.state.description,
        title: this.state.name,
      })
      .then(res => console.log(`success ${res}`))
      .catch(err => console.log(`erre ${err}`));
    // const form = new FormData();
    // form.append('picture', photo);
    // form.append('latitude', this.state.latitude);
    // form.append('longitude', this.state.longitude);
    // form.append('description', this.state.description);
    // form.append('title', this.state.name);
    // console.log(`formdata: ${JSON.stringify(form)}`);
    // axios({
    //   method: 'post',
    //   url: submitComplaint,
    //   body: form,
    //   config: {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   },
    // })
    //   .then(function(response) {
    //     //handle success
    //     console.log(response);
    //   })
    //   .catch(function(response) {
    //     //handle error
    //     console.log(response);
    //   });
  };

  render() {
    return (
      <View>
        <MyHeader navigation={this.props.navigation} title="Add Problem" />
        <View
          style={{
            flexGrow: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={{ uri: 'https://png.icons8.com/title' }}
            />
            <TextInput
              style={styles.inputs}
              value={this.state.name}
              placeholder="Problem name"
              keyboardType="email-address"
              underlineColorAndroid="transparent"
              onChangeText={name => this.setState({ name })}
            />
          </View>
          <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={{ uri: 'https://png.icons8.com/description' }}
            />
            <TextInput
              style={styles.inputs}
              value={this.state.description}
              placeholder="Problem description"
              keyboardType="email-address"
              underlineColorAndroid="transparent"
              onChangeText={description => this.setState({ description })}
            />
          </View>
          <Button title="choose Image" onPress={() => this.chooseImage()} />
          {this.state.imageSource != null && (
            <Image
              source={this.state.imageSource}
              style={{ width: 100, height: 100 }}
            />
          )}
          <Text>Latitude: {this.state.latitude}</Text>
          <Text>Longitude: {this.state.longitude}</Text>
          {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
          <Button title="Submit Problem" onPress={() => this.submitProblem()} />
        </View>
      </View>
    );
  }
}
