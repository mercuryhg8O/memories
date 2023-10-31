import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyMap from '../components/myMap.component';
import { useState, useEffect} from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';



function MapScreen({ navigation }) {

    // TODO: Move memory locations from component state to context state.
    useEffect(() => {

        const { memories, error } = ParseMemoriesDetails();
        setMemoryLocations(memories)
    }, []);

    [memory_locations, setMemoryLocations] = useState([]);

    return (
        <View style={styles.container}>
            <MyMap style={{ flex: 2 }} memory_locations={memory_locations} />
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