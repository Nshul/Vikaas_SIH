import { createStackNavigator, createAppContainer } from 'react-navigation';

import EntryScreen from './EntryScreen';
import HomeScreen from './HomeScreen';
import UserHome from './User/Home';
import UserLoginScreen from './User/LoginScreen';
import MPLoginScreen from './MP/LoginScreen';
import MPHome from './MP/Home';
import Roadmap from './Roadmap';
import submitProb from './submitProb';
import SignupScreen from './SignupScreen';
import MPSignupScreen from './MPSignupScreen';

const AppNavigator = createStackNavigator({
  EntryScreen: { screen: EntryScreen },
  HomeScreen: { screen: HomeScreen },
  UserHome: { screen: UserHome },
  UserLoginScreen: { screen: UserLoginScreen },
  MPHome: {screen: MPHome},
  MPLoginScreen: { screen: MPLoginScreen },
  Roadmap: { screen: Roadmap },
  submitProb: { screen: submitProb },
  SignupScreen: { screen: SignupScreen },
  MPSignupScreen: { screen: MPSignupScreen },
});

export default createAppContainer(AppNavigator);
