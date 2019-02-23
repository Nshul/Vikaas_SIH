import React, { Component } from 'react';
import { Text, View } from 'react-native';
import stringsLang from '../Languages';

export default class HomeScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View>
        <Text>{stringsLang.homescreen.test}</Text>
      </View>
    );
  }
}
