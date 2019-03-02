import React, { Component } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import { Badge, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Comments from '../Common/Comments';

const styles = StyleSheet.create({
  listStyle: {
    flex: 1,
  },
  touchableStyle: {
    flex: 1,
    flexDirection: 'row',
  },
  listItem: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 3,
    marginBottom: 2,
    borderRadius: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  problemHeader: {
    flex: 1,
    flexDirection: 'column',
  },
  problemHeaderVotes: {
    flex: 1,
    flexDirection: 'row',
  },
  problemHeaderTitle: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  problemTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  votes: {
    fontSize: 10,
    marginRight: 3,
  },
  voteIcon: {
    paddingTop: 3,
    marginRight: 5,
  },
  expandableIcon: {
    paddingTop: 3,
    marginRight: 5,
  },
  tagBadge: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 7,
    paddingLeft: 7,
    margin: 5,
    color: '#fff',
  },
  tagView: {
    marginTop: 10,
  },
  description: {
    marginTop: 10,
    marginBottom: 10,
  },
  addComment: {
    height: 50,
  },
});

export default class HomeListItem extends Component {
  constructor(props) {
    super();
    this.state = {
      expanded: false,
      addedComment: null,
    };
  }

  onPress = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  onPressContract = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  expandList = () => {
    const {
      title,
      upvotes,
      downvotes,
      description,
      tags,
      comments,
      status,
    } = this.props.item;
    return (
      <View>
        <View style={styles.tagView}>
          <FlatList
            horizontal
            data={tags}
            renderItem={({ item }) => (
              <Badge value={<Text style={styles.tagBadge}>{item}</Text>} />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <View style={styles.description}>
          <Text style={styles.problemDescription}>{description}</Text>
        </View>
      </View>
    );
  };

  render() {
    const { title } = this.props.item;
    return (
      <View style={styles.listItem}>
        <TouchableWithoutFeedback onPress={this.onPress}>
          <View style={styles.touchableStyle}>
            <View style={styles.problemHeader}>
              <View style={styles.problemHeaderTitle}>
                <Text style={styles.problemTitle}>{title}</Text>
              </View>
              
            </View>
            <View>
              {!this.state.expanded && (
                <Icon
                  color="#000"
                  name="chevron-circle-down"
                  size={30}
                  style={styles.expandableIcon}
                />
              )}
              {this.state.expanded && (
                <Icon
                  color="#000"
                  name="chevron-circle-up"
                  size={30}
                  style={styles.expandableIcon}
                />
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
        {this.state.expanded && this.expandList()}
      </View>
    );
  }
}
