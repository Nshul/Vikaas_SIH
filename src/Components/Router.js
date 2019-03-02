import { createStackNavigator, createAppContainer } from 'react-navigation';

import EntryScreen from './EntryScreen';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import Roadmap from './Roadmap';
import submitProb from './submitProb';

const AppNavigator = createStackNavigator({
  EntryScreen: { screen: EntryScreen },
  HomeScreen: { screen: HomeScreen },
  LoginScreen: { screen: LoginScreen },
  Roadmap: { screen: Roadmap },
  submitProb: { screen: submitProb },
});

export default createAppContainer(AppNavigator);
