import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

import stringsLang from '../Languages/index';

export default class EntryScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = { currLang: 'en' };
  }

  settextLang(value) {
    stringsLang.setLanguage(value);
    this.setState({ currLang: value });
  }

  render() {
    return (
      <View>
        <Text>Current Language:</Text>
        <Text>{this.state.currLang}</Text>
        <Text>{stringsLang.entryscreen.test}</Text>
        <Button title="Hindi" onPress={() => this.settextLang('hi')} />
        <Button title="English" onPress={() => this.settextLang('en')} />
        <Button
          title="Login"
          onPress={() => this.props.navigation.navigate('HomeScreen')}
        />
        <Button
          title="User Home"
          onPress={() => this.props.navigation.navigate('UserHome')}
        />
      </View>
    );
  }
}
