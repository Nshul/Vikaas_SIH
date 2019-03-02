import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Picker,
  TouchableHighlight,
  Image,
  Alert,
  ImageBackground,
} from 'react-native';
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
      <View style={styles.container}>
        <Text>Current Language:</Text>
        <Text>{this.state.currLang}</Text>
        <Text>{stringsLang.entryscreen.test}</Text>
        <Button title="Hindi" onPress={() => this.settextLang('hi')} />
        <Button title="English" onPress={() => this.settextLang('en')} />
        <ImageBackground
          source={{
            uri:
              'https://media.tenor.com/images/a3b1633cec22aac827829421c7565174/tenor.gif/image.gif',
          }}
          style={{ width: '100%', height: '100%' }}
        >
          <Button
            title="Signup as user"
            onPress={() => this.props.navigation.navigate('SignupScreen')}
          />
          <Button
            title="Signup as an MP"
            onPress={() => this.props.navigation.navigate('MPSignupScreen')}
          />
          <Button
            title="Login as user"
            onPress={() => this.props.navigation.navigate('UserLoginScreen')}
          />
          <Button
            title="Login as an MP"
            onPress={() => this.props.navigation.navigate('MPLoginScreen')}
          />
          <Button
            title="User Home"
            onPress={() => this.props.navigation.navigate('UserHome')}
          />
          <Button
            title="MP Home"
            onPress={() => this.props.navigation.navigate('MPHome')}
          />
          <Button
            title="Roadmap"
            onPress={() => this.props.navigation.navigate('Roadmap')}
          />
          <Button
            title="submit problem"
            onPress={() => this.props.navigation.navigate('submitProb')}
          />
           <Button
            title="Done Problems"
            onPress={() => this.props.navigation.navigate('MPDoneProblems')}
          />
           <Button
            title="In Progress Problems"
            onPress={() => this.props.navigation.navigate('MPInProgressProblems')}
          />
        </ImageBackground>
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
