import React, { Component } from 'react';
import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MyHeader from '../Common/Header';
import { getmps } from '../../config.json';

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});

export default class OtherMP extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      ministerFeed: null,
      ministerFeedLoaded: false,
    };
  }

  componentWillMount() {
    this.fetchMPS();
  }

  fetchMPS() {
    axios.get(getmps).then(({ data }) => {
      this.setState({
        ministerFeed: data,
        ministerFeedLoaded: true,
      });
    });
  }

  renderList() {
    const { ministerFeed, ministerFeedLoaded } = this.state;
    if (ministerFeedLoaded) {
      return (
        <FlatList
          data={ministerFeed}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  backgroundColor: 'white',
                  flex: 1,
                  margin: 10,
                  padding: 10,
                }}
              >
                <Text>Name: {item.name}</Text>
                <Text>Constituency: {item.constituency}</Text>
                <Text>No. of Approved: {item.approved.length}</Text>
                <Text>
                  No. of In Consideration: {item.inconsideration.length}
                </Text>
              </View>
            );
          }}
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
    return (
      <LinearGradient colors={['#7ed56f', '#28b485']} style={styles.main}>
        <MyHeader navigation={this.props.navigation} title="Home" />
        {this.renderList()}
      </LinearGradient>
    );
  }
}
