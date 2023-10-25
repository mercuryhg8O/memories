import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

const coordinate = {
    latitude: 42.7298488,
    longitude: -73.6764863,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

export default function Map() {
    return (
        <View style={styles.container}>
            <MapView style={styles.map}
                // initialRegion={{
                //     latitude: 37.78825,
                //     longitude: -122.4324,
                //     latitudeDelta: 0.0922,
                //     longitudeDelta: 0.0421,
                // }}
            >
                <Marker 
                    coordinate={coordinate}
                    pinColor='purple'
                />
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        width: '100%',
        height: '100%',
    },
});
