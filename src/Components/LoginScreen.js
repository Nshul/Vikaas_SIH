import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import stringsLang from '../Languages';
export default class LoginScreen extends Component {
    static navigationOptions = {
      header: null,
    };

    render() {
      return (
        <View>
          <Input placeholder="Phone Number" />
        </View>
      );
    }
}
