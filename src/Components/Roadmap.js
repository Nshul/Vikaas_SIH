import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Timeline from 'react-native-timeline-listview';

export default class Example extends Component {
  constructor() {
    super();
    this.onEventPress = this.onEventPress.bind(this);
    this.renderSelected = this.renderSelected.bind(this);

    this.data = [
      {
        time: '20th January 2018',
        title: 'Project Inaugration',
        description:
          'The Bill for the Road Development work is passed and the contactor is assigned',
        lineColor: '#009688',
      },
      {
        time: '30th August 2018',
        title: 'Major Laying Down Work Done',
        description:
          'The major work concerning the road was done with minor finishes left',
      },
      {
        time: '30th November 2018',
        title: 'Halt Due to Strike',
        description:
          'There were unavoidable circumstances owing to which strikes occured. The work was delayed',
      },
      {
        time: '1st January 2019',
        title: 'The finishing work started',
        description:
          'The finishing work started and the milestones were put. This marked the beginning of the end process.',
        lineColor: '#009688',
      },
      
    ];
    this.state = { selected: null };
  }

  onEventPress(data) {
    this.setState({ selected: data });
  }

  renderSelected() {
    if (this.state.selected)
      return (
        <View >
        <Text style={{ fontSize: 25, color: 'black', flex: 1 }}>MileStones Achieved</Text>
        <Text style={{ marginTop: 10 }}>
          Selected event: {this.state.selected.title} at{' '}
          {this.state.selected.time}
        </Text>
        </View>
      );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderSelected()}
        <Timeline
          style={styles.list}
          data={this.data}
          circleSize={20}
          circleColor="rgba(0,0,0,0)"
          lineColor="rgb(45,156,219)"
          timeContainerStyle={{ minWidth: 52, marginTop: -5 }}
          timeStyle={{
            textAlign: 'center',
            backgroundColor: '#ff9797',
            color: 'white',
            padding: 5,
            borderRadius: 13,
          }}
          descriptionStyle={{ color: 'gray' }}
          options={{
            style: { paddingTop: 5 },
          }}
          innerCircle={'icon'}
          onEventPress={this.onEventPress}
          separator={false}
          detailContainerStyle={{
            marginBottom: 20,
            paddingLeft: 5,
            paddingRight: 5,
            backgroundColor: '#BBDAFF',
            borderRadius: 10,
          }}
          columnFormat="two-column"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 65,
    backgroundColor: 'white',
  },
  list: {
    flex: 1,
    marginTop: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  descriptionContainer: {
    flexDirection: 'row',
    paddingRight: 50,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textDescription: {
    marginLeft: 10,
    color: 'gray',
  },
});
