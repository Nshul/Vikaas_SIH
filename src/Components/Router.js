import { createStackNavigator, createAppContainer } from 'react-navigation';

import EntryScreen from './EntryScreen';
import HomeScreen from './HomeScreen';
import SignupScreen from './SignupScreen';
import MPSignupScreen from './MPSignupScreen';

const AppNavigator = createStackNavigator({
  EntryScreen: { screen: EntryScreen },
  HomeScreen: { screen: HomeScreen },
  SignupScreen: {screen: SignupScreen},
  MPSignupScreen: { screen: MPSignupScreen }
});

export default createAppContainer(AppNavigator);
