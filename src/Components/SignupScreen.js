import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Picker,
  TouchableHighlight,
  Image,
  Alert,
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

import axios from 'axios';

import { submitForm } from '../config.json';

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
  dropdownContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#ffffff',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
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

export default class SignUpView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      state: '',
      city: '',
      constituency: '',
    };
  }

  onClickListener = () => {
    axios
      .post(submitForm, this.state)
      .then(res => {
        // console.log(`Received axios response ${JSON.stringify(res)}`);
        if (res.data === 'user already exists') {
          Alert.alert('User Already Exists');
          this.setState({
            name: '',
            phone: '',
            address: '',
            state: '',
            city: '',
            constituency: '',
          });
        } else {
          Alert.alert('User Created. Please Login To Continue');
          this.props.navigation.dispatch(
            StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'LoginScreen' }),
              ],
            })
          );
        }
      })
      .catch(err => {
        console.log(`Error ${err}`);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headingText}>Sign Up</Text>
        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={{
              uri: 'https://png.icons8.com/male-user/ultraviolet/50/3498db',
            }}
          />
          <TextInput
            style={styles.inputs}
            value={this.state.name}
            placeholder="Name"
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            onChangeText={name => this.setState({ name })}
          />
        </View>

        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={{
              uri: 'https://png.icons8.com/phone/ultraviolet/50/3498db',
            }}
          />
          <TextInput
            style={styles.inputs}
            value={this.state.phone}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            underlineColorAndroid="transparent"
            onChangeText={phone => this.setState({ phone })}
          />
        </View>
        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={{
              uri: 'https://png.icons8.com/city/ultraviolet/50/3498db',
            }}
          />
          <TextInput
            style={styles.inputs}
            value={this.state.address}
            placeholder="Address"
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            onChangeText={address => this.setState({ address })}
          />
        </View>
        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={{
              uri: 'https://png.icons8.com/city/ultraviolet/50/3498db',
            }}
          />
          <Picker
            style={{ flex: 1 }}
            selectedValue={this.state.city}
            onValueChange={(itemValue, index) => {
              this.setState({ city: itemValue });
            }}
          >
            <Picker.Item label="Choose City" value="" />
            <Picker.Item label="Delhi" value="Delhi" />
            <Picker.Item label="Guwahati" value="Guwahati" />
            <Picker.Item label="Uttar Pradesh" value="Uttar Pradesh" />
          </Picker>
        </View>
        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={{
              uri: 'https://png.icons8.com/city/ultraviolet/50/3498db',
            }}
          />
          <Picker
            style={{ flex: 1 }}
            selectedValue={this.state.constituency}
            onValueChange={(itemValue, index) => {
              this.setState({ constituency: itemValue });
            }}
          >
            <Picker.Item label="Choose Constituency" value="" />
            <Picker.Item label="Delhi" value="Delhi" />
            <Picker.Item label="Guwahati" value="Guwahati" />
            <Picker.Item label="Uttar Pradesh" value="Uttar Pradesh" />
          </Picker>
        </View>
        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={{
              uri: 'https://png.icons8.com/city/ultraviolet/50/3498db',
            }}
          />
          <Picker
            style={{ flex: 1 }}
            selectedValue={this.state.state}
            onValueChange={(itemValue, index) => {
              this.setState({ state: itemValue });
            }}
          >
            <Picker.Item label="Choose State" value="" />
            <Picker.Item label="Delhi" value="Delhi" />
            <Picker.Item label="Guwahati" value="Guwahati" />
            <Picker.Item label="Uttar Pradesh" value="Uttar Pradesh" />
          </Picker>
        </View>

        <TouchableHighlight
          style={[styles.buttonContainer, styles.signupButton]}
          onPress={() => this.onClickListener()}
        >
          <Text style={styles.signUpText}>Sign up</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
