import { createStackNavigator, createAppContainer } from 'react-navigation';

import EntryScreen from './EntryScreen';
import HomeScreen from './HomeScreen';
import UserHome from './User/Home';

const AppNavigator = createStackNavigator({
  EntryScreen: { screen: EntryScreen },
  HomeScreen: { screen: HomeScreen },
  UserHome: { screen: UserHome },
});

export default createAppContainer(AppNavigator);
