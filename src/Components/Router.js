import { createStackNavigator, createAppContainer } from 'react-navigation';

import EntryScreen from './EntryScreen';
import HomeScreen from './HomeScreen';
import UserHome from './User/Home';
import LoginScreen from './LoginScreen';
import Roadmap from './Roadmap';
import submitProb from './submitProb';
import SignupScreen from './SignupScreen';
import MPSignupScreen from './MPSignupScreen';

const AppNavigator = createStackNavigator({
  EntryScreen: { screen: EntryScreen },
  HomeScreen: { screen: HomeScreen },
  UserHome: { screen: UserHome },
  LoginScreen: { screen: LoginScreen },
  Roadmap: { screen: Roadmap },
  submitProb: { screen: submitProb },
  SignupScreen: { screen: SignupScreen },
  MPSignupScreen: { screen: MPSignupScreen },
});

export default createAppContainer(AppNavigator);
