import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Text,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as axios from 'axios';

import { UserProblemFeed } from '../../config.json';
import MyHeader from '../Common/Header';
import HomeListItem from './HomeListItem';

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});

export default class UserHome extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor() {
    super();
    this.state = {
      problemsLoaded: false,
      problemsFeed: [],
    };
  }

  componentWillMount() {
    this.fetchProblems();
  }

  fetchProblems() {
    axios.get(UserProblemFeed).then(({ data }) => {
      this.setState({
        problemsFeed: data,
        problemsLoaded: true,
      });
    });
  }

  renderList() {
    const { problemsLoaded, problemsFeed } = this.state;
    if (problemsLoaded) {
      return (
        <FlatList
          data={problemsFeed}
          renderItem={({ item }) => <HomeListItem item={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      );
    }
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  render() {
    const { problemsLoaded, problemsFeed } = this.state;
    return (
      <LinearGradient colors={['#7ed56f', '#28b485']} style={styles.main}>
        <MyHeader navigation={this.props.navigation} title="Home" />
        {this.renderList()}
      </LinearGradient>
    );
  }
}
