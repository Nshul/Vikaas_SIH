import React from 'react';
import { ListItem } from 'react-native-elements';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  comment: {
    color: 'grey',
  },
  name: {
    color: 'black',
    fontWeight: 'bold',
  },
  commentBody: {
    borderWidth: 0.5,
    borderColor: 'grey',
    borderRadius: 10,
    margin: 5,
  },
});

function RenderItem(item) {
  return (
    <View style={styles.commentBody}>
      <ListItem
        title={<Text style={styles.name}>{item.author.name}</Text>}
        subtitle={<Text style={styles.comment}>{item.text}</Text>}
        leftAvatar={{
          rounded: true,
          source: {
            uri:
              'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
          },
        }}
      />
    </View>
  );
}

export default function Comments({ comments }) {
  return (
    <FlatList
      keyExtractor={(item, index) => index.toString()}
      data={comments}
      renderItem={({ item }) => RenderItem(item)}
    />
  );
}
