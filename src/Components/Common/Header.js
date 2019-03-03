import React from 'react';
import { Header } from 'react-native-elements';

import HamburgerMenu from './HamburgerMenu';

const MyHeader = props => {
  return (
    <Header
      leftComponent={<HamburgerMenu navigation={props.navigation} />}
      centerComponent={{
        text: props.title,
        style: { color: '#fff', fontWeight: 'bold', fontSize: 20 },
      }}
      statusBarProps={{ barStyle: 'light-content' }}
      containerStyle={{
        backgroundColor: '#009688',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        marginBottom: 4,
      }}
    />
  );
};

export default MyHeader;
