import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const HamburgerMenu = props => {
  return (
    <FontAwesome5
      color="#fff"
      name="grip-horizontal"
      size={25}
      style={{ marginLeft: 20 }}
      onPress={() => props.navigation.toggleDrawer()}
    />
  );
};

export default HamburgerMenu;
