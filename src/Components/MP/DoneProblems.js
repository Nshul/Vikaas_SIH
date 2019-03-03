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

import { DoneProblemFeed } from '../../config.json';
import MyHeader from '../Common/Header';
import DoneProblemsList from './DoneProblemsList';

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});

export default class MPDoneProblems extends Component {
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
    axios.get(DoneProblemFeed).then(({ data }) => {
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
          renderItem={({ item }) => <DoneProblemsList item={item} />}
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
        <MyHeader navigation={this.props.navigation} title="Success Unlocked!" />
        {this.renderList()}
      </LinearGradient>
    );
  }
}
