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
import axios from 'axios';
import { StackActions, NavigationActions } from 'react-navigation';
import { getOTP, verifyUserOTP } from '../../config.json';

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
  outputContainer: {
    flexDirection: 'column',
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
export default class UserLoginScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      otpRequested: false,
      phonenumber: null,
      otp: null,
    };
  }

  verifyOTP = () => {
    axios
      .post(verifyUserOTP, {
        phone: this.state.phoneNumber,
        otp: this.state.otp,
      })
      .then(res => {
        console.log(res);
        const { data } = res;
        if (data.success === false) {
          Alert.alert(data.message);
          return;
        }

        Alert.alert('User Logged In');
        this.props.navigation.dispatch(
          StackActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({
                routeName: 'Main',
                params: { user: data[0] },
              }),
            ],
          })
        );
      });
  };

  requestOTP = () => {
    axios.post(getOTP, { phone: this.state.phoneNumber }).then(res => {
      if (res.data === 'success') {
        this.setState({ otpRequested: true });
        return;
      }
      Alert.alert(JSON.stringify(res.data));
    });
  };

  renderOtp = () => {
    if (this.state.otpRequested) {
      return (
        <View style={styles.outputContainer}>
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
              secureTextEntry
              keyboardType="phone-pad"
              underlineColorAndroid="transparent"
              onChangeText={otp => this.setState({ otp })}
            />
          </View>
          <TouchableHighlight
            style={[styles.buttonContainer, styles.signupButton]}
            onPress={() => this.verifyOTP()}
          >
            <Text style={styles.signUpText}>Login In</Text>
          </TouchableHighlight>
        </View>
      );
    }
    return (
      <TouchableHighlight
        style={[styles.buttonContainer, styles.signupButton]}
        onPress={() => this.requestOTP()}
      >
        <Text style={styles.signUpText}>Generate OTP</Text>
      </TouchableHighlight>
    );
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
            onChangeText={phoneNumber => {
              console.log(`State now ${JSON.stringify(this.state)}`);
              this.setState({ phoneNumber });
            }}
          />
        </View>
        {this.renderOtp()}
      </View>
    );
  }
}
