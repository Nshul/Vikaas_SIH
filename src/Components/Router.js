import { createStackNavigator, createAppContainer } from 'react-navigation';

import EntryScreen from './EntryScreen';
import HomeScreen from './HomeScreen';

const AppNavigator = createStackNavigator({
  EntryScreen: { screen: EntryScreen },
  HomeScreen: { screen: HomeScreen },
});

export default createAppContainer(AppNavigator);
