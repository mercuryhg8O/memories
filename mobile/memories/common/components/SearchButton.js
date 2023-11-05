import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Button, StyleSheet, View } from 'react-native';
// import IconButton from '@mui/material/IconButton';


const SearchButton = () => {

  return (
    // {/* <IconButton></IconButton> */}
    <Button
      title='Search'
      color="#000"
      accessibilityLabel='Search Button'
      // onPress={}
      style={styles.button}
      >
      Icon
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 75, height: 75,
    backgroundColor: 'purple',
    // position: 'absolute',
    top: 100, left: 100
  }
});

export default SearchButton;