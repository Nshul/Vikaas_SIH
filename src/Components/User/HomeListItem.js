import React, { Component } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Text,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import { Badge, Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { Buffer } from 'buffer';
import Comments from '../Common/Comments';

import {
  userUpvoteProblem,
  userDownvoteProblem,
  userCommentAdd,
} from '../../config.json';

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

function getBase64(data) {
  return new Buffer(data).toString('base64');
}

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

  upvoteComplaint = () => {
    axios
      .post(userUpvoteProblem, {
        user: this.props.user._id,
        complaintid: this.props.item._id,
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  downvoteComplaint = () => {
    axios
      .post(userDownvoteProblem, {
        user: this.props.user._id,
        complaintid: this.props.item._id,
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  addComment = () => {
    axios.post(userCommentAdd, {
      username: this.props.user.name,
      userid: this.props.user._id,
      complaintid: this.props.item._id,
      text: this.state.addedComment,
    });
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
      _id,
      image,
    } = this.props.item;
    console.log(`Rec Image: ${image}`);
    const image64 = 'data:image/png;base64,' + image;
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
        <View>
          <Image
            source={{ uri: image64 }}
            style={{ height: 200, width: 200 }}
          />
        </View>
        <View>
          <Button title="Upvote" onPress={() => this.upvoteComplaint()} />
          <Button title="Downvote" onPress={() => this.downvoteComplaint()} />
        </View>
        <Comments comments={comments} />
        <View style={styles.addComment}>
          <Input
            placeholder="Add your comment..."
            value={this.state.addedComment}
            onChangeText={text => {
              this.setState({ addedComment: text });
            }}
            leftIcon={<Icon name="comments-o" size={20} color="black" />}
            rightIcon={
              <Icon
                color="black"
                name="send-o"
                size={20}
                onPress={() => {
                  this.addComment();
                }}
              />
            }
          />
        </View>
      </View>
    );
  };

  render() {
    console.log(`Inside List Item ${JSON.stringify(this.props.user)}`);
    const { title, upvotes, downvotes } = this.props.item;
    return (
      <View style={styles.listItem}>
        <TouchableWithoutFeedback onPress={this.onPress}>
          <View style={styles.touchableStyle}>
            <View style={styles.problemHeader}>
              <View style={styles.problemHeaderTitle}>
                <Text style={styles.problemTitle}>{title}</Text>
              </View>
              <View style={styles.problemHeaderVotes}>
                <Icon
                  color="#000"
                  name="thumbs-o-up"
                  size={10}
                  style={styles.voteIcon}
                />
                <Text style={styles.votes}>{upvotes}</Text>
                <Icon
                  color="#000"
                  name="thumbs-o-down"
                  size={10}
                  style={styles.voteIcon}
                />
                <Text style={styles.votes}>{downvotes}</Text>
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
