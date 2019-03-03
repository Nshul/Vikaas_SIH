import {
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator,
} from 'react-navigation';

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
import MPDoneProblems from './MP/DoneProblems';
import MPInProgressProblems from './MP/InProgressProblems';
import OtherMP from './MP/OtherMinisters';

const UserDrawerNavigator = createDrawerNavigator({
  UserHome: { screen: UserHome },
  submitProb: { screen: submitProb },
  Roadmap: { screen: Roadmap },
  HomeScreen: { screen: HomeScreen },
});

const MPDrawerNavigator = createDrawerNavigator({
  MPHome: { screen: MPHome },
  Roadmap: { screen: Roadmap },
  HomeScreen: { screen: HomeScreen },
  DoneProblems: { screen: MPDoneProblems },
  InProgressProblems: { screen: MPInProgressProblems },
  OtherMP: { screen: OtherMP },
});

const UserLoginNavigator = createStackNavigator({
  UserLoginScreen: { screen: UserLoginScreen },
  Main: { screen: UserDrawerNavigator },
});

const MpLoginNavigator = createStackNavigator({
  MPLoginScreen: { screen: MPLoginScreen },
  Main: { screen: MPDrawerNavigator },
});

const AppNavigator = createStackNavigator({
  EntryScreen: {
    screen: EntryScreen,
  },
  SignupScreen: { screen: SignupScreen },
  MPSignupScreen: { screen: MPSignupScreen },
  MPLogin: { screen: MpLoginNavigator },
  UserLogin: { screen: UserLoginNavigator },
});

// const AppNavigator = createStackNavigator({
//   EntryScreen: { screen: EntryScreen },
//   HomeScreen: { screen: HomeScreen },
//   UserHome: { screen: UserHome },
//   UserLoginScreen: { screen: UserLoginScreen },
//   MPHome: { screen: MPHome },
//   MPLoginScreen: { screen: MPLoginScreen },
//   Roadmap: { screen: Roadmap },
//   submitProb: { screen: submitProb },
//   SignupScreen: { screen: SignupScreen },
//   MPSignupScreen: { screen: MPSignupScreen },
// });

export default createAppContainer(AppNavigator);
