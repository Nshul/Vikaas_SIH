/*import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';

import { Header } from 'react-native-elements';

export default class LoginScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View>
        <Header
          centerComponent={{ text: 'Login Page', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
        />
        <Input placeholder="Enter Phone Number" />

        <Input placeholder="Enter OTP" />

        <Button title="Submit" />
      </View>
    );
  }
}

/*
    render() {
      return (
        <View>
          <Input placeholder="Phone Number" />
        </View>
      );
    }
}
*/

import { Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
} from 'react-native';

export default class SignUpView extends Component {
  constructor(props) {
    super(props);
    state = {
      phonenumber: '',
      otp: '',
    };
  }

  onClickListener = viewId => {
    Alert.alert('Alert', 'Button pressed ' + viewId);
  };

  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.headingText}>LOGIN</Text>
        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={{ uri: 'https://png.icons8.com/phone' }}
          />
          <TextInput
            style={styles.inputs}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            underlineColorAndroid="transparent"
            onChangeText={phoneNumber => this.setState({ phoneNumber })}
          />
        </View>

        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={{
              uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db',
            }}
          />
          <TextInput
            style={styles.inputs}
            placeholder="OTP"
            secureTextEntry={true}
            keyboardType="phone-pad"
            underlineColorAndroid="transparent"
            onChangeText={password => this.setState({ password })}
          />
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

