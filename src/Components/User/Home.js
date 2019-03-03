import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Text,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import * as axios from 'axios';

import { UserProblemFeed, predictiveSearch } from '../../config.json';
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
      searchValue: null,
    };
  }

  componentWillMount() {
    this.fetchProblems();
  }

  advFetchProblems = () => {
    this.setState({ problemsLoaded: false, problemsFeed: [] });
    axios
      .post(predictiveSearch, { sentence: this.state.searchValue })
      .then(({ data }) => {
        this.setState({
          problemsFeed: data,
          problemsLoaded: true,
        });
      });
  };

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
          renderItem={({ item }) => (
            <HomeListItem
              item={item}
              user={this.props.navigation.getParam('user')}
            />
          )}
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
    console.log(
      `Logged in with user ${JSON.stringify(
        this.props.navigation.getParam('user')
      )}`
    );
    const { problemsLoaded, problemsFeed } = this.state;
    return (
      <LinearGradient colors={['#7ed56f', '#28b485']} style={styles.main}>
        <MyHeader navigation={this.props.navigation} title="Home" />
        <SearchBar
          placeholder="Search..."
          value={this.state.searchValue}
          onChangeText={text => {
            this.setState({ searchValue: text });
            this.advFetchProblems();
          }}
        />
        {this.renderList()}
      </LinearGradient>
    );
  }
}
