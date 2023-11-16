import { useState, useEffect, useContext} from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import {ParseMemoriesDetails} from '../helpers/helpers.js';
import Map from '../components/Map.js';
import { CurrentUserContext } from '../context/contexts';
import {goTo, setCurrentLocation} from '../helpers/helpers.js'





function UserScreen({ navigation }) {

    const { mapView } = useContext(CurrentUserContext);
    

    [memory_locations, setMemoryLocations] = useState([]);
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {setCurrentLocation(mapView)}}
            
            >
                <Text>temporary user screen </Text>
            </TouchableOpacity>
            
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});

export default UserScreen;