import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';


const Map = () => {
  const coordinate = {
    latitude: 42.7298488,
    longitude: -73.6764863
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
          <Marker 
              coordinate={coordinate}
              pinColor='purple'
          />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default Map;