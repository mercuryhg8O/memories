import { useState, useEffect} from 'react';
import { StyleSheet, View } from 'react-native';
import {ParseMemoriesDetails} from '../helpers/helpers';
import Map from '../components/Map.js';


function MapScreen({ navigation }) {

    // TODO: Move memory locations from component state to context state.
    useEffect(() => {

        const { memories, error } = ParseMemoriesDetails();
        setMemoryLocations(memories)
    }, []);

    [memory_locations, setMemoryLocations] = useState([]);
    return (
        <View style={styles.container}>
            <Map/>
            <View></View>
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

export default MapScreen;