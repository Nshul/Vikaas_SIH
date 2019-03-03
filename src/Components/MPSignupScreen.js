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
import axios from 'axios';
import { StackActions, NavigationActions } from 'react-navigation';

import { submitMPForm } from '../config.json';

export default class MPSignUpView extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      state: '',
      city: '',
      constituency: '',
      address: '',
      officeAddress: '',
    };
  }

  onClickListener = () => {
    axios
      .post(submitMPForm, this.state)
      .then(res => {
        // console.log(`Received axios response ${JSON.stringify(res)}`);
        if (res.data === 'user already exists') {
          Alert.alert('User Already Exists');
          this.props.navigation.dispatch(
            StackActions.reset({
              index: 0,
              key: null,
              actions: [NavigationActions.navigate({ routeName: 'MPLogin' })],
            })
          );
        } else {
          Alert.alert('User Created. Please Login To Continue');
          this.props.navigation.dispatch(
            StackActions.reset({
              index: 0,
              key: null,
              actions: [NavigationActions.navigate({ routeName: 'MPLogin' })],
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
            placeholder="Name"
            value={this.state.name}
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
            placeholder="phone Number"
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
          <TextInput
            style={styles.inputs}
            placeholder="Office Address"
            value={this.state.officeAddress}
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            onChangeText={officeAddress => this.setState({ officeAddress })}
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
            onValueChange={(itemValue, index) =>
              this.setState({ city: itemValue })
            }
          >
            <Picker.Item label="Select city" value="" />
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
            onValueChange={(itemValue, index) =>
              this.setState({ constituency: itemValue })
            }
          >
            <Picker.Item label="Select constituency" value="" />
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
            onValueChange={(itemValue, index) =>
              this.setState({ state: itemValue })
            }
          >
            <Picker.Item label="Select State" value="" />
            <Picker.Item label="Delhi" value="Delhi" />
            <Picker.Item label="Guwahati" value="Guwahati" />
            <Picker.Item label="Uttar Pradesh" value="Uttar Pradesh" />
          </Picker>
        </View>

        <TouchableHighlight
          style={[styles.buttonContainer, styles.signupButton]}
          onPress={() => this.onClickListener('sign_up')}
        >
          <Text style={styles.signUpText}>Sign up</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

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
