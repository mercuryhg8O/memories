import React, {useState, useEffect, useContext} from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import { CurrentUserContext } from '../context/contexts';

const Map = ({ memory_locations, navigation }) => {

    // check that memory_locations is not empty. If it is then display  
    // as message that there was no (item of interest as defined in the context)

    // goal: start at current location as default. (move get current location to a helper function)

    // set initial default region
    const initialRegion = {
        latitude: 42,
        longitude: 42,
        latitudeDelta: 1.00,
        longitudeDelta: 1.0421,
    }
    const [defaultRegion, setDefaultRegion] = useState(initialRegion);
    const { mapView } = useContext(CurrentUserContext);

    // if location services are enabled, set the default region to the current device's location.





    return <View style={styles.container}>
        <MapView
            ref={mapView}
            initialRegion={defaultRegion}
            style={styles.map}
            accessibilityLabel='Main map'
            >

            {// Draw Memories on map
                memory_locations.map((marker, index) =>
                (<Marker
                    key={index}
                    coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                    title={marker.title}
                />))
            }
        </MapView>        
    
    </View>
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-end",
        alignItems: "center",
    },
    map: {
        width: '100%',
        height: '100%',
    },
});

export default Map;